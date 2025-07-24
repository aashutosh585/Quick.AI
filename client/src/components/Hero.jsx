import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="
        flex flex-col justify-center items-center
        w-full px-4 sm:px-20 xl:px-32
        min-h-screen
        bg-[url(/gradientBackground.png)] bg-cover bg-repeat
      "
    >
    
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]">
          Create amazing content <br />
          with <span className="text-primary">AI Tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-3xl mx-auto">
          Transform your content creation with our suite of premium AI Tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>


      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Start creating now
        </button>
        <button className="bg-white text-primary px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch demo
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8" />Trusted by 10K+ people
      </div>

    </div>
  );
};

export default Hero;
