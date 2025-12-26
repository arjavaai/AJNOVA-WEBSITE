# AJ NOVA Platform - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

This guide will help you get the entire AJ NOVA platform running locally.

### Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **Python 3.11+** installed ([Download](https://www.python.org/downloads/))
- ✅ **pnpm** installed (`npm install -g pnpm`)
- ✅ **Git** installed
- ✅ A **Supabase** account (free tier is fine)
- ✅ A **Google Cloud** account (for OAuth and Gemini)

### Step-by-Step Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/arjavaai/AJNOVA-WEBSITE.git
cd AJNOVA-WEBSITE
```

## 2️⃣ Set Up Supabase Database

### Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project details and create
4. Wait for the project to be ready (~2 minutes)

### Apply Database Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click "New query"
4. Open `backend/supabase/migrations/001_initial_schema.sql`
5. Copy all contents and paste into the SQL Editor
6. Click "Run" to execute the migration
7. You should see "Success. No rows returned"

### Configure Storage

1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Name: `documents`
4. Set as **Private**
5. Click "Create bucket"

### Get Your Credentials

1. Go to **Settings** → **API**
2. Note down:
   - **Project URL** (e.g., https://abcdef.supabase.co)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

## 3️⃣ Set Up Google Services

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:8000/api/v1/auth/google/callback`
   - Add your production URL later
7. Click "Create"
8. Note down **Client ID** and **Client Secret**

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create API key
4. Note it down

## 4️⃣ Configure Backend

```bash
cd backend

# Copy environment template
cp env.example .env

# Edit .env file with your credentials
# (Use your favorite editor: nano, vim, notepad, VSCode, etc.)
```

**Edit `.env` file:**

```env
# Backend Configuration
ENVIRONMENT=development
DEBUG=True
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Security - Generate a random string for SECRET_KEY
SECRET_KEY=your-super-secret-key-change-this-to-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Supabase (from Step 2)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here

# Google OAuth (from Step 3)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/google/callback

# Google Gemini AI (from Step 3)
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-pro

# Email (Optional - can skip for now)
SENDGRID_API_KEY=
FROM_EMAIL=noreply@ajnova.com

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60

# File Upload
MAX_FILE_SIZE=10485760
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start Backend Server

**Windows:**
```bash
.\start_server.bat
```

**macOS/Linux:**
```bash
python -m uvicorn app.main:app --reload --port 8000
```

You should see:
```
🚀 Starting AJ NOVA Backend API...
📍 Environment: development
🔗 API URL: http://localhost:8000
INFO:     Application startup complete.
```

**Open in browser:** http://localhost:8000/api/docs

You should see the interactive API documentation! 🎉

## 5️⃣ Configure Frontend

Open a **NEW terminal** (keep backend running):

```bash
cd aj-nova-website

# Install dependencies
pnpm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
echo "GEMINI_API_KEY=your-gemini-api-key" >> .env.local

# Start development server
pnpm dev
```

You should see:
```
  ▲ Next.js 16.0.7 (Turbopack)
  - Local:         http://localhost:3000
  - Network:       http://192.168.1.x:3000

✓ Ready in 2.3s
```

**Open in browser:** http://localhost:3000

You should see the AJ NOVA landing page! 🎉

## 6️⃣ Test the System

### Test Backend API

1. Go to http://localhost:8000/api/docs
2. Try the "Health Check" endpoint:
   - Expand `GET /health`
   - Click "Try it out"
   - Click "Execute"
   - You should see: `{"status": "healthy", ...}`

### Test Frontend

1. Go to http://localhost:3000
2. You should see the landing page
3. Navigate to different sections

### Test Authentication (Optional)

1. Click "Login" on the frontend
2. You'll be redirected to Google OAuth
3. After login, you'll be redirected back
4. You should see the dashboard

## 🎯 Common Issues & Solutions

### Backend Issues

**❌ ModuleNotFoundError: No module named 'app'**
- **Solution:** Make sure you're in the `backend` directory when running uvicorn
- Run: `cd backend && python -m uvicorn app.main:app --reload --port 8000`

**❌ DLL load failed (cryptography error on Windows)**
- **Solution:** 
  ```bash
  pip uninstall cryptography
  pip install cryptography==41.0.7
  ```

**❌ Port 8000 already in use**
- **Solution:** Kill the process or use a different port:
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:8000 | xargs kill -9
  ```

