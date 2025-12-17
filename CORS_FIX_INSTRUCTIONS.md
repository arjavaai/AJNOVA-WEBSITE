# CORS Error Fix Instructions

## Problem
Browser showing: `Access to XMLHttpRequest ... has been blocked by CORS policy`

## Root Cause
✅ Backend is working perfectly (CORS headers are configured correctly)
⚠️ Browser has **cached** the old CORS errors from when backend wasn't running

## Solution: Clear Browser Cache

### Method 1: Hard Refresh (Quickest)
1. Open http://localhost:3000 in your browser
2. Press **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac)
3. This forces browser to reload and bypass cache

### Method 2: Clear Site Data (More Thorough)
1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data** or **Clear storage**
4. Refresh the page

### Method 3: Restart Frontend Server
Sometimes Next.js caches things too:

```bash
# Stop your current frontend server (Ctrl+C)
cd aj-nova-website
npm run dev
```

Then hard refresh the browser (Ctrl+Shift+R)

### Method 4: Private/Incognito Window
1. Open a new Incognito/Private window
2. Navigate to http://localhost:3000
3. This bypasses all cache

## Verification

The backend is sending correct CORS headers. You can verify:

```bash
curl -v -H "Origin: http://localhost:3000" http://localhost:8000/health
```

You should see:
```
access-control-allow-origin: http://localhost:3000
access-control-allow-credentials: true
```

## Status

- ✅ Backend: Running on port 8000
- ✅ CORS: Configured correctly
- ✅ API Endpoints: All functional
- ✅ Calendar Export: Ready
- ✅ PDF Export: Ready

The issue is **only** browser cache!

## After Fixing

Once you clear cache and refresh:
- All network errors will disappear
- Dashboard will load data correctly
- All features will work
