# 🏆 Code Challenge

> **Welcome, Coder! 👍 You've got this!**

A full-stack application built with **React**, **Node.js**, and **PostgreSQL**. Your mission: make the UI yours — go wild!

---

## 📋 Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React 18 + Vite     |
| Backend  | Node.js + Express   |
| Database | PostgreSQL 16       |
| DevOps   | Docker Compose      |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org/))
- **Docker** & Docker Compose ([download](https://www.docker.com/products/docker-desktop/))

### 1. Start the Database

```bash
docker-compose up -d
```

### 2. Install Dependencies

```bash
# From the project root
npm run install:all
```

### 3. Initialize the Database

```bash
cd server
npm run db:init
cd ..
```

### 4. Start the App

```bash
npm start
```

This starts both servers:
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5000

---

## 📁 Project Structure

```
code-challenge/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # 👈 EDIT THESE! Your playground
│   │   │   ├── HeroBanner.*   # Hero welcome section
│   │   │   ├── CoderBoard.*   # Wall of fame display
│   │   │   ├── AddCoderForm.* # Form to add coders
│   │   │   └── Footer.*       # Footer component
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css
│   │   ├── index.css          # Global styles & theme
│   │   └── main.jsx           # Entry point
│   └── index.html
├── server/                    # Node.js Backend (Express)
│   ├── db/
│   │   ├── pool.js            # PostgreSQL connection
│   │   └── init.js            # DB schema & seed data
│   ├── routes/
│   │   └── coders.js          # CRUD API routes
│   └── index.js               # Express server entry
├── docker-compose.yml         # PostgreSQL container
└── README.md
```

---

## 🎯 Challenge Goals

Your task is to **customize and enhance the UI**. Here are some ideas:

1. **Restyle the Hero Banner** — Change colors, animations, layout
2. **Redesign Coder Cards** — Add avatars, badges, or new fields
3. **Add New Features** — Search/filter, dark/light toggle, animations
4. **Create New Pages** — About page, leaderboard, stats dashboard
5. **Improve the Form** — Validation, emoji picker, character count

---

## 🔌 API Endpoints

| Method | Endpoint        | Description       |
|--------|-----------------|-------------------|
| GET    | `/api/health`   | Health check      |
| GET    | `/api/coders`   | List all coders   |
| POST   | `/api/coders`   | Add a new coder   |
| DELETE | `/api/coders/:id` | Remove a coder  |

### Example: Add a coder

```bash
curl -X POST http://localhost:5000/api/coders \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name", "message": "I was here! 🎉"}'
```

---

## 🛠️ Useful Commands

```bash
# Start everything
npm start

# Start only frontend
npm run dev:client

# Start only backend
npm run dev:server

# Reset database
docker-compose down -v && docker-compose up -d
cd server && npm run db:init

# Stop database
docker-compose down
```

---

## 💡 Tips

- The frontend **hot-reloads** — save a file and see changes instantly
- API requests from the frontend are **proxied** to port 5000
- Check the browser **DevTools console** for helpful logs
- The theme variables are in `client/src/index.css` — tweak them!

---

**Happy Coding! 🚀👍**
