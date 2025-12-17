# AJ NOVA - Quick Start Guide

**Updated for Python 3.13** (December 2025)

## 🚀 Starting the Application

### Step 1: Start the Backend Server

**Option A: Using the startup script (Recommended)**
```bash
# Double-click START_BACKEND.bat
# OR run in terminal:
START_BACKEND.bat
```

This script will:
- Use Python 3.13 from the virtual environment
- Automatically start the backend on port 8000
- Show all loaded API routers

**Option B: Manual start with virtual environment**
```bash
cd backend

# Activate virtual environment (Python 3.13)
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux/Mac

# Start server
python -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
✓ Auth router loaded
✓ Users router loaded
✓ Profiles router loaded
✓ Documents router loaded
✓ Eligibility router loaded
✓ APS router loaded
✓ Applications router loaded
✓ Messages router loaded
✓ Consultations router loaded
✓ Admin router loaded
✓ Notifications router loaded
```

### Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd aj-nova-website
pnpm dev
```

**Expected Output:**
```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 3: Access the Application

1. Open your browser to: **http://localhost:3000**
2. Backend API docs: **http://localhost:8000/api/docs**

---

## ⚠️ Troubleshooting API Errors

### Error: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Cause:** Backend server is not running

**Solution:**
1. Make sure the backend server is started (Step 1 above)
2. Check that it's running on port 8000
3. Look for the "✓ Router loaded" messages in the backend terminal

### Error: "404 Not Found" on `/api/...` routes

**Cause:** Frontend is trying to hit Next.js API routes instead of the backend

**Solution:** Already fixed! The dashboard now uses the proper API client.

### Error: "Unexpected token '<', "<!DOCTYPE "..." is not valid JSON"

**Cause:** API endpoint returned HTML instead of JSON (usually a 404 page)

**Solution:**
1. Ensure backend is running
2. Check that all routers loaded successfully
3. Verify the API endpoint exists at http://localhost:8000/api/docs

---

## 📋 Backend Requirements

### Python Version
This project uses **Python 3.13.11** with a virtual environment.

**Check your setup:**
```bash
# Check Python version (should be 3.13.11)
cd backend
venv\Scripts\python --version

# Check if dependencies are installed
venv\Scripts\pip list
```

**First-time setup:**
```bash
cd backend

# Virtual environment should already exist
# If not, create it:
python -m venv venv

# Activate it
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt
```

**Note:** The virtual environment is already configured with Python 3.13.11 and all dependencies installed. You just need to activate it!

---

## 🔧 Environment Variables

### Backend (.env file in `backend/` folder)

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Optional
SENDGRID_API_KEY=your_sendgrid_key
GEMINI_API_KEY=your_gemini_key
```

### Frontend (.env.local file in `aj-nova-website/` folder)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] All backend routers loaded (see terminal output)
- [ ] Can access API docs at http://localhost:8000/api/docs
- [ ] No console errors in browser
- [ ] Notifications panel shows in header
- [ ] Dashboard loads without errors

---

## 🆕 New Features Implemented

### Backend
✅ Notification API endpoints (`/api/v1/notifications`)
  - GET / - List notifications
  - GET /unread - Unread count
  - PUT /{id}/read - Mark as read
  - PUT /read-all - Mark all as read
  - DELETE /{id} - Delete notification

### Frontend
✅ Journey Progress Tracker
✅ Real-time Notifications Panel
✅ Eligibility Summary Card
✅ APS Document Status Table
✅ Profile PDF Export
✅ Calendar (.ics) Export
✅ Motivational Messages System
✅ Consultation Feedback Modal
✅ Dashboard Footer with Links
✅ Privacy Policy & Terms Pages

---

## 🐛 Common Issues

### Issue: ModuleNotFoundError in backend

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Issue: Port 8000 already in use

**Solution:**
```bash
# Find and kill the process
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
uvicorn app.main_simple:app --reload --port 8001
# Then update NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Issue: pnpm not found

**Solution:**
```bash
npm install -g pnpm
```

---

## 📞 Need Help?

1. Check the console for error messages
2. Verify both servers are running
3. Check API docs at http://localhost:8000/api/docs
4. Review environment variables
5. Contact support at support@ajnova.com

---

**Last Updated:** December 2025
