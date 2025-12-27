# What to Upload to Replit - Complete Checklist

## Files and Folders to Upload

### ✅ MUST Upload (Core Files)

```
backend/
├── app/                          ✅ ENTIRE FOLDER
│   ├── __init__.py
│   ├── config.py                 ✅ CRITICAL - Updated CORS config
│   ├── dependencies.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── admin.py
│   │       ├── applications.py
│   │       ├── aps.py
│   │       ├── auth.py
│   │       ├── consultations.py
│   │       ├── documents.py
│   │       ├── eligibility.py
│   │       ├── messages.py
│   │       ├── notifications.py
│   │       ├── profiles.py
│   │       └── users.py
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── logging.py
│   │   └── rate_limit.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── application.py
│   │   ├── aps.py
│   │   ├── consultation.py
│   │   ├── document.py
│   │   ├── eligibility.py
│   │   ├── profile.py
│   │   └── user.py
│   └── services/
│       ├── __init__.py
│       ├── ai_service.py
│       ├── auth_service.py
│       ├── email_service.py
│       ├── notification_service.py
│       └── storage_service.py
├── main.py                       ✅ CRITICAL - Updated CORS wrapper
├── requirements.txt              ✅ CRITICAL - Dependencies
├── .replit                       ✅ CRITICAL - Updated with build step
├── replit.nix                    ✅ CRITICAL - Python environment
└── README.md                     ✅ Documentation (optional)
```

### ❌ DO NOT Upload (Exclude These)

```
❌ .env                          # Contains secrets - use Replit env vars instead
❌ .env.local                    # Local development only
❌ .env.production               # Contains secrets - use Replit env vars
❌ venv/                         # Virtual environment - Replit creates its own
❌ __pycache__/                  # Python cache - auto-generated
❌ *.pyc                         # Compiled Python files
❌ .git/                         # Git folder (if importing from GitHub, it's handled)
❌ .gitignore                    # Not needed in Replit
❌ backend.log                   # Log files
❌ backend314.log                # Log files
❌ test_*.py                     # Test files (optional to upload)
❌ .vscode/                      # Editor config
❌ .idea/                        # IDE config
```

### 📄 Optional Files (Nice to Have)

```
✓ DEPLOYMENT.md
✓ REPLIT_DEPLOYMENT.md
✓ REPLIT_ENV_VARS_SETUP.md
✓ PRODUCTION_SETUP.md
✓ README.md
✓ supabase/                      # If you want to keep migration files
```

## How to Upload to Replit

### Method 1: Import from GitHub (Recommended)

**Step 1: Push to GitHub**
```bash
cd "D:\brave satya\AJNOVA-WEBSITE\backend"
git add .
git commit -m "Updated backend for production deployment"
git push
```

**Step 2: Import in Replit**
1. Go to https://replit.com
2. Click **"Create Repl"**
3. Select **"Import from GitHub"**
4. Enter your repository URL
5. Replit will automatically import all files (respecting .gitignore)

**Advantages:**
- Easier to update (just push to GitHub and redeploy)
- Version control
- No manual file selection needed

### Method 2: Manual Upload (Alternative)

**Step 1: Create New Repl**
1. Go to https://replit.com
2. Click **"Create Repl"**
3. Select **"Python"** as language
4. Name it "ajnova-backend"

**Step 2: Upload Files**
1. In Replit, click **"Files"** panel on the left
2. Click the **3-dot menu** → **"Upload folder"** or **"Upload file"**
3. Upload these in order:

**First:** Root files
- `main.py`
- `requirements.txt`
- `.replit`
- `replit.nix`

**Second:** The `app` folder
- Click **"Upload folder"**
- Select the entire `app` folder

**Third:** Verify Structure
Make sure your Replit looks like:
```
/
├── main.py
├── requirements.txt
├── .replit
├── replit.nix
└── app/
    ├── __init__.py
    ├── config.py
    ├── api/
    ├── middleware/
    ├── models/
    └── services/
```

## After Upload Checklist

### 1. Verify Files Are Present

In Replit file explorer, check:
- [ ] `main.py` exists in root
- [ ] `requirements.txt` exists in root
- [ ] `.replit` exists in root
- [ ] `replit.nix` exists in root
- [ ] `app/` folder exists
- [ ] `app/config.py` exists
- [ ] `app/api/v1/` folder exists with all route files

### 2. Set Environment Variables

Go to Deployments → Environment Variables and add:

```bash
ENVIRONMENT=production
FRONTEND_URL=https://ajnova-website.vercel.app
BACKEND_URL=https://ajnova-website--threeatomscom.replit.app
CORS_ORIGINS_STR=https://ajnova-website.vercel.app,http://localhost:3000
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
SUPABASE_JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-pro
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60
MAX_FILE_SIZE=10485760
```

**Get the actual keys from your local `backend/.env` file**

### 3. Test Run in Development

Before deploying:
1. Click **"Run"** button in Replit
2. Wait for packages to install
3. Check console for errors
4. Visit the preview URL
5. Should see: `{"message": "AJ NOVA API", "status": "online"}`

### 4. Deploy

1. Click **"Deploy"** button
2. Select deployment type (Autoscale or Reserved VM)
3. Add environment variables in deployment settings
4. Click **"Deploy"**
5. Wait 3-5 minutes

## Quick Command to Prepare Files Locally

Run this in your backend folder to see what will be uploaded:

```bash
cd "D:\brave satya\AJNOVA-WEBSITE\backend"

# See all Python files
find . -name "*.py" -not -path "./venv/*" -not -path "./__pycache__/*"

# See folder structure
tree -I 'venv|__pycache__|*.pyc|.git' -L 3
```

## File Size Check

Make sure your upload isn't too large:
```bash
# Check total size (excluding venv and cache)
du -sh . --exclude=venv --exclude=__pycache__
```

Should be under 10MB (without venv and cache).

## Common Upload Issues

### Issue: "Module not found" errors

**Solution:**
- Make sure all `__init__.py` files are uploaded
- Check that folder structure is intact
- Verify `app/` folder has all subfolders

### Issue: "No such file or directory: .env"

**Solution:**
- This is expected! Don't upload `.env`
- Use Replit environment variables instead
- The updated `config.py` handles missing `.env` gracefully

### Issue: Import errors for local modules

**Solution:**
- Make sure `main.py` is in the root
- Make sure `app/` folder is at the same level as `main.py`
- Check all `__init__.py` files are present

## Summary

### Minimum Files Needed:
1. `main.py` (updated with CORS fix)
2. `requirements.txt`
3. `.replit` (updated with build step)
4. `replit.nix`
5. Entire `app/` folder with all subfolders

### Don't Upload:
- `.env` files (use Replit env vars)
- `venv/` folder
- `__pycache__/` folders
- Log files

### After Upload:
1. Set environment variables in Deployment settings
2. Test run in development
3. Deploy to production
4. Test your Vercel frontend

**That's it! Your backend should be ready to deploy.**
