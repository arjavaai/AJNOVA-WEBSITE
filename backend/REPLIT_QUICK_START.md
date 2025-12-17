# 🚀 Quick Start: Deploy Backend to Replit (10 Minutes)

## What You'll Get

✅ Backend running on Replit
✅ Connected to Supabase database
✅ Integrated with Vercel frontend
✅ All API endpoints available
✅ Swagger API documentation

---

## Before You Start - Gather These

### 1. Your Vercel Frontend URL
- Example: `https://ajnova.vercel.app` or `https://your-app.vercel.app`
- Find it: Vercel Dashboard → Your Project → Visit button

### 2. Supabase Credentials
Get from Supabase Dashboard → Project Settings → API:
- ✅ Project URL: `https://xxxxxxxxx.supabase.co`
- ✅ Anon/Public Key: `eyJhbGc...` (long string)
- ✅ Service Role Key: `eyJhbGc...` (different long string)

### 3. Generate Secret Key
- Visit: https://randomkeygen.com/
- Copy a "Fort Knox Password" (min 32 chars)

---

## Step-by-Step Deployment

### Step 1: Upload to Replit (2 minutes)

1. Go to https://replit.com
2. Click **"Create Repl"**
3. Select **"Import from GitHub"** OR **"Upload folder"**

**If uploading folder:**
- Choose **"Python"** template
- Click **"Upload folder"**
- Select your entire `backend` folder
- Wait for upload to complete

**If importing from GitHub:**
- Paste your repository URL
- Replit will import automatically

### Step 2: Verify Files (1 minute)

Check these files exist in your Replit (they should all be there):
- ✅ `main.py`
- ✅ `.replit`
- ✅ `replit.nix`
- ✅ `requirements.txt`
- ✅ `app/` folder

### Step 3: Add Environment Variables (5 minutes)

**CRITICAL STEP - PAY ATTENTION!**

1. In Replit, click **"Tools"** → **"Secrets"** (🔒 lock icon on left sidebar)

2. Add these secrets **ONE BY ONE** (click "+ New secret" for each):

#### Add These Required Secrets:

| Key | Value | Where to Get It |
|-----|-------|-----------------|
| `ENVIRONMENT` | `production` | Just type it |
| `DEBUG` | `False` | Just type it |
| `SECRET_KEY` | Your generated key from randomkeygen.com | Copy from step "Before You Start #3" |
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Dashboard → Settings → API |
| `SUPABASE_KEY` | `eyJhbGc...` | Supabase → API → anon public key |
| `SUPABASE_SERVICE_KEY` | `eyJhbGc...` | Supabase → API → service_role key |

#### Add After First Run (will update later):

| Key | Value | Notes |
|-----|-------|-------|
| `BACKEND_URL` | `https://YOUR-REPL.replit.dev` | You'll get this URL after first run |
| `FRONTEND_URL` | `https://YOUR-APP.vercel.app` | Your Vercel URL |
| `CORS_ORIGINS_STR` | `https://YOUR-APP.vercel.app` | Same as frontend URL |

**Don't worry about BACKEND_URL, FRONTEND_URL, and CORS_ORIGINS_STR yet - we'll add these after the first run!**

### Step 4: First Run (2 minutes)

1. Click the big **"Run"** button at top
2. Wait for installation (1-2 minutes)
3. Watch the console for:
   ```
   [OK] Auth router loaded
   [OK] Users router loaded
   ...
   [SUCCESS] AJ NOVA Backend API initialized
   ```

4. **Copy Your Replit URL:**
   - Look at the preview window that opens
   - The URL will be: `https://SOMETHING.YOUR-USERNAME.repl.co`
   - **COPY THIS URL** - you need it for next step!

### Step 5: Add Final Environment Variables (1 minute)

Now that you have your Replit URL, add the missing secrets:

1. Go back to **"Tools"** → **"Secrets"** (🔒)
2. Add these three:

| Key | Value | Example |
|-----|-------|---------|
| `BACKEND_URL` | Your Replit URL from Step 4 | `https://ajnova-backend.username.repl.co` |
| `FRONTEND_URL` | Your Vercel URL | `https://ajnova.vercel.app` |
| `CORS_ORIGINS_STR` | Your Vercel URL (same) | `https://ajnova.vercel.app` |

