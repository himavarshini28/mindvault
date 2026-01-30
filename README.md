# 🧠 DigiBrain
**MindVault is now DigiBrain**
> Your personal digital brain - capture, organize, and share knowledge effortlessly

<div align="center">

![MindVault Banner](https://img.shields.io/badge/MindVault-Digital%20Brain-6366f1?style=for-the-badge)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## ✨ Features

### 🎯 Smart Content Management
- **Multi-Platform Support** - Seamlessly save content from Twitter, YouTube, LinkedIn, and any website
- **Intelligent Categorization** - Auto-organize your saved content by type
- **Semantic Search** - Find exactly what you need with AI-powered search
- **Rich Previews** - Beautiful embedded previews for tweets, videos, and links

### 🚀 Modern UX
- **Smooth Loading States** - Elegant skeleton screens and animations
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Dark Mode UI** - Easy on the eyes with a sleek dark interface
- **Real-time Updates** - Instant feedback on all actions

### 🔐 Secure & Private
- **JWT Authentication** - Secure user sessions
- **Private Collections** - Your data, your control
- **Shareable Links** - Generate read-only share links for collaboration



---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for utility-first styling
- **Zustand** for state management
- **React Router** with HashRouter for SPA routing
- **Axios** for API communication

### Backend
- **Node.js** + **Express**
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Vector Embeddings** for semantic search

### DevOps
- **Render** for deployment
- **Git** for version control

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/himavarshini28/mindvault.git
cd mindvault
```

2. **Install dependencies**

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Set up environment variables**

Create `.env` files in both `client` and `server` directories:

**Client `.env`**
```env
VITE_BACKEND_URL=http://localhost:5000
```

**Server `.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Start the development servers**

```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

---

## 📖 Usage

### 1. **Sign Up / Sign In**
Create your account or log in to access your personal vault

### 2. **Add Content**
Click "Add content" and paste links from:
- 🐦 Twitter/X
- 📺 YouTube
- 💼 LinkedIn
- 🔗 Any website

### 3. **Organize**
Content is automatically categorized. Use the sidebar to filter by type.

### 4. **Search**
Use semantic search to find content by meaning, not just keywords.

### 5. **Share**
Generate shareable links to collaborate with others (read-only access).

---

## 🎨 Key Features in Detail

### Smart Content Types
- **Twitter/X** - Embedded tweets with full formatting
- **YouTube** - Video embeds with player controls
- **LinkedIn** - Professional content previews
- **Others** - Links and documents with custom icons

### Advanced Search
Powered by AI embeddings, search understands context and meaning, not just exact matches.

### Responsive Loading States
- Skeleton screens for smooth transitions
- Shimmer animations for premium feel
- Button loading indicators
- Non-blocking UI updates

### Share Functionality
- Generate unique share links
- Copy-to-clipboard with one click
- Open share links in new tabs
- HashRouter-compatible URLs

---

## 🗂️ Project Structure

```
mindvault/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand stores
│   │   ├── icons/         # SVG icon components
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript definitions
│   └── public/            # Static assets
│
└── server/                # Express backend
    ├── src/
    │   ├── config/        # Database config
    │   ├── middlewares/   # Auth & other middleware
    │   ├── routes/        # API routes
    │   └── utils/         # Helper functions
    └── dist/              # Compiled output
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


## 👤 Author

**Hima Varshini**
- GitHub: [@himavarshini28](https://github.com/himavarshini28)

---

## 🙏 Acknowledgments

- Inspired by modern note-taking and knowledge management tools
- Built with love using the latest web technologies
- Thanks to the open-source community for amazing tools and libraries

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by [Hima Varshini](https://github.com/himavarshini28)

</div>
