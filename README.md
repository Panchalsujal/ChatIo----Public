# 🤖 ChatIo — AI Chat Application

ChatIo is a modern full-stack AI chat application similar to ChatGPT.
It allows users to register, verify email, create chats, and interact with an AI assistant in real time using a clean responsive interface.

Built with a scalable MERN-style architecture and real-time socket support.

---

# 🚀 Features

✅ User authentication (Register / Login / Logout)
✅ Email verification system
✅ AI chat conversation support
✅ Real-time chat updates (Socket integration)
✅ Markdown response rendering
✅ Chat history management
✅ Redux state management
✅ Mobile responsive UI
✅ Secure cookie-based session handling
✅ Environment-based configuration

---

# 🧠 AI Capabilities

* AI powered chat assistant
* Internet search integration (Tavily)
* Context based conversations
* Markdown formatted responses
* Chat history persistence

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Markdown
* Axios
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Socket.IO
* Cookie Parser
* Morgan Logger
* CORS

## Authentication & Email

* JWT Authentication
* SendGrid / Nodemailer (email verification support)

## AI Integration

* Tavily Search API
* LLM based chat response service

---

# 📂 Project Structure

```
ChatIo
│
├── frontend
│   ├── components
│   ├── pages
│   ├── redux
│   ├── hooks
│   └── App.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── sockets
│   ├── services
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/Panchalsujal/ChatIo----Public.git
cd ChatIo----Public
```

---

# 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

SENDGRID_API_KEY=your_key
EMAIL_FROM=your_email

TAVILY_API_KEY=your_api_key
```

Run backend:

```
npm run dev
```

---

# 🎨 Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# 🌐 Environment Variables Required

Backend `.env`

```
PORT=
MONGO_URI=
JWT_SECRET=
SENDGRID_API_KEY=
EMAIL_FROM=
TAVILY_API_KEY=
```

---

# 📡 API Routes Overview

## Auth Routes

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/verify-email
```

## Chat Routes

```
POST /api/chat/create
GET  /api/chat/history
POST /api/chat/message
```

---

# 🔌 Socket Events

```
connection
join_chat
send_message
receive_message
disconnect
```

#

---

# 🚀 Deployment

Backend deploy:

```
Render.com
```

Frontend deploy:

```
 Render.com  
```

---

# 🔒 Security Features

* JWT authentication
* Cookie based session handling
* Email verification
* Environment variable protection
* CORS enabled protection

---

# 📈 Future Improvements

* Streaming AI responses
* Image upload support
* Voice chat integration
* Chat export feature
* Multi-model AI selection

---

# 👨‍💻 Author

**Sujal Panchal**

GitHub:
https://github.com/Panchalsujal

 

# 🌐 Live Demo

🚀 Try it here: https://chatio-frontend-equl.onrender.com/

  

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the repository
📢 Share with developers