**❌ Supabase connection error**
- **Solution:** Verify your SUPABASE_URL and SUPABASE_SERVICE_KEY are correct
- Make sure there are no trailing spaces
- Ensure migration was applied successfully

**❌ Google OAuth error**
- **Solution:** 
  - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
  - Check redirect URI matches exactly
  - Ensure OAuth consent screen is configured

### Frontend Issues

**❌ Port 3000 already in use**
- **Solution:** Next.js will automatically use the next available port (3001, 3002, etc.)

**❌ Module not found errors**
- **Solution:**
  ```bash
  rm -rf node_modules .next
  pnpm install
  ```

**❌ Can't connect to backend**
- **Solution:** 
  - Verify backend is running on port 8000
  - Check NEXT_PUBLIC_API_URL in .env.local
  - Open browser console for error details

### Database Issues

**❌ Migration failed**
- **Solution:**
  - Copy migration file content carefully
  - Run in Supabase SQL Editor, not local psql
  - Check for any syntax errors highlighted

**❌ RLS policy errors**
- **Solution:** For development, you can temporarily disable RLS:
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```

## 📁 Project Structure

```
AJNOVA-WEBSITE/
├── backend/                     # FastAPI Backend ✅
│   ├── app/
│   │   ├── main.py             # Entry point
│   │   ├── api/v1/             # API endpoints
│   │   ├── models/             # Data models
│   │   ├── services/           # Business logic
│   │   └── middleware/         # Middleware
│   ├── .env                    # Your config (NOT in git)
│   ├── env.example             # Template
│   └── requirements.txt        # Dependencies
│
├── aj-nova-website/            # Next.js Frontend ✅
│   ├── app/                    # Pages
│   ├── components/             # Components
│   ├── lib/                    # Utilities
│   └── .env.local              # Your config (NOT in git)
│
└── PRD/                        # Documentation
```

## 🔐 Security Notes

- ⚠️ **Never commit `.env` or `.env.local` files to git**
- ⚠️ Use strong, random strings for `SECRET_KEY`
- ⚠️ Keep API keys secure and rotate them regularly
- ⚠️ Use HTTPS in production
- ⚠️ Enable RLS policies in Supabase for production

## 📚 Next Steps

### For Development:

1. ✅ **Read the documentation:**
   - `COMPLETE_IMPLEMENTATION_GUIDE.md` - Full overview
   - `backend/README.md` - Backend details
   - `backend/DEPLOYMENT.md` - Deployment guide

2. ✅ **Explore the API:**
   - Open http://localhost:8000/api/docs
   - Try different endpoints
   - Understand the data models

3. ✅ **Understand the frontend:**
   - Check `aj-nova-website/app/` for page structure
   - Review components in `aj-nova-website/components/`
   - See mock data in `aj-nova-website/lib/mock-data.ts`

4. ✅ **Connect frontend to backend:**
   - Use the API client in `aj-nova-website/lib/api-client.ts`
   - Replace mock data with real API calls
   - Implement authentication flow

### For Production:

1. ✅ **Deploy backend:**
   - Follow `backend/DEPLOYMENT.md`
   - Use Railway, Render, or AWS

2. ✅ **Deploy frontend:**
   - Deploy to Vercel (recommended for Next.js)
   - Update environment variables
   - Configure custom domain

3. ✅ **Configure services:**
   - Update Google OAuth redirect URIs
   - Set production CORS origins
   - Enable monitoring and logging

## 🆘 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review error messages carefully
3. Check the API docs: http://localhost:8000/api/docs
4. Review the implementation guide: `COMPLETE_IMPLEMENTATION_GUIDE.md`
5. Check terminal logs for both frontend and backend

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:8000/api/docs
- [ ] Can access http://localhost:3000
- [ ] Health check endpoint returns success
- [ ] Can view database tables in Supabase dashboard
- [ ] Environment variables are set correctly

## 🎉 Success!

Congratulations! You now have the complete AJ NOVA platform running locally. 

**Backend:** http://localhost:8000
**Frontend:** http://localhost:3000
**API Docs:** http://localhost:8000/api/docs

Happy coding! 🚀
