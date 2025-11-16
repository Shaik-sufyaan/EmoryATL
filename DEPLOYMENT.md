

# 12Tree Application - Deployment Guide

Complete guide to deploy your 12Tree educational music app to production using Render.com (free tier).

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Deployment Steps](#detailed-deployment-steps)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Testing Your Deployment](#testing-your-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Cost Breakdown](#cost-breakdown)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with code pushed
- ✅ Render.com account (create at https://render.com)
- ✅ MongoDB Atlas already configured (✓ Already done)
- ✅ API Keys:
  - Gemini API Key
  - ElevenLabs API Key

---

## Quick Start

### Option 1: One-Click Deploy with Blueprint (Recommended)

1. **Push your code to GitHub** (Already done! ✓)

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Blueprint"

3. **Connect Repository**
   - Select your GitHub repository: `Shaik-sufyaan/EmoryATL`
   - Branch: `master`
   - Render will detect `render.yaml`

4. **Set Environment Variables**
   You'll be prompted to set these secret values:
   ```
   ALLOWED_ORIGINS = https://12tree-frontend.onrender.com
   GEMINI_API_KEY = AIzaSyAnDrPNCFf4AF1AmbMmXzXI1zvz3TELg1c
   ELEVENLABS_API_KEY = sk_5d87ed2c1435c24c5cb270567f2c2eaae6a91e25bb6a0183
   VITE_API_URL = https://12tree-backend.onrender.com
   ```

5. **Deploy**
   - Click "Apply"
   - Render will create all services automatically:
     - ✅ Backend API
     - ✅ Celery Worker
     - ✅ Redis Database
     - ✅ Frontend Static Site

6. **Wait for build** (5-10 minutes first time)

---

### Option 2: Manual Setup

If blueprint doesn't work, follow manual setup below.

---

## Detailed Deployment Steps

### Step 1: Create Redis Instance

1. Go to Render Dashboard → "New +" → "Redis"
2. Settings:
   - **Name**: `12tree-redis`
   - **Region**: Oregon (or closest to you)
   - **Plan**: Free (25MB)
3. Click "Create Redis"
4. **Save the Internal Redis URL** (looks like: `redis://red-xxx:6379`)

---

### Step 2: Deploy Backend API

1. Go to "New +" → "Web Service"
2. Connect GitHub repository: `Shaik-sufyaan/EmoryATL`
3. Settings:
   - **Name**: `12tree-backend`
   - **Region**: Oregon
   - **Branch**: master
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Plan**: Free
   - **Instance Type**: Web Service

4. **Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```bash
   # Required
   DEBUG=False
   ALLOWED_ORIGINS=https://12tree-frontend.onrender.com
   REDIS_URL=redis://red-xxx:6379  # From Step 1

   # MongoDB (already configured)
   MONGODB_URL=mongodb+srv://sufyaan1517_db_user:WNEn0Vit54418xMF@cluster0.pxewery.mongodb.net/?appName=Cluster0
   MONGODB_DB_NAME=pirate_karaoke

   # API Keys
   GEMINI_API_KEY=AIzaSyAnDrPNCFf4AF1AmbMmXzXI1zvz3TELg1c
   ELEVENLABS_API_KEY=sk_5d87ed2c1435c24c5cb270567f2c2eaae6a91e25bb6a0183

   # TTS Settings
   TTS_PROVIDER=elevenlabs
   ELEVENLABS_VOICE_ID=cgSgspJ2msm6clMCkdW9
   ELEVENLABS_MODEL=eleven_multilingual_v2
   ELEVENLABS_STABILITY=0.4
   ELEVENLABS_SIMILARITY=0.75
   ELEVENLABS_STYLE=0.6
   ELEVENLABS_BOOST=True
   ```

5. **Add Persistent Disk**:
   - Click "Add Disk"
   - **Name**: `outputs-disk`
   - **Mount Path**: `/app/outputs`
   - **Size**: 1GB (free tier)

6. **Health Check**:
   - Path: `/health`

7. Click "Create Web Service"

8. **Wait for deployment** (~5 minutes)

9. **Copy your backend URL**: `https://12tree-backend.onrender.com`

---

### Step 3: Deploy Celery Worker

1. Go to "New +" → "Background Worker"
2. Connect same GitHub repository
3. Settings:
   - **Name**: `12tree-worker`
   - **Region**: Oregon
   - **Branch**: master
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile.worker`
   - **Plan**: Free

4. **Environment Variables** (same as backend):
   ```bash
   DEBUG=False
   REDIS_URL=redis://red-xxx:6379
   MONGODB_URL=mongodb+srv://sufyaan1517_db_user:WNEn0Vit54418xMF@cluster0.pxewery.mongodb.net/?appName=Cluster0
   MONGODB_DB_NAME=pirate_karaoke
   GEMINI_API_KEY=AIzaSyAnDrPNCFf4AF1AmbMmXzXI1zvz3TELg1c
   ELEVENLABS_API_KEY=sk_5d87ed2c1435c24c5cb270567f2c2eaae6a91e25bb6a0183
   TTS_PROVIDER=elevenlabs
   C_FORCE_ROOT=true
   ```

5. **Add Persistent Disk**:
   - **Name**: `worker-outputs-disk`
   - **Mount Path**: `/app/outputs`
   - **Size**: 1GB

6. Click "Create Background Worker"

---

### Step 4: Deploy Frontend

1. Go to "New +" → "Static Site"
2. Connect GitHub repository
3. Settings:
   - **Name**: `12tree-frontend`
   - **Region**: Oregon
   - **Branch**: master
   - **Build Command**:
     ```bash
     cd Frontend/12Tree-frontend && npm install && npm run build
     ```
   - **Publish Directory**:
     ```
     Frontend/12Tree-frontend/dist
     ```
   - **Plan**: Free

4. **Environment Variable**:
   ```bash
   VITE_API_URL=https://12tree-backend.onrender.com
   ```
   (Use the URL from Step 2)

5. **Auto-Deploy**: Enable

6. Click "Create Static Site"

7. **Wait for build** (~3 minutes)

8. **Copy your frontend URL**: `https://12tree-frontend.onrender.com`

---

## Post-Deployment Configuration

### Update CORS on Backend

1. Go to your backend service (`12tree-backend`)
2. Go to "Environment" tab
3. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://12tree-frontend.onrender.com
   ```
4. Save changes (backend will auto-redeploy)

---

## Testing Your Deployment

### 1. Test Backend Health

Visit: `https://12tree-backend.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "service": "pirate-karaoke",
  "database": "mongodb"
}
```

### 2. Test Frontend

1. Visit: `https://12tree-frontend.onrender.com`
2. You should see the login page
3. Try signing up:
   - Click "Sign up"
   - Create an account
   - Should redirect to `/learn` after signup

### 3. Test Song Generation

1. Log in to your account
2. Go to "Music Mode"
3. Enter a word (e.g., "ocean")
4. Click "Play ♫"
5. Wait 30-60 seconds for generation
6. Should play the generated song

### 4. Test Library Saving

1. After generating a song, click "Add to Library"
2. Should see success toast
3. Go to "Library" page
4. Your song should appear there

---

## Troubleshooting

### Backend Won't Start

**Check logs**:
- Render Dashboard → `12tree-backend` → "Logs" tab

**Common issues**:
- Missing environment variables → Add them in "Environment" tab
- MongoDB connection failed → Check MONGODB_URL
- Redis connection failed → Check REDIS_URL

### Worker Not Processing Songs

**Check logs**:
- Render Dashboard → `12tree-worker` → "Logs" tab

**Common issues**:
- Redis not connected → Verify REDIS_URL matches backend
- API keys invalid → Check GEMINI_API_KEY and ELEVENLABS_API_KEY
- Out of memory → Reduce concurrency in Dockerfile.worker (line 32: `--concurrency=1`)

### Frontend Shows Blank Page

**Check browser console** (F12)

**Common issues**:
- CORS error → Update ALLOWED_ORIGINS on backend
- API not reachable → Check VITE_API_URL is correct
- Build failed → Check build logs in Render

### Songs Not Saving to Library

**Check**:
- Browser Network tab (F12 → Network)
- Look for failed `/api/library/songs` request

**Common issues**:
- Not logged in → Make sure user is authenticated
- Backend error → Check backend logs
- CORS issue → Verify ALLOWED_ORIGINS

---

## Cost Breakdown

### Free Tier Limits (Render.com)

| Service | Plan | Limits |
|---------|------|--------|
| Backend API | Free | 750 hours/month, 512MB RAM, sleeps after 15min |
| Celery Worker | Free | 750 hours/month, 512MB RAM |
| Redis | Free | 25MB storage, 20 connections |
| Frontend | Free | 100GB bandwidth/month, global CDN |
| Disk Storage | Free | 1GB per service |

**Total: $0/month**

### Limitations on Free Tier

- **Cold Starts**: Services sleep after 15 minutes of inactivity. First request takes ~30-60 seconds to wake up.
- **Redis**: 25MB limit (can store ~1000 cached songs)
- **Disk**: 1GB total for generated audio files
- **Bandwidth**: Limited to 100GB/month

### Upgrade Options

If you need better performance:

- **Starter Plan**: $7/month per service
  - No sleep
  - 512MB RAM
  - Faster response times

- **Professional**: $25/month per service
  - 4GB RAM
  - Better for production

---

## Auto-Deploy Setup

Your app is configured for **auto-deploy on git push**:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin master
   ```
3. Render automatically detects the push
4. Services rebuild and redeploy (3-5 minutes)

---

## Monitoring

### View Logs

**Backend**:
- Render Dashboard → `12tree-backend` → "Logs"

**Worker**:
- Render Dashboard → `12tree-worker` → "Logs"

**Frontend**:
- Render Dashboard → `12tree-frontend` → "Logs"

### Metrics

Each service shows:
- CPU usage
- Memory usage
- Request count
- Response times

---

## Security Best Practices

### API Keys

- ✅ Never commit API keys to Git
- ✅ Use Render environment variables
- ✅ Rotate keys regularly

### CORS

- ✅ Set specific origins (not "*")
- ✅ Update when changing frontend URL

### MongoDB

- ✅ Use MongoDB Atlas IP whitelist
- ✅ Strong password
- ✅ Limited user permissions

---

## Next Steps

Once deployed:

1. ✅ **Custom Domain** (optional):
   - Render Settings → "Custom Domains"
   - Add your domain (e.g., `12tree.com`)
   - Update CORS and VITE_API_URL

2. ✅ **Monitoring**:
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Configure alerts for downtime

3. ✅ **Analytics** (optional):
   - Add Google Analytics to frontend
   - Track user engagement

4. ✅ **Backup**:
   - MongoDB Atlas automatic backups ✓
   - Download important songs periodically

---

## Support

If you run into issues:

1. Check this guide's Troubleshooting section
2. Check Render status: https://status.render.com
3. Review application logs
4. Check MongoDB Atlas status

---

## Summary

You've successfully deployed:
- ✅ FastAPI Backend (with Docker)
- ✅ Celery Background Worker
- ✅ Redis Message Broker
- ✅ React Frontend (Static Site)
- ✅ MongoDB Database (Atlas)
- ✅ Auto-deploy on Git Push

**Your app is live at**: `https://12tree-frontend.onrender.com`

**API endpoint**: `https://12tree-backend.onrender.com`

🎉 **Congratulations!** Your educational music app is now live and accessible to users worldwide!
