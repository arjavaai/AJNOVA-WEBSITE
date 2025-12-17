# Replit Deployment Guide for AJ NOVA Backend

Complete guide to deploy your FastAPI backend on Replit for testing with Vercel frontend and Supabase database.

## Architecture Overview

```
┌──────────────────────────────────────┐
│ Frontend: Next.js on Vercel         │
│ URL: https://your-app.vercel.app    │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ Backend: FastAPI on Replit          │
│ URL: https://your-repl.replit.dev   │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ Database: Supabase PostgreSQL        │
│ URL: https://xxx.supabase.co         │
└──────────────────────────────────────┘
```

## Prerequisites

- ✅ Replit paid subscription (you have this)
- ✅ Vercel account with deployed frontend
- ✅ Supabase account with database
- ✅ All API keys ready

## Step 1: Create New Replit Project

1. Go to https://replit.com
2. Click "Create Repl"
3. Choose "Import from GitHub" OR "Upload folder"

### Option A: Import from GitHub
- Paste your repository URL
- Select the `backend` folder as root

### Option B: Upload Folder
- Select "Python" as template
- Upload your entire `backend` folder
- Replit will auto-detect the files

## Step 2: Configure Replit Environment

### Files Already Created ✅
The following files are already in your backend folder:
- `main.py` - Production entry point
- `.replit` - Replit configuration
- `replit.nix` - System dependencies
- `requirements.txt` - Python packages

### Verify File Structure
Your Replit project should look like this:
```
backend/
├── main.py                 # ✅ Entry point
├── .replit                 # ✅ Replit config
├── replit.nix              # ✅ Dependencies
├── requirements.txt        # ✅ Python packages
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── dependencies.py
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── profiles.py
│   │       ├── documents.py
│   │       ├── eligibility.py
│   │       ├── aps.py
│   │       ├── applications.py
│   │       ├── messages.py
│   │       ├── consultations.py
│   │       ├── admin.py
│   │       └── notifications.py
│   ├── models/
│   ├── services/
│   └── middleware/
└── env.example
```

## Step 3: Install Dependencies

Replit will automatically install dependencies from `requirements.txt` when you first run the project.

If you need to manually install:
1. Click "Shell" tab in Replit
2. Run:
```bash
pip install -r requirements.txt
```

## Step 4: Set Environment Variables (CRITICAL)

### Using Replit Secrets (Recommended)

1. Click on "Tools" → "Secrets" (lock icon) in left sidebar
2. Add these environment variables one by one:

#### Required Environment Variables:

**Environment Settings:**
```
ENVIRONMENT=production
DEBUG=False
```

**URLs - IMPORTANT:**
```
BACKEND_URL=https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co
FRONTEND_URL=https://YOUR-APP.vercel.app
CORS_ORIGINS_STR=https://YOUR-APP.vercel.app,http://localhost:3000
```
⚠️ Replace `YOUR-REPL-NAME`, `YOUR-USERNAME`, and `YOUR-APP` with actual values!

**Security:**
```
SECRET_KEY=your-super-secret-key-min-32-chars-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```
💡 Generate SECRET_KEY using: https://randomkeygen.com/ (use "Fort Knox Password")

**Supabase Configuration:**
```
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your-anon-public-key
SUPABASE_SERVICE_KEY=your-service-role-key
```
📍 Get these from: Supabase Dashboard → Project Settings → API

**Google OAuth (Optional for now):**
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co/api/v1/auth/google/callback
```

**Google Gemini AI (Optional for now):**
```
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-pro
```

**SendGrid Email (Optional for now):**
```
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@ajnova.com
```

**Rate Limiting:**
```
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60
```

**File Upload:**
```
MAX_FILE_SIZE=10485760
```

### Where to Get Your Replit URL

After creating the Repl, you'll see the URL at the top:
- Format: `https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co`
- Example: `https://ajnova-backend.johndoe.repl.co`

Or when you run the app, click the opened preview window URL.

## Step 5: Run the Application

### First Time Running:

1. Click the "Run" button at the top
2. Replit will:
   - Install all dependencies
   - Start uvicorn server
   - Open preview window

3. You should see:
```
[INFO] Loading API routers...
[OK] Auth router loaded
[OK] Users router loaded
[OK] Profiles router loaded
... (all routers)
[SUCCESS] AJ NOVA Backend API initialized
[INFO] Environment: production
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Check if Backend is Running:

1. Click on the preview window URL
2. You should see:
```json
{
  "message": "AJ NOVA API - Immigration Consultancy Platform",
  "status": "online",
  "version": "1.0.0",
  "environment": "production",
  "docs": "/api/docs"
}
```

3. Test API docs:
   - Visit: `https://YOUR-REPL-URL.repl.co/api/docs`
   - You should see Swagger UI with all endpoints

