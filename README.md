# AI-SaaS: A Content Creation Platform
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/aashutosh585/AI-SaaS)

This repository contains the source code for a full-stack AI-powered Software-as-a-Service (SaaS) application. It provides users with a suite of tools for generating and manipulating content, including articles, blog titles, images, and more.

## ✨ Features

- **AI Article Writer:** Generate high-quality, engaging articles on any topic.
- **Blog Title Generator:** Create catchy and effective titles for your blog posts.
- **AI Image Generation:** Produce stunning, unique images from text prompts.
- **Image Background Removal:** Automatically remove backgrounds from images.
- **Image Object Removal:** Seamlessly erase unwanted objects from photos.
- **AI Resume Reviewer:** Get AI-driven feedback and suggestions to improve your resume.
- **User Authentication:** Secure user sign-up, sign-in, and profile management powered by Clerk.
- **Usage-Based Plans:** A free plan with usage limits and a premium plan for unrestricted access.
- **Community Gallery:** A public space for users to share their published AI-generated images and like others' creations.

## 🛠️ Tech Stack

The project is structured as a monorepo with a separate `client` and `server`.

### Frontend (Client)

- **Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Authentication:** Clerk React
- **HTTP Client:** Axios
- **UI Components:** Lucide React for icons, React Markdown for rendering.
- **Notifications:** React Hot Toast

### Backend (Server)

- **Framework:** Express.js
- **Authentication:** Clerk Express Middleware
- **Database:** Neon (Serverless PostgreSQL)
- **AI Services:**
  - **Text Generation:** Google Gemini API (via OpenAI SDK wrapper)
  - **Image Generation:** Clipdrop API
  - **Image Processing:** Cloudinary API for background/object removal and storage.
- **File Handling:** Multer for file uploads, `pdf-parse` for resumes.
- **Deployment:** Configuration provided for Vercel.

## 🏛️ Architecture

The application is split into two main parts:

-   `client/`: A modern React single-page application built with Vite. It handles all user interface elements, state management, and interaction. It communicates with the backend via a REST API.
-   `server/`: A Node.js and Express.js REST API that serves as the backend. It manages business logic, interacts with third-party AI services (Gemini, Cloudinary, Clipdrop), handles user authentication with Clerk, and connects to the Neon PostgreSQL database for data persistence.

All AI-related routes are protected and require user authentication. A custom middleware tracks API usage for non-premium users.

## 🚀 Getting Started

To run this project locally, follow the steps below.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or pnpm or yarn
-   A Neon account for the PostgreSQL database.
-   A Clerk account for authentication.
-   API keys for Gemini, Cloudinary, and Clipdrop.

### Server Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aashutosh585/AI-SaaS.git
    cd AI-SaaS/server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `server` directory and add the following environment variables with your credentials:
    ```env
    PORT=3000
    DATABASE_URL="your_neon_database_connection_string"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    GEMINI_API_KEY="your_gemini_api_key"
    CLIPDROP_API_KEY="your_clipdrop_api_key"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    ```

4.  **Run the server:**
    ```bash
    npm run server
    ```
    The server will be running on `http://localhost:3000`.

### Client Setup

1.  **Navigate to the client directory:**
    ```bash
    cd ../client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `client` directory and add the following:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    VITE_BASE_URL="http://localhost:3000"
    ```

4.  **Run the client development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## ⚙️ API Endpoints

The backend exposes the following RESTful endpoints under the `/api` prefix. All routes require authentication.

### AI Endpoints (`/api/ai`)

-   `POST /generate-article`: Generates a full article based on a prompt.
-   `POST /generate-blog-title`: Generates blog titles from a keyword and category.
-   `POST /generate-images`: Creates an image from a text prompt.
-   `POST /remove-background`: Removes the background from an uploaded image.
-   `POST /remove-image-object`: Removes a specified object from an uploaded image.
-   `POST /resume-review`: Analyzes an uploaded PDF resume and provides feedback.

### User Endpoints (`/api/user`)

-   `GET /get-user-creations`: Fetches all creations made by the authenticated user.
-   `GET /get-published-creations`: Fetches all publicly published creations (for the community page).
-   `POST /toggle-like-creation`: Adds or removes a like from a creation.
