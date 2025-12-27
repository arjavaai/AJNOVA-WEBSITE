# Production Setup Guide - AJ NOVA Backend

## Your Deployment URLs

- **Backend (Replit)**: `https://ajnova-website--threeatomscom.replit.app/`
- **Frontend (Vercel)**: `https://your-app.vercel.app` (replace with your actual Vercel URL)

## Step 1: Update Replit Environment Variables

Go to your Replit deployment and update these environment variables:

1. Go to https://replit.com
2. Open your "ajnova-website" Repl
3. Click **"Deployments"** tab
4. Click on your active deployment
5. Go to **"Environment Variables"** section
6. Update/Add these variables:

### Required Environment Variables

```bash
# Environment
ENVIRONMENT=production
DEBUG=False

# URLs - CRITICAL: Update these!
BACKEND_URL=https://ajnova-website--threeatomscom.replit.app
FRONTEND_URL=https://your-app.vercel.app  # Replace with your Vercel URL!

# Security
SECRET_KEY=your-strong-random-secret-key-here  # Generate a strong key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS - Add your Vercel URL
CORS_ORIGINS_STR=https://your-app.vercel.app,https://ajnova-website--threeatomscom.replit.app

# Supabase
SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# Google OAuth - CRITICAL: Update redirect URI!
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://ajnova-website--threeatomscom.replit.app/api/v1/auth/google/callback

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-pro

# Email Service (Optional)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@ajnova.com

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60

# File Upload
MAX_FILE_SIZE=10485760
```

## Step 2: Update Google Cloud Console

Your Google OAuth redirect URI needs to include the production URL:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your project
3. Click on your OAuth 2.0 Client ID
4. Under **"Authorized redirect URIs"**, add:
   ```
   https://ajnova-website--threeatomscom.replit.app/api/v1/auth/google/callback
   ```
5. Keep your localhost URI for development:
   ```
   http://localhost:8000/api/v1/auth/google/callback
   ```
6. Click **Save**

## Step 3: Update Vercel Environment Variables

In your Vercel frontend project:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Update/Add:
   ```bash
   NEXT_PUBLIC_API_URL=https://ajnova-website--threeatomscom.replit.app
   ```
4. Redeploy your Vercel app to apply changes

## Step 4: Verify Setup

### Test Backend Health

Visit: `https://ajnova-website--threeatomscom.replit.app/health`

Should return:
```json
{"status": "healthy", "service": "AJ NOVA Backend"}
```

### Test API Docs

Visit: `https://ajnova-website--threeatomscom.replit.app/api/docs`

Should show the FastAPI Swagger UI.

### Test CORS

From your frontend, make a test API call. Check browser console for CORS errors.

### Test Login Flow

1. Go to your Vercel frontend
2. Click "Login with Google"
3. Complete Google OAuth
4. Should redirect to: `https://your-app.vercel.app/dashboard?token=...`
   - NOT `http://localhost:3000/...`

## Troubleshooting

### Still Redirecting to Localhost?

**Problem**: After login, redirects to `http://localhost:3000/?code=...`

**Solution**:
1. Check `FRONTEND_URL` in Replit deployment environment variables
2. Make sure it's set to your Vercel URL, not localhost
3. Redeploy the backend after changing environment variables

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solution**:
1. Check `CORS_ORIGINS_STR` includes your Vercel URL
2. Format: `https://your-app.vercel.app,https://ajnova-website--threeatomscom.replit.app`
3. No trailing slashes
4. Redeploy after changes

### Google OAuth Error

**Problem**: "redirect_uri_mismatch" error

**Solution**:
1. Make sure Google Cloud Console has the production redirect URI
2. Check `GOOGLE_REDIRECT_URI` matches exactly what's in Google Console
3. Format: `https://ajnova-website--threeatomscom.replit.app/api/v1/auth/google/callback`

### 500 Internal Server Error

**Problem**: Backend returns 500 errors

**Solution**:
1. Check Replit deployment logs
2. Look for missing environment variables
3. Verify all required env vars are set
4. Check Supabase keys are correct

## Quick Reference

### Get Your Vercel URL

1. Go to Vercel dashboard
2. Click on your project
3. Copy the URL under "Domains" (e.g., `https://ajnova.vercel.app`)

### Generate Secret Key

```bash
# Run this in your local terminal
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

### Get Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - URL (Project URL)
   - anon/public key
   - service_role key (keep secret!)
5. Go to **Settings** → **API** → **JWT Settings** for JWT secret

## After Setup Checklist

- [ ] All environment variables set in Replit deployment
- [ ] `FRONTEND_URL` points to Vercel, not localhost
- [ ] `GOOGLE_REDIRECT_URI` points to Replit backend
- [ ] Google Cloud Console has production redirect URI
- [ ] Vercel has backend URL in environment variables
- [ ] Backend health check works
- [ ] API docs are accessible
- [ ] Login redirects to Vercel, not localhost
- [ ] CORS working (no errors in browser console)

## Common Mistakes

1. Setting environment variables in "Tools → Secrets" instead of "Deployment → Environment Variables"
2. Forgetting to redeploy after changing environment variables
3. Using localhost URLs in production environment variables
4. Not updating Google Cloud Console redirect URIs
5. Trailing slashes in URLs
6. Not matching redirect URIs exactly between backend config and Google Console

## Need Help?

If you're still having issues:
1. Check Replit deployment logs for errors
2. Check browser console for CORS errors
3. Verify all URLs are correct (no localhost in production)
4. Make sure you redeployed after changing environment variables
