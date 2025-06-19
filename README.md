# 💬 QuickChat - Real-Time MERN Chat Application

QuickChat is a real-time chat application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) with **Socket.IO** for real-time communication. It features user authentication, profile management, and private one-to-one messaging.

---

## 🚀 Live Links

🌐 App: [Live Chat App](https://chat-app-k7u0.onrender.com)  

---

## 🧰 Tech Stack

| Technology  | Role                         |
|-------------|------------------------------|
| React       | Frontend SPA                 |
| Vite        | React bundler                |
| Context API | Global state management      |
| Express.js  | REST API for auth & chat     |
| MongoDB     | Database (via MongoDB Atlas) |
| Socket.IO   | Real-time messaging          |
| JWT         | User authentication          |
| Render      | Deployment platform          |
| Cloudinary  | Profile image storage        |

---

## 🔐 Authentication Flow

### 👤 User Flow

- Signup/Login using secure forms
- JWT token is issued and stored locally
- Token is sent in Authorization header for protected routes

### 💬 Chat Flow

- Real-time communication using Socket.IO
- Messages are stored in MongoDB
- User can view chat history and live message updates

---

## ✨ Features

- 🔒 User registration & login with JWT
- 🧑 Profile page with profile picture support
- 🧵 One-on-one real-time chat
- 💾 MongoDB storage for chat history
- 🔄 Persistent sessions and secure routes
- ☁️ Profile image upload using Cloudinary
- ⚡ Socket.IO for real-time messaging

---
