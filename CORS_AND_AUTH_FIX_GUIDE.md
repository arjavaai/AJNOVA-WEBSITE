# CORS and Authentication Fix Guide

## Problem
You're experiencing two issues:
1. **CORS Error**: "Access to fetch at 'http://localhost:8000/api/v1/profiles/me' from origin 'http://localhost:3000' has been blocked by CORS policy"
2. **500 Internal Server Error**: Backend authentication is failing

## Root Causes

### Issue 1: Missing SUPABASE_JWT_SECRET
The backend needs the Supabase JWT secret to validate authentication tokens. This is causing 500 errors when trying to authenticate requests.

### Issue 2: Possible Network/Firewall Blocking
The requests may not be reaching the backend at all, despite CORS being properly configured.

## Solution Steps

### Step 1: Add Missing Environment Variable

1. **Get your Supabase JWT Secret:**
   - Go to your Supabase Dashboard: https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **API**
   - Scroll down to **JWT Settings**
   - Copy the **JWT Secret** (it's a long string)

2. **Add it to your `.env` file:**
   - Open `backend/.env` (create it if it doesn't exist)
   - Add this line:
   ```
   SUPABASE_JWT_SECRET=your-actual-jwt-secret-here
   ```
   
   Your `.env` should look like this:
   ```env
   # Environment
   ENVIRONMENT=development
   DEBUG=True
   
   # API Configuration
   BACKEND_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:3000
   
   # Security
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=10080
   
   # CORS Origins
   CORS_ORIGINS_STR=http://localhost:3000,http://localhost:3001
   
   # Supabase Configuration
   SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3NmZGxvdWh3eGlvYWh2YW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MzIwMzksImV4cCI6MjA4MDMwODAzOX0.Qte3GqX751qUPXu8OMZu7vah3dSPs1DmCRNAYOGT3qg
   SUPABASE_SERVICE_KEY=your-service-role-key-here
   SUPABASE_JWT_SECRET=your-jwt-secret-here  # <-- ADD THIS!
   
   # Google OAuth (if you have these)
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/google/callback
   
   # Google Gemini AI (if you have this)
   GEMINI_API_KEY=your-gemini-api-key
   GEMINI_MODEL=gemini-1.5-pro
   
   # Email Service
   SENDGRID_API_KEY=your-sendgrid-key
   FROM_EMAIL=noreply@ajnova.com
   ```

### Step 2: Restart Backend

After adding the JWT secret:

```powershell
# In your backend terminal (press Ctrl+C first to stop)
cd "D:\brave satya\AJNOVA-WEBSITE\backend"
venv\Scripts\python.exe -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
```

### Step 3: Check Windows Firewall

If requests still don't reach the backend, check Windows Firewall:

1. Open **Windows Security** → **Firewall & network protection**
2. Click **Allow an app through firewall**
3. Look for **Python** or **uvicorn**
4. Make sure both **Private** and **Public** checkboxes are checked
5. If not listed, click **Change settings** → **Allow another app** → Browse to `D:\brave satya\AJNOVA-WEBSITE\backend\venv\Scripts\python.exe`

### Step 4: Test with Simple Fetch

Open your browser console on http://localhost:3000 and run:

```javascript
// Test 1: Simple GET to check if backend is reachable
fetch('http://localhost:8000/')
  .then(r => r.json())
  .then(data => console.log('Backend response:', data))
  .catch(err => console.error('Backend error:', err));

// Test 2: Check health endpoint
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(data => console.log('Health check:', data))
  .catch(err => console.error('Health check failed:', err));
```

If these work, the CORS is fine. The issue is authentication.

### Step 5: Test Authenticated Request

On http://localhost:3000/test-auth, after logging in with Google, click the "Test API Call" button.

**What to watch for in backend terminal:**
```
[REQUEST] GET http://localhost:8000/api/v1/profiles/me
[HEADERS] Origin: http://localhost:3000
[HEADERS] Authorization: Bearer eyJhbGci...
[RESPONSE] Status: 200
```

If you see these logs, authentication is working!

If you see:
```
[RESPONSE] Status: 401
```
That means the JWT secret is still missing or incorrect.

## Common Issues

### Issue: "Failed to fetch" error
- **Cause**: Backend not running, firewall blocking, or wrong port
- **Fix**: Check backend is running on port 8000, check firewall settings

### Issue: "No 'Access-Control-Allow-Origin' header"
- **Cause**: Backend not receiving the request at all (often a network issue disguised as CORS)
- **Fix**: Make sure backend is actually receiving requests (check for [REQUEST] logs)

### Issue: 401 Unauthorized
- **Cause**: Missing or incorrect SUPABASE_JWT_SECRET
- **Fix**: Double-check your JWT secret in Supabase dashboard and .env file

### Issue: 500 Internal Server Error
- **Cause**: Missing SUPABASE_JWT_SECRET or database connection issue
- **Fix**: Add JWT secret, check Supabase URL and keys are correct

## Verification Checklist

- [ ] SUPABASE_JWT_SECRET added to backend/.env
- [ ] Backend restarted after adding the secret
- [ ] You're logged in with Google (check http://localhost:3000/test-auth)
- [ ] You see [REQUEST] logs in backend terminal when clicking test button
- [ ] Simple fetch tests work in browser console
- [ ] Windows Firewall allows Python/uvicorn

## Quick Test Commands

**Test 1: Check if backend is running**
```powershell
curl http://localhost:8000/
```

**Test 2: Check CORS headers**
```powershell
curl -i -X OPTIONS http://localhost:8000/api/v1/profiles/me -H "Origin: http://localhost:3000"
```

**Test 3: Check if port is listening**
```powershell
netstat -ano | findstr :8000
```

## Next Steps After Fix

Once authentication works:
1. Go to http://localhost:3000/dashboard/profile
2. Fill in your profile information
3. Click "Save Profile"
4. It should now work without CORS or authentication errors! ✅

## Need More Help?

If you're still stuck:
1. Share the **exact error message** from browser console
2. Share the **backend terminal output** when you make a request
3. Confirm whether you see [REQUEST] logs in the backend terminal or not
4. Check if you're actually logged in at http://localhost:3000/test-auth