## Step 6: Update Frontend to Use Replit Backend

Now update your Vercel frontend to connect to Replit backend.

### In Your Frontend Project:

1. Find your API client configuration file
   - Usually: `lib/api-client.ts` or similar

2. Update the API base URL:
```typescript
// Before
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// After
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co'
```

3. **Set Environment Variable in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co
     ```
   - Redeploy your frontend

## Step 7: Test the Full Integration

### Test Backend Health:
```bash
curl https://YOUR-REPL-URL.repl.co/health
```
Expected: `{"status":"healthy","service":"AJ NOVA Backend"}`

### Test CORS:
```bash
curl -H "Origin: https://YOUR-APP.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://YOUR-REPL-URL.repl.co/api/v1/auth/login
```
Should return CORS headers

### Test from Frontend:
1. Open your Vercel app: `https://YOUR-APP.vercel.app`
2. Open browser console (F12)
3. Try to login or call any API endpoint
4. Check for CORS errors

## Step 8: Keep Replit Running (Paid Subscription)

With your paid Replit subscription:
- ✅ "Always On" repls available
- ✅ More CPU and RAM
- ✅ Faster performance

### Enable "Always On":
1. Go to your Repl
2. Click on your Repl name → "Settings"
3. Find "Always On" toggle
4. Enable it ✅

This ensures your backend stays running 24/7.

## Troubleshooting

### Issue: "Module not found" errors
**Solution:**
```bash
# In Replit Shell
pip install -r requirements.txt --force-reinstall
```

### Issue: CORS errors in frontend
**Solution:**
1. Check `CORS_ORIGINS_STR` in Replit Secrets
2. Make sure your Vercel URL is included
3. Restart the Repl

### Issue: Supabase connection failed
**Solution:**
1. Verify `SUPABASE_URL` and `SUPABASE_KEY` in Secrets
2. Check Supabase dashboard is accessible
3. Test connection:
```bash
# In Replit Shell
python -c "from supabase import create_client; import os; client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY')); print('Connected!')"
```

### Issue: Server crashes on startup
**Solution:**
1. Check Logs in Replit console
2. Look for specific router errors
3. Temporarily comment out failing routers in `main.py`

### Issue: Environment variables not loading
**Solution:**
- Use Replit Secrets (lock icon), NOT .env file
- Secrets are automatically loaded as environment variables
- Restart the Repl after adding secrets

## Monitoring Your Backend

### View Logs:
- Click "Console" tab in Replit
- All print statements and errors appear here

### Check Performance:
- Replit paid subscription includes resource monitoring
- Check CPU and Memory usage in dashboard

### API Documentation:
- Swagger UI: `https://YOUR-REPL-URL.repl.co/api/docs`
- ReDoc: `https://YOUR-REPL-URL.repl.co/api/redoc`

## Security Notes

⚠️ **Important for Production:**

1. **Never commit .env files**
   - Use Replit Secrets only
   - .env files are for local development only

2. **Strong SECRET_KEY**
   - Minimum 32 characters
   - Use random generation
   - Different for each environment

3. **CORS Configuration**
   - Only add trusted frontend URLs
   - Don't use `"*"` in production

4. **API Keys**
   - Keep Supabase service key secret
   - Rotate keys if exposed

## Next Steps After Testing

Once testing is successful on Replit:

1. **For Production Deployment:**
   - Move to Hetzner Cloud (Germany) for GDPR compliance
   - Follow HETZNER_DEPLOYMENT_GUIDE.md (to be created)

2. **Custom Domain:**
   - Set up custom domain (e.g., api.ajnova.com)
   - Point DNS to Hetzner server
   - Configure SSL certificates

3. **Database Optimization:**
   - Set up Supabase in EU region
   - Configure database backups
   - Set up monitoring

## Support

If you encounter issues:
1. Check Replit console logs
2. Verify all environment variables
3. Test each endpoint in /api/docs
4. Check Supabase dashboard for connection issues

## Quick Reference

### Your URLs (Update these):
- **Backend (Replit):** https://YOUR-REPL-NAME.YOUR-USERNAME.repl.co
- **Frontend (Vercel):** https://YOUR-APP.vercel.app
- **Database (Supabase):** https://YOUR-PROJECT.supabase.co

### Key Files:
- `main.py` - Application entry point
- `.replit` - Replit configuration
- `requirements.txt` - Python dependencies
- `app/config.py` - Settings management

### Important Commands:
```bash
# Install dependencies
pip install -r requirements.txt

# Run server manually
uvicorn main:app --host 0.0.0.0 --port 8000

# Check Python version
python --version

# Test Supabase connection
python -c "from app.config import settings; print(settings.SUPABASE_URL)"
```

---

**Ready to Deploy!** 🚀

Follow the steps above, and your backend will be live on Replit in 10-15 minutes.