3. **Restart the Repl:**
   - Click "Stop" button
   - Click "Run" button again

### Step 6: Test Your Backend (1 minute)

1. **Test Root Endpoint:**
   - Click on the preview URL
   - You should see JSON:
     ```json
     {
       "message": "AJ NOVA API - Immigration Consultancy Platform",
       "status": "online",
       "version": "1.0.0"
     }
     ```

2. **Test API Documentation:**
   - Add `/api/docs` to your URL
   - Example: `https://your-repl.replit.dev/api/docs`
   - You should see **Swagger UI** with all endpoints

3. **Test Health Check:**
   - Visit: `https://your-repl.replit.dev/health`
   - Should show: `{"status":"healthy","service":"AJ NOVA Backend"}`

### Step 7: Enable Always On (30 seconds)

With your paid Replit subscription:

1. Click your **Repl name** (top left)
2. Click **"Settings"**
3. Find **"Always On"** toggle
4. Turn it **ON** ✅

This keeps your backend running 24/7!

### Step 8: Connect Frontend to Backend (3 minutes)

Now tell your Vercel frontend to use your new backend:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"**
   - Click **"Environment Variables"**

2. **Add this variable:**
   ```
   NEXT_PUBLIC_API_URL=https://YOUR-REPL-URL.replit.dev
   ```
   (Use your actual Replit URL from Step 4)

3. **Redeploy Frontend:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

4. **Wait 2-3 minutes** for redeployment

---

## ✅ Final Test: Everything Connected

1. **Open your Vercel frontend:**
   - Visit: `https://your-app.vercel.app`

2. **Open Browser Console:**
   - Press `F12` (Windows) or `Cmd+Option+I` (Mac)
   - Click "Console" tab

3. **Test API Calls:**
   - Try to login / register
   - Try to check eligibility
   - Check console for errors

4. **No CORS errors?** ✅ **YOU'RE DONE!**

---

## 🎉 Success Checklist

If all these work, you're successfully deployed:

- ✅ Replit backend shows "status": "online"
- ✅ `/api/docs` shows Swagger UI
- ✅ `/health` shows healthy status
- ✅ Frontend can call backend APIs
- ✅ No CORS errors in browser console
- ✅ Always On is enabled

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# In Replit Shell tab:
pip install -r requirements.txt --force-reinstall
```
Then click Run again.

### CORS errors in frontend
1. Check `CORS_ORIGINS_STR` in Secrets includes your Vercel URL
2. Make sure there's NO space after comma
3. Restart the Repl

### Supabase not connecting
1. Double-check `SUPABASE_URL` in Secrets
2. Double-check `SUPABASE_KEY` in Secrets
3. Visit your Supabase dashboard - is it working?

### Backend keeps crashing
1. Check Console tab for error messages
2. Look for red error text
3. Most common: missing environment variables

---

## 📋 Your Deployment Info

**Fill this in as you deploy:**

```
✅ Replit URL: https://_______________.repl.co
✅ Vercel URL: https://_______________.vercel.app
✅ Supabase URL: https://_______________.supabase.co

✅ Backend Status: _______________ (check /health)
✅ API Docs: _______________ (check /api/docs)
✅ CORS Working: _______________ (yes/no)
✅ Always On: _______________ (enabled/disabled)
```

---

## 🚀 Next Steps After Testing

Once everything works on Replit:

1. **Test all features thoroughly**
   - User registration
   - Login/logout
   - Eligibility checker
   - Document upload
   - Profile management

2. **For Production (German clients):**
   - Follow `HETZNER_DEPLOYMENT_GUIDE.md` for GDPR compliance
   - Move to German servers (Hetzner Cloud)
   - Set up custom domain

3. **Optional Enhancements:**
   - Enable Google OAuth (add those env vars)
   - Enable Gemini AI chatbot (add API key)
   - Enable SendGrid emails (add API key)

---

## Need Help?

Check these files:
- **Detailed guide:** `REPLIT_DEPLOYMENT_GUIDE.md`
- **Config help:** `env.example`
- **CORS issues:** `app/config.py`

---

**Total Time:** ~10-15 minutes
**Difficulty:** ⭐⭐ (Easy with this guide)

**LET'S GO!** 🚀
