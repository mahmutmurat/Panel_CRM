# Deployment Instructions for Panel CRM

## Overview

This document provides step-by-step instructions to deploy the Panel CRM full-stack application.

- Frontend: React + Tailwind CSS deployed on Vercel
- Backend: Node.js + Express deployed on Render
- Database: MongoDB Atlas (free tier)
- CI/CD: GitHub Actions for auto-deploy on push to main/deploy branches
- HTTPS: Provided by Vercel and Render by default
- Mobile support: Responsive design with Tailwind CSS

---

## 1. Frontend Deployment on Vercel

### Prerequisites

- GitHub repository with frontend code
- Vercel account linked to GitHub

### Steps

1. Go to [Vercel](https://vercel.com/) and sign in.
2. Click "New Project" and import your GitHub repository.
3. Select the frontend directory (if monorepo) or root if frontend is standalone.
4. Configure build settings:
   - Framework Preset: React
   - Build Command: `npm run build`
   - Output Directory: `dist` (or `build` if using create-react-app)
5. Set environment variables in Vercel dashboard (if any).
6. Deploy the project.
7. Your frontend will be available at a Vercel-generated URL with HTTPS.

---

## 2. Backend Deployment on Render

### Prerequisites

- GitHub repository with backend code
- Render account linked to GitHub

### Steps

1. Go to [Render](https://render.com/) and sign in.
2. Click "New" → "Web Service".
3. Connect your GitHub repository and select the backend directory.
4. Configure build and start commands:
   - Build Command: `npm install`
   - Start Command: `node server.js` (or your entry point)
5. Set environment variables in Render dashboard (e.g., DB connection strings, JWT secrets).
6. Deploy the service.
7. Render provides a public URL with HTTPS.

---

## 3. MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
2. Create a new cluster.
3. Create a database user with password.
4. Whitelist your IP or allow access from anywhere (0.0.0.0/0) for testing.
5. Get the connection string URI.
6. Set the URI as an environment variable in backend deployment (e.g., MONGODB_URI).

---

## 4. Environment Variables

- Create `.env` files locally for frontend and backend with necessary variables.
- Add the same variables in Vercel and Render dashboards.

---

## 5. GitHub Actions CI/CD Workflow

- Create `.github/workflows/deploy.yml` to automate deployment on push to main/deploy branches.
- Use Vercel and Render CLI or API for deployment triggers.

---

## 6. Mobile Support and HTTPS

- Tailwind CSS ensures responsive UI.
- Vercel and Render provide HTTPS by default.

---

## 7. Optional Enhancements

- Custom domain setup in Vercel and Render.
- Monitoring tools like Sentry, Logtail, or UptimeRobot.

---

## Example Config Files

- `vercel.json`
- `render.yaml`
- `.env.example`

---

Please let me know if you want me to generate these config files and GitHub Actions workflow next.
