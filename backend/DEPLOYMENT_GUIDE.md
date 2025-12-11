# FastAPI Backend Deployment Guide - AJ Nova Platform

## Overview

This guide walks you through deploying the AJ Nova FastAPI backend to Railway (or Render) and setting up all required external services.

---

## Phase 1: Code Completion (✅ DONE)

All code updates have been completed:
- ✅ Global error handling added to `main.py`
- ✅ Enhanced health check with database connectivity test
- ✅ Production CORS configuration in `config.py`
- ✅ Dockerfile updated for Railway/Render PORT binding
- ✅ Railway.json configuration created
- ✅ Production environment template created

---

## Phase 2: External Services Setup

### Step 1: Supabase Configuration

**1.1 Get API Credentials**
- Navigate to: https://supabase.com/dashboard/project/jvssfdlouhwxioahvame
- Go to Settings → API
- Copy the following:
  - Project URL (starts with `https://jvssfdlouhwxioahvame.supabase.co`)
  - `anon` key (public key)
  - `service_role` key (secret key - keep secure!)

**1.2 Apply Database Migration**
- Go to Database → SQL Editor
- Click "New Query"
- Copy the entire contents of `backend/supabase/migrations/001_initial_schema.sql`
- Paste and run the migration
- Verify all 10 tables are created:
  - users, profiles, documents, aps_submissions, applications, messages, consultations, leads, notifications, eligibility_results

**1.3 Configure Storage**
- Go to Storage
- Create bucket named `documents`
- Set to **Private** access
- RLS policies should be automatically applied from migration

**1.4 Verify RLS Policies**
- Go to Authentication → Policies
- Verify policies exist for all tables
- Students should only see their own data
- Counsellors and admins should see all data

---

### Step 2: Google OAuth Setup

**2.1 Create OAuth 2.0 Credentials**
- Navigate to: https://console.cloud.google.com/apis/credentials
- Click "Create Credentials" → "OAuth 2.0 Client ID"
- Application type: "Web application"
- Name: "AJ Nova Backend"

**2.2 Configure Authorized Redirect URIs**
Add these URIs (update after deployment):
```
http://localhost:8000/api/v1/auth/google/callback
https://your-app.up.railway.app/api/v1/auth/google/callback
```

**2.3 Configure Authorized JavaScript Origins**
Add these origins:
```
https://ajnova.vercel.app
https://www.ajnova.com
http://localhost:3000
```

**2.4 Save Credentials**
- Copy the `Client ID` (ends with `.apps.googleusercontent.com`)
- Copy the `Client Secret`
- Keep these secure!

---

### Step 3: Google Gemini AI Setup

**3.1 Get API Key**
- Navigate to: https://makersuite.google.com/app/apikey
- Or: https://aistudio.google.com/app/apikey
- Click "Create API Key"
- Select your Google Cloud project
- Copy the API key

**3.2 Test API Key** (Optional)
```bash
curl -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=YOUR_API_KEY"
```

Should return a successful response.

---

### Step 4: SendGrid Email Setup

**4.1 Sign Up**
- Go to: https://signup.sendgrid.com/
- Create a free account (100 emails/day free tier)
- Or upgrade for more capacity

