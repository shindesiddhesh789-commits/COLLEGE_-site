# XelCo InfraTechnologies — SmartBin Management System

A full-stack IoT waste management dashboard built with **Vite + React** (frontend) and **Express + SQLite** (backend), with real-time bin data powered by **Supabase**.

---

## 🏗️ Architecture

| Layer     | Tech                          | Hosting                    |
|-----------|-------------------------------|----------------------------|
| Frontend  | Vite, React 19, TailwindCSS 4 | GitHub Pages (static)      |
| Backend   | Express, SQLite, JWT, Nodemailer | Render / Railway (Node.js) |
| Real-time | Supabase (COLLEGE-BIN table)  | Supabase Cloud             |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Run backend (Express API)
```bash
npm start
# → http://localhost:5000
```

### 4. Run frontend (Vite dev server)
```bash
npm run dev
# → http://localhost:3000 (auto-proxies /api → localhost:5000)
```

---

## 🌐 Deployment

### Frontend → GitHub Pages (automated)

The frontend is deployed automatically via GitHub Actions on every push to `main`.

**Required GitHub Secrets** (Settings → Secrets and variables → Actions):

| Secret                   | Description                            |
|--------------------------|----------------------------------------|
| `VITE_API_URL`           | Full URL of your deployed backend API (e.g. `https://xelco-api.onrender.com/api`) |
| `VITE_SUPABASE_URL`      | Your Supabase project URL              |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key     |

> **Note:** After the first deployment, enable GitHub Pages in your repo settings:  
> Settings → Pages → Source: **GitHub Actions**

### Backend → Render / Railway / Fly.io

The backend (Express + SQLite) must be deployed to a Node.js host since GitHub Pages only serves static files.

#### Render Setup

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

4. Set these **environment variables** on the host dashboard:

| Variable                     | Description                                    |
|------------------------------|------------------------------------------------|
| `PORT`                       | Server port (Render sets this automatically)   |
| `SECRET_KEY`                 | JWT signing secret (min 32 chars, random)      |
| `JWT_SECRET`                 | Same as SECRET_KEY                             |
| `GMAIL_USER`                 | Gmail address for sending OTP emails           |
| `GMAIL_APP_PASSWORD`         | Gmail App Password (not your Gmail password)   |
| `OTP_EXPIRE_MINUTES`         | OTP validity duration (default: 10)            |
| `ACCESS_TOKEN_EXPIRE_MINUTES`| JWT token expiry in minutes (default: 30)      |
| `DATABASE_URL`               | `sqlite:///./xelco.db` (or persistent disk path) |

> ⚠️ **SQLite on Render:** Render's free tier uses ephemeral storage. For persistent data, attach a [Render Disk](https://render.com/docs/disks) and point `DATABASE_URL` to it, e.g. `sqlite:///var/data/xelco.db`.

---

## 📁 Project Structure

```
xelco-infratechnologies/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── src/                           # React frontend source
│   ├── components/                # Reusable UI components
│   ├── layouts/                   # Layout wrappers
│   ├── lib/                       # Auth context, Supabase client
│   ├── pages/                     # Route pages
│   ├── routes/                    # Route definitions
│   ├── services/                  # API service layer (axios)
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Entry point
├── server.ts                      # Express backend (auth, OTP, JWT)
├── index.html                     # Vite HTML entry
├── vite.config.ts                 # Vite configuration
├── package.json                   # Dependencies & scripts
├── .env.example                   # Environment variable template
└── README.md                      # This file
```

---

## 🔑 Environment Variable Reference

See [.env.example](.env.example) for the full list with comments.

---

## 📜 Available Scripts

| Script          | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start Vite dev server (port 3000)  |
| `npm start`     | Start Express backend (port 5000)  |
| `npm run build` | Build frontend for production      |
| `npm run lint`  | Type-check with TypeScript         |

---

## 📄 License

Private — XelCo InfraTechnologies
