# CRITICAL: Set These Environment Variables in Replit NOW

## Problem
Your backend has CORS errors because the environment variables in Replit deployment are not set correctly.

## Exact Steps to Fix

### 1. Go to Replit Deployment Settings

1. Open https://replit.com
2. Find your "ajnova-website" Repl
3. Click **"Deployments"** tab
4. Click on your **active deployment**
5. Find **"Environment Variables"** or **"Secrets"** section

### 2. Add These Environment Variables

Copy and paste these EXACT values:

```bash
ENVIRONMENT=production

FRONTEND_URL=https://ajnova-website.vercel.app

BACKEND_URL=https://ajnova-website--threeatomscom.replit.app

CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000

SECRET_KEY=ajnova-secret-key-prod-2024-change-this-to-something-random

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=10080

SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co

SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3NmZGxvdWh3eGlvYWh2YW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MzIwMzksImV4cCI6MjA4MDMwODAzOX0.Qte3GqX751qUPXu8OMZu7vah3dSPs1DmCRNAYOGT3qg

SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3NmZGxvdWh3eGlvYWh2YW1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDczMjAzOSwiZXhwIjoyMDgwMzA4MDM5fQ.DVhzd2F2Xe5qv6lDH146jZF9G-q_HOaiUVymW968x5w

SUPABASE_JWT_SECRET=LwwGsIACnNQQwk7SV/eeRIWHJRfNNxezcolbXmmbkMy24IP6TrphHJM28dVtad4OyqDRTf2Z+dN7SPuPYPKtTA==

GEMINI_API_KEY=AIzaSyC--lxN8E7J2oGIcPvvkYDMqHvliIhKFMs

GEMINI_MODEL=gemini-1.5-pro

RATE_LIMIT_REQUESTS=100

RATE_LIMIT_PERIOD=60

MAX_FILE_SIZE=10485760
```

### 3. CRITICAL Variables to Double-Check

These are the ones causing your CORS errors:

✅ **FRONTEND_URL** must be:
```
https://ajnova-website.vercel.app
```
NOT `http://localhost:3000`

✅ **CORS_ORIGINS_STR** must include:
```
https://ajnova-website.vercel.app,http://localhost:3000
```

### 4. Save and Redeploy

1. Click **"Save"** or **"Add Secret"** for each variable
2. After all variables are added, click **"Redeploy"** or **"Deploy"**
3. Wait for deployment to complete (2-3 minutes)

### 5. Verify It Works

After deployment completes:

1. Go to: `https://ajnova-website--threeatomscom.replit.app/`
2. Should show:
   ```json
   {
     "message": "AJ NOVA API - Immigration Consultancy Platform",
     "status": "online",
     "version": "1.0.0",
     "environment": "production"
   }
   ```

3. Go to your Vercel site: `https://ajnova-website.vercel.app/dashboard`
4. Open browser DevTools (F12) → Console
5. CORS errors should be GONE
6. Data should load properly

## Visual Guide

### In Replit Deployment Settings:

```
Environment Variables:
┌────────────────────────────────────────────────────────────────┐
│ Key: FRONTEND_URL                                              │
│ Value: https://ajnova-website.vercel.app                      │
│                                                        [Save]   │
├────────────────────────────────────────────────────────────────┤
│ Key: CORS_ORIGINS_STR                                          │
│ Value: https://ajnova-website.vercel.app,http://localhost:3000│
│                                                        [Save]   │
├────────────────────────────────────────────────────────────────┤
│ Key: SUPABASE_URL                                              │
│ Value: https://jvssfdlouhwxioahvame.supabase.co              │
│                                                        [Save]   │
└────────────────────────────────────────────────────────────────┘
```

## Common Mistakes

❌ Setting variables in "Tools → Secrets" (for dev only)
✅ Set in "Deployments → Environment Variables" (for production)

❌ Using `http://` for Vercel URL
✅ Use `https://ajnova-website.vercel.app`

❌ Forgetting to redeploy after adding variables
✅ Always redeploy after changing environment variables

❌ Adding variables one at a time and redeploying each time
✅ Add all variables first, then redeploy once

## Troubleshooting

### Can't Find Environment Variables Section?

Try these locations in Replit:
1. Deployments → [Your Deployment] → Settings → Environment Variables
2. Deployments → [Your Deployment] → Configuration → Secrets
3. Settings → Secrets (but this is for dev, not deployment)

### Still Getting CORS Errors After Deploy?

1. **Wait 2-3 minutes** - deployment needs time to propagate
2. **Clear browser cache** - old responses might be cached
3. **Hard refresh** your Vercel site (Ctrl+Shift+R)
4. **Check Replit logs** - look for errors during startup

### How to Check If Variables Are Set?

Add a debug endpoint in your backend (temporary):

```python
@app.get("/debug/env")
async def debug_env():
    return {
        "FRONTEND_URL": settings.FRONTEND_URL,
        "CORS_ORIGINS": settings.CORS_ORIGINS,
        "ENVIRONMENT": settings.ENVIRONMENT
    }
```

Visit: `https://ajnova-website--threeatomscom.replit.app/debug/env`

Should show your Vercel URL, not localhost.

## After Setup Checklist

- [ ] All environment variables added in Replit deployment
- [ ] FRONTEND_URL is `https://ajnova-website.vercel.app`
- [ ] CORS_ORIGINS_STR includes Vercel URL
- [ ] Clicked "Save" for each variable
- [ ] Redeployed the backend
- [ ] Waited 2-3 minutes for deployment
- [ ] Tested backend health endpoint
- [ ] Tested Vercel frontend dashboard
- [ ] No CORS errors in browser console
- [ ] Data loads on dashboard

## Summary

The fix is simple:
1. Add environment variables in Replit **Deployment** settings (not dev secrets)
2. Make sure `FRONTEND_URL=https://ajnova-website.vercel.app`
3. Make sure `CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000`
4. Redeploy
5. Test

**This should fix all your CORS errors!**
