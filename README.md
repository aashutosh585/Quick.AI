# 🚀 Vector.AI - AI-Powered Content Creation Platform

A comprehensive full-stack AI SaaS application that empowers users to create content, generate images, and enhance their digital assets using cutting-edge artificial intelligence.

## 🌐 Live Demo

**🔗 [Try Vector.AI Live](https://vectorai-inky.vercel.app/)**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core AI Tools
- **AI Article Writer**: Generate high-quality, engaging articles with customizable length (500-1600+ words)
- **Blog Title Generator**: Create catchy and SEO-optimized titles across 8 different categories
- **AI Image Generation**: Produce stunning images from text prompts with 8+ artistic styles
- **Background Removal**: Automatically remove backgrounds from images using AI
- **Object Removal**: Seamlessly erase unwanted objects from photos
- **Resume Reviewer**: Get AI-driven feedback and suggestions to improve your resume

### 👥 User Experience
- **Authentication**: Secure user management with Clerk
- **Dashboard**: Personal workspace to view all your AI creations
- **Community Gallery**: Share and discover AI-generated content from other users
- **Like System**: Engage with community content through likes
- **Usage Plans**: Free tier with limits + Premium unlimited access

### 🔧 Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Feedback**: Toast notifications for all user actions
- **File Upload**: Secure image and PDF upload functionality
- **Content Management**: Publish/unpublish your creations
- **Database Persistence**: All creations are stored and retrievable

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications
- **React Markdown** - Markdown rendering
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database (via Neon)
- **Clerk Express** - Authentication middleware
- **Cloudinary** - Image storage and processing
- **Multer** - File upload handling
- **OpenAI API** - AI text generation (via Gemini)
- **ClipDrop API** - AI image generation
- **PDF Parse** - Resume processing

### Database & Storage
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **Cloudinary** - Cloud-based image and video management

## 📁 Project Structure

```
AI SaaS/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, and data
│   │   ├── components/        # Reusable UI components
│   │   │   ├── AiTools.jsx    # AI tools showcase
│   │   │   ├── CreationItem.jsx # Individual creation display
│   │   │   ├── Footer.jsx     # Site footer
│   │   │   ├── Hero.jsx       # Landing page hero
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Plan.jsx       # Pricing plans
│   │   │   ├── Sidebar.jsx    # Dashboard sidebar
│   │   │   └── Testimonial.jsx # User testimonials
│   │   ├── pages/             # Application pages
│   │   │   ├── BlogTitles.jsx # Blog title generator
│   │   │   ├── Community.jsx  # Community gallery
│   │   │   ├── DashBoard.jsx  # User dashboard
│   │   │   ├── GenerateImages.jsx # Image generation
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Layout.jsx     # App layout wrapper
│   │   │   ├── RemoveBackground.jsx # Background removal
│   │   │   ├── RemoveObject.jsx # Object removal
│   │   │   ├── ReviewResume.jsx # Resume review
│   │   │   └── WriteArticle.jsx # Article generation
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # App entry point
│   ├── .env                   # Environment variables
│   ├── package.json           # Dependencies and scripts
│   └── vite.config.js         # Vite configuration
├── server/                     # Backend Express application
│   ├── configs/               # Configuration files
│   │   ├── cloudinary.js      # Cloudinary setup
│   │   ├── db.js              # Database connection
│   │   └── multer.js          # File upload config
│   ├── controllers/           # Route controllers
│   │   ├── aiController.js    # AI-related endpoints
│   │   └── userController.js  # User-related endpoints
│   ├── middlewares/           # Custom middleware
│   │   └── auth.js            # Authentication middleware
│   ├── routes/                # API routes
│   │   ├── aiRoutes.js        # AI endpoints routing
│   │   └── userRoutes.js      # User endpoints routing
│   ├── package.json           # Dependencies and scripts
│   └── server.js              # Express server setup
└── README.md                   # Project documentation
```

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL database** (Neon recommended)
- **Clerk account** for authentication
- **Cloudinary account** for image storage
- **OpenAI API key** (or Gemini API key)
- **ClipDrop API key** for image generation

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aashutosh585/AI-SaaS.git
cd AI-SaaS
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## 🔐 Environment Variables

### Frontend (.env)

Create a `.env` file in the `client` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

### Backend (.env)

Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL=your_neon_postgresql_connection_string

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Usage

### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm run server
```

2. **Start the Frontend Development Server**:
```bash
cd client
npm run dev
```

3. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Production Mode

1. **Build the Frontend**:
```bash
cd client
npm run build
```

2. **Start the Production Server**:
```bash
cd server
npm start
```

## 🛠 API Endpoints

### AI Endpoints (`/api/ai`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/generate-article` | Generate articles with custom length | ✅ |
| POST | `/generate-blog-title` | Create blog titles by category | ✅ |
| POST | `/generate-images` | Generate images from text prompts | ✅ |
| POST | `/remove-background` | Remove image backgrounds | ✅ |
| POST | `/remove-image-object` | Remove objects from images | ✅ |
| POST | `/resume-review` | Analyze and review resumes | ✅ |

### User Endpoints (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/get-user-creations` | Fetch user's all creations | ✅ |
| GET | `/get-published-creations` | Fetch public community creations | ✅ |
| POST | `/toggle-like-creation` | Like/unlike community creations | ✅ |

## 🗄 Database Schema

### Creations Table

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'article', 'blog-title', 'image'
  publish BOOLEAN DEFAULT false,
  likes TEXT[], -- Array of user IDs who liked
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Key Features Explained

### AI Article Writer
- Generate articles from 500 to 1600+ words
- Customizable prompts and topics
- Markdown formatting support
- Instant preview and editing

### Blog Title Generator
- 8 categories: General, Technology, Health, Lifestyle, Travel, Food, Education, Business
- SEO-optimized suggestions
- Multiple title variations per request

### AI Image Generation
- 8 artistic styles: Realistic, Ghibli, Cartoon, Anime, Fantasy, 3D, Portrait
- High-quality image output
- Cloudinary integration for storage
- Community sharing options

### Background & Object Removal
- AI-powered precision removal
- Support for JPG, PNG formats
- Real-time processing feedback
- Download and save functionality

### Community Features
- Public gallery of user creations
- Like and engagement system
- Real-time updates
- User authentication integration

## 🔧 Development

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts

```bash
npm run server   # Start with nodemon (development)
npm start        # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Clerk** for seamless authentication
- **OpenAI/Gemini** for powerful AI capabilities
- **Cloudinary** for reliable image processing
- **Neon** for serverless PostgreSQL
- **Tailwind CSS** for beautiful UI components

## 📞 Support

For support, email ashutoshmaurya585@gmail.com or join our Discord community.

---

**Built with ❤️ by [Ashutosh Maurya](https://github.com/aashutosh585)**
