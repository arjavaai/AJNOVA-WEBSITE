# Fix: Login Redirecting to Localhost Instead of Production

## The Problem

When you login at `https://ajnova-website.vercel.app/login`, it redirects to:
```
http://localhost:3000/?code=...
```

Instead of:
```
https://ajnova-website.vercel.app/dashboard
```

## Root Cause

Your **Supabase project** has `localhost:3000` configured as the Site URL or in the redirect allowlist. This happens because Supabase was initially set up for local development.

## The Fix (3 Steps)

### Step 1: Update Supabase Site URL

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (jvssfdlouhwxioahvame)
3. Go to **Settings** → **Authentication** → **URL Configuration**
4. Update **Site URL** to:
   ```
   https://ajnova-website.vercel.app
   ```
5. Click **Save**

### Step 2: Update Redirect URLs

In the same **URL Configuration** section:

1. Find **Redirect URLs** field
2. Add your production URL:
   ```
   https://ajnova-website.vercel.app/**
   ```
3. Keep localhost for development:
   ```
   http://localhost:3000/**
   ```
4. Your final list should look like:
   ```
   https://ajnova-website.vercel.app/**
   http://localhost:3000/**
   ```
5. Click **Save**

### Step 3: Update Vercel Environment Variables (Optional but Recommended)

In your Vercel project:

1. Go to **Settings** → **Environment Variables**
2. Add/Update:
   ```bash
   NEXT_PUBLIC_APP_URL=https://ajnova-website.vercel.app
   NEXT_PUBLIC_API_URL=https://ajnova-website--threeatomscom.replit.app
   ```
3. Redeploy your Vercel app

## Verify the Fix

1. Go to `https://ajnova-website.vercel.app/login`
2. Click "Sign up with Google"
3. Complete Google OAuth
4. Should redirect to: `https://ajnova-website.vercel.app/dashboard`
   - **NOT** `http://localhost:3000/...`

## Why This Happens

When you call `signInWithGoogle()` in the frontend (lib/auth-client.ts:15), it uses:
```typescript
redirectTo: `${window.location.origin}/auth/callback`
```

This correctly uses the current domain. But Supabase checks if the redirect URL is in its allowlist. If the **Site URL** in Supabase is set to `localhost:3000`, Supabase will redirect there instead of your production URL.

## Additional Checks

### Check Google Cloud Console (If Using Custom OAuth)

If you set up Google OAuth separately (not using Supabase's built-in):

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth Client ID
3. Under **Authorized redirect URIs**, make sure you have:
   ```
   https://jvssfdlouhwxioahvame.supabase.co/auth/v1/callback
   ```
4. Click **Save**

### Check Vercel Environment Variables

Make sure these are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `NEXT_PUBLIC_APP_URL` - Your Vercel URL (optional)
- `NEXT_PUBLIC_API_URL` - Your backend URL (if using custom backend)

## Troubleshooting

### Still Redirecting to Localhost?

1. **Clear browser cache and cookies**
2. **Try incognito/private mode**
3. **Check Supabase Site URL** - make sure it's your Vercel URL, not localhost
4. **Redeploy Vercel** after changing environment variables
5. **Wait 5 minutes** - Supabase settings can take a moment to propagate

### Getting "Invalid Redirect URL" Error?

This means the redirect URL is not in Supabase's allowlist:
1. Go to Supabase → Authentication → URL Configuration
2. Add `https://ajnova-website.vercel.app/**` to Redirect URLs
3. Make sure there's a `/**` at the end (wildcard)

### Still Not Working?

Check the browser console for errors:
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors related to auth or redirect
4. Share the error message for further debugging

## Quick Reference

Your URLs:
- **Frontend**: `https://ajnova-website.vercel.app`
- **Backend**: `https://ajnova-website--threeatomscom.replit.app`
- **Supabase**: `https://jvssfdlouhwxioahvame.supabase.co`

Supabase Settings Location:
- Dashboard → Settings → Authentication → URL Configuration

Required Settings:
- **Site URL**: `https://ajnova-website.vercel.app`
- **Redirect URLs**: `https://ajnova-website.vercel.app/**` and `http://localhost:3000/**`

## Summary

The fix is simple:
1. Update Supabase Site URL to your Vercel URL
2. Add Vercel URL to Supabase Redirect URLs allowlist
3. Test login flow

That's it! No code changes needed.