**4.2 Create API Key**
- Navigate to: https://app.sendgrid.com/settings/api_keys
- Click "Create API Key"
- Name: "AJ Nova Backend"
- Permissions: "Full Access" (or at minimum "Mail Send")
- Copy the API key immediately (you won't see it again!)

**4.3 Verify Sender Identity**
- Go to Settings → Sender Authentication
- Option 1: Verify a single sender email (easier for testing)
  - Add email: noreply@ajnova.com
  - Verify via email link
- Option 2: Verify entire domain (recommended for production)
  - Add DNS records for domain authentication

---

### Step 5: Generate Secret Key

Run this command to generate a secure secret key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

Copy the output - this is your `SECRET_KEY`.

---

## Phase 3: Local Testing

### Step 1: Setup Local Environment

```bash
# Navigate to backend directory
cd D:\brave satya\AJNOVA-WEBSITE\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Create .env File

```bash
# Copy the production template
copy .env.production .env

# Edit .env and fill in all the values from steps above
```

Fill in these values in `.env`:
- `SECRET_KEY` - From Step 5
- `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_KEY` - From Step 1
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` - From Step 2
- `GEMINI_API_KEY` - From Step 3
- `SENDGRID_API_KEY` - From Step 4

For local testing, set:
```env
ENVIRONMENT=development
DEBUG=True
BACKEND_URL=http://localhost:8000
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/google/callback
CORS_ORIGINS_STR=http://localhost:3000,http://localhost:3001
```

### Step 3: Start Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
Starting AJ NOVA Backend API...
Environment: development
API URL: http://localhost:8000
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 4: Test Endpoints

Visit: http://localhost:8000/api/docs

Test these endpoints:
- ✅ `/health` - Should return "healthy" with "database: connected"
- ✅ `/` - Should return API info
- ✅ `/api/v1/auth/google` - Should redirect to Google login
- ✅ `/api/v1/profiles/me` - Should return 401 (unauthorized) without token

### Step 5: Test OAuth Flow

1. Open browser to: http://localhost:8000/api/v1/auth/google
2. Should redirect to Google login
3. Login with your Google account
4. Should get redirected back with JWT token
5. Copy the token from URL or response
6. Go to http://localhost:8000/api/docs
7. Click "Authorize" button
8. Paste token: `Bearer YOUR_TOKEN_HERE`
9. Try `/api/v1/auth/me` - should return your user info
10. Try `/api/v1/profiles/me` - should return/create your profile

---

## Phase 4: Deploy to Railway

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

This will open a browser for authentication.

### Step 3: Initialize Project

```bash
cd D:\brave satya\AJNOVA-WEBSITE\backend
railway init
```

Choose:
- "Create new project"
- Enter project name: "ajnova-backend"
- Select team/account

### Step 4: Link Project

```bash
railway link
```

Select the project you just created.

### Step 5: Set Environment Variables

**Option A: Via Railway Dashboard (Recommended)**
1. Go to: https://railway.app/dashboard
2. Select your project
3. Go to "Variables" tab
4. Add all variables from `.env.production`:

```
ENVIRONMENT=production
DEBUG=False
BACKEND_URL=https://ajnova-backend-production.up.railway.app
FRONTEND_URL=https://ajnova.vercel.app
SECRET_KEY=<your-generated-secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
CORS_ORIGINS_STR=https://ajnova.vercel.app,https://www.ajnova.com
SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
SUPABASE_KEY=<your-anon-key>
SUPABASE_SERVICE_KEY=<your-service-key>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REDIRECT_URI=https://ajnova-backend-production.up.railway.app/api/v1/auth/google/callback
GEMINI_API_KEY=<your-gemini-key>
GEMINI_MODEL=gemini-1.5-pro
SENDGRID_API_KEY=<your-sendgrid-key>
FROM_EMAIL=noreply@ajnova.com
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60
MAX_FILE_SIZE=10485760
```

**Option B: Via CLI**
```bash
railway variables set ENVIRONMENT=production
railway variables set DEBUG=False
railway variables set SECRET_KEY=your-secret-here
# ... set all other variables
```

### Step 6: Deploy

```bash
railway up
```

This will:
1. Build Docker image
2. Deploy to Railway
3. Start the application

### Step 7: Get Deployment URL

```bash
railway status
```

Or go to Railway Dashboard → Your Project → Settings → Generate Domain

Your URL will be something like:
```
https://ajnova-backend-production.up.railway.app
```

### Step 8: Update Environment Variables

After getting the deployment URL, update these variables:

```
BACKEND_URL=https://ajnova-backend-production.up.railway.app
GOOGLE_REDIRECT_URI=https://ajnova-backend-production.up.railway.app/api/v1/auth/google/callback
```

Redeploy:
```bash
railway up
```

### Step 9: Update Google OAuth

Go back to Google Cloud Console:
- Add the new redirect URI: `https://ajnova-backend-production.up.railway.app/api/v1/auth/google/callback`
- Save changes

---

## Phase 5: Verify Deployment

### Test Health Check

```bash
curl https://ajnova-backend-production.up.railway.app/health
```

Should return:
```json
{
  "status": "healthy",
  "environment": "production",
  "version": "1.0.0",
  "database": "connected"
}
```

### Test API Docs

Visit: https://ajnova-backend-production.up.railway.app/api/docs

Should see Swagger UI with all endpoints.

### Test OAuth Flow

1. Visit: https://ajnova-backend-production.up.railway.app/api/v1/auth/google
2. Login with Google
3. Should get JWT token
4. Use token to test other endpoints

### Check Railway Logs

```bash
railway logs
```

Or in Railway Dashboard → Your Project → Deployments → View Logs

Look for:
- ✅ No errors
- ✅ "Starting AJ NOVA Backend API..."
- ✅ "Environment: production"
- ✅ Successful health checks

---

## Phase 6: Frontend Integration

### Update Frontend Environment Variables

Edit `aj-nova-website/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://ajnova-backend-production.up.railway.app

# Keep existing Supabase vars
NEXT_PUBLIC_SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Update Backend CORS

After getting production frontend URL from Vercel, update Railway variable:

```env
CORS_ORIGINS_STR=https://your-frontend.vercel.app,https://www.ajnova.com
```

---

## Troubleshooting

### Health Check Fails

**Issue:** `/health` returns 503 or "database: disconnected"

**Solutions:**
1. Verify Supabase credentials are correct
2. Check Railway logs for connection errors
3. Test Supabase connection from Railway:
   ```bash
   railway run python -c "from app.dependencies import get_supabase; get_supabase().table('users').select('id').limit(1).execute()"
   ```

### OAuth Redirect Fails

**Issue:** Google login redirects to error page

**Solutions:**
1. Verify `GOOGLE_REDIRECT_URI` matches exactly in:
   - Railway environment variables
   - Google Cloud Console authorized redirect URIs
2. Check that redirect URI uses HTTPS in production
3. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

### CORS Errors in Frontend

**Issue:** Browser shows CORS errors

**Solutions:**
1. Verify `CORS_ORIGINS_STR` includes your frontend URL
2. Check that frontend URL matches exactly (with/without trailing slash)
3. Redeploy backend after updating CORS settings

### 500 Internal Server Error

**Issue:** All endpoints return 500

**Solutions:**
1. Check Railway logs: `railway logs`
2. Look for Python stack traces
3. Common issues:
   - Missing environment variables
   - Invalid API keys
   - Database connection issues

---

## Monitoring

### Railway Dashboard
- Monitor CPU/Memory usage
- Set up alerts for errors
- Track deployment history

### Supabase Dashboard
- Monitor database performance
- Check query execution times
- Monitor storage usage

### Log Monitoring

View real-time logs:
```bash
railway logs --follow
```

---

## Next Steps

After successful deployment:

1. ✅ Test all API endpoints via Swagger UI
2. ✅ Migrate frontend to use FastAPI endpoints (see main plan)
3. ✅ Remove old Next.js API routes
4. ✅ Deploy updated frontend to Vercel
5. ✅ End-to-end testing in production
6. ✅ Set up monitoring and alerts
7. ✅ Performance optimization

---

## Support Resources

- **Railway Docs:** https://docs.railway.app/
- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **Supabase Docs:** https://supabase.com/docs
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2
- **Gemini AI:** https://ai.google.dev/docs

---

**Deployment Date:** _______________
**Deployment URL:** _______________
**Status:** _______________
