import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Article Generation
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 100) {
      return res.json({
        success: false,
        message:
          "Free usage limit exceeded. Upgrade to premium for more requests.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, ${prompt}, ${content} , 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (err) {
    console.log("Error generating article:");
    res.json({ success: false, message: err.message });
  }
};

// Blog Generation
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 100) {
      return res.json({
        success: false,
        message:
          "Free usage limit exceeded. Upgrade to premium for more requests.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${prompt}, ${content} , 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (err) {
    console.log("Error generating article:");
    res.json({ success: false, message: err.message });
  }
};

// Image Generation
export const generateImage = async (req, res) => {
  try {
    if(!process.env.CLIPDROP_API_KEY){
      console.log("CLIPDROP_API_KEY is not set in environment variables." , process.env.CLIPDROP_API_KEY);
      return res.json({
        success: false,
        message: "CLIPDROP_API_KEY is not set in environment variables.",
      });
    }
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;
    
    console.log("CLIPDROP_API_KEY is  set in environment variables." , process.env.CLIPDROP_API_KEY);
    // if (plan !== "premium") {
    //   return res.json({
    //     success: false,
    //     message: "This feature is only available for premium subscription",
    //   });
    // }
    
    // 1) Build the form data
    const formData = new FormData();
    formData.append("prompt", prompt);
    
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );
    
    // 3) Convert raw bytes to base64 data URI
    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;
    
    // 4) Upload to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    
    // 5) Persist and respond
    await sql`
    INSERT INTO creations (user_id, prompt, content, type, publish)
    VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;
    
    res.json({ success: true, content: secure_url });
  } catch (err) {
    console.error("Error generating image:", err);
    res.json({ success: false, message: err.message });
  }
};

// Remove Background Image
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    // if (plan !== "premium") {
    //   return res.json({
    //     success: false,
    //     message: "This feature is only available for premium subscription",
    //   });
    // }
    // Tell Cloudinary to run their AI-backed background removal:
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      // Option A: top‑level parameter
      // background_removal: 'cloudinary_ai',

      // Option B: inside a transformation array
      transformation: [
        {
          effect: 'remove_background',
          background_removal: 'cloudinary_ai'
        }
      ]
    });

    // const { secure_url } = await cloudinary.uploader.upload(image.path, {
    //   transformation: [
    //     {
    //       effect: 'remove_background',
    //       background_removal: 'remove_the_background',
    //     },
    //   ],
    // });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });
  } catch (err) {
    console.error("Error generating image:", err);
    res.json({ success: false, message: err.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    // if (plan !== "premium") {
    //   return res.json({
    //     success: false,
    //     message: "This feature is only available for premium subscription",
    //   });
    // }

    const { public_id } = await cloudinary.uploader.upload(image.path);
    // const imageUrl = cloudinary.url(public_id, {
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    // 5) Persist and respond
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });
  } catch (err) {
    console.error("Error generating image:", err);
    res.json({ success: false, message: err.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // if (plan !== "premium") {
    //   return res.json({
    //     success: false,
    //     message: "This feature is only available for premium subscription",
    //   });
    // }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size exceeds 5MB limit.",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    // To parse the resume  npm install pdf-parse
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths,weakness, areas for improvement. Resume Content :\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      maxTokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Review the uploaded resume',
        ${content},
        'resume-review'
      )
    `;

    res.json({ success: true, content });
  } catch (err) {
    console.error("Error generating image:", err);
    res.json({ success: false, message: err.message });
  }
};
