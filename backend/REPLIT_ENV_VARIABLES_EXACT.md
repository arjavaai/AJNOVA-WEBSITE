# Exact Environment Variables for Replit Deployment

## Where to Set These

1. Go to https://replit.com
2. Open your backend Repl
3. Click **"Deployments"** tab
4. Click on your deployment
5. Find **"Environment Variables"** section
6. Add each variable below

## Complete List of Environment Variables

### 🔴 CRITICAL - Must Set These First (Fix CORS)

```bash
ENVIRONMENT=production

FRONTEND_URL=https://ajnova-website.vercel.app

CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000

BACKEND_URL=https://ajnova-website--threeatomscom.replit.app
```

### 🟡 Required - Supabase (For Database)

```bash
SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co

SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3NmZGxvdWh3eGlvYWh2YW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MzIwMzksImV4cCI6MjA4MDMwODAzOX0.Qte3GqX751qUPXu8OMZu7vah3dSPs1DmCRNAYOGT3qg

SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3NmZGxvdWh3eGlvYWh2YW1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDczMjAzOSwiZXhwIjoyMDgwMzA4MDM5fQ.DVhzd2F2Xe5qv6lDH146jZF9G-q_HOaiUVymW968x5w

SUPABASE_JWT_SECRET=LwwGsIACnNQQwk7SV/eeRIWHJRfNNxezcolbXmmbkMy24IP6TrphHJM28dVtad4OyqDRTf2Z+dN7SPuPYPKtTA==
```

### 🟡 Required - Security

```bash
SECRET_KEY=ajnova-secret-key-prod-2024-change-this-to-something-random-and-secure

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

**⚠️ SECURITY NOTE:** Generate a better SECRET_KEY with this command:
```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

### 🟡 Required - Google Gemini AI

```bash
GEMINI_API_KEY=AIzaSyC--lxN8E7J2oGIcPvvkYDMqHvliIhKFMs

GEMINI_MODEL=gemini-1.5-pro
```

### 🟢 Optional - Google OAuth (if you use custom OAuth)

```bash
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GOOGLE_REDIRECT_URI=https://ajnova-website--threeatomscom.replit.app/api/v1/auth/google/callback
```

**Note:** These are only needed if you set up custom Google OAuth (not using Supabase auth).

### 🟢 Optional - Email Service

```bash
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY

FROM_EMAIL=noreply@ajnova.com
```

**Note:** Only needed if you want to send emails via SendGrid.

### 🟢 Optional - Rate Limiting & File Upload

```bash
RATE_LIMIT_REQUESTS=100

RATE_LIMIT_PERIOD=60

MAX_FILE_SIZE=10485760
```

**Note:** These have defaults in code, but you can set them explicitly.

## Copy-Paste Ready Format

Here's everything in one block (copy and paste each line):

```
ENVIRONMENT=production
FRONTEND_URL=https://ajnova-website.vercel.app
BACKEND_URL=https://ajnova-website--threeatomscom.replit.app
CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000
SECRET_KEY=ajnova-secret-key-prod-2024-change-this-to-something-random-and-secure
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

## How to Add in Replit

### Visual Guide:

```
Replit Deployment → Environment Variables:

┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
│                                                             │
│ Key:   [ENVIRONMENT                                    ]    │
│ Value: [production                                     ]    │
│                                              [Add] [Cancel] │
├─────────────────────────────────────────────────────────────┤
│ Key:   [FRONTEND_URL                                   ]    │
│ Value: [https://ajnova-website.vercel.app              ]    │
│                                              [Add] [Cancel] │
├─────────────────────────────────────────────────────────────┤
│ Key:   [CORS_ORIGINS_STR                               ]    │
│ Value: [https://ajnova-website.vercel.app,http://loc...]   │
│                                              [Add] [Cancel] │
└─────────────────────────────────────────────────────────────┘
```

### Steps:

1. **For each variable above:**
   - Click "Add Environment Variable" or "New Secret"
   - Enter the **Key** (variable name)
   - Enter the **Value** (the value shown)
   - Click "Add" or "Save"

2. **After adding all variables:**
   - Click "Save" at the bottom
   - Click "Redeploy" or "Deploy"

## Verification Checklist

After setting all variables, verify in Replit:

- [ ] `ENVIRONMENT` = `production`
- [ ] `FRONTEND_URL` = `https://ajnova-website.vercel.app` (NO localhost!)
- [ ] `CORS_ORIGINS_STR` includes both Vercel and localhost URLs
- [ ] `SUPABASE_URL` starts with `https://jvssfdlouhwxioahvame`
- [ ] `SUPABASE_KEY` is the long JWT token
- [ ] `GEMINI_API_KEY` starts with `AIzaSy`
- [ ] All variables saved
- [ ] Deployment redeployed

## Test After Setting

1. **Deploy the backend** in Replit
2. **Visit:** `https://ajnova-website--threeatomscom.replit.app/`
3. **Should see:**
   ```json
   {
     "message": "AJ NOVA API - Immigration Consultancy Platform",
     "status": "online",
     "environment": "production"
   }
   ```
4. **Visit your Vercel site:** `https://ajnova-website.vercel.app/dashboard`
5. **Open DevTools Console** - CORS errors should be GONE
6. **Dashboard should load data** successfully

## Troubleshooting

### "Still getting CORS errors"

Check these variables are EXACTLY:
```
FRONTEND_URL=https://ajnova-website.vercel.app
CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000
```

NO trailing slashes, NO spaces around commas.

### "Can't find Environment Variables section"

Try these locations in Replit:
1. Deployments → [Your Deployment] → Environment Variables
2. Deployments → [Your Deployment] → Settings → Secrets
3. Tools → Secrets (this is for dev, not production)

You want **Deployment Environment Variables** not dev secrets.

### "Variables not taking effect"

1. Make sure you clicked "Save"
2. Make sure you **redeployed** after adding variables
3. Wait 2-3 minutes for deployment to complete
4. Clear browser cache and test again

## Priority Order

If you want to add them gradually, do it in this order:

**Priority 1 (Critical - Fix CORS):**
1. ENVIRONMENT
2. FRONTEND_URL
3. CORS_ORIGINS_STR
4. BACKEND_URL

**Priority 2 (Database Access):**
5. SUPABASE_URL
6. SUPABASE_KEY
7. SUPABASE_SERVICE_KEY
8. SUPABASE_JWT_SECRET

**Priority 3 (Security):**
9. SECRET_KEY
10. ALGORITHM
11. ACCESS_TOKEN_EXPIRE_MINUTES

**Priority 4 (AI Features):**
12. GEMINI_API_KEY
13. GEMINI_MODEL

**Priority 5 (Optional):**
14. Everything else

## Summary

**Total Required Variables:** 14
**Total Optional Variables:** 5
**Most Critical:** FRONTEND_URL and CORS_ORIGINS_STR

**After setting these, your CORS errors will be fixed!**
