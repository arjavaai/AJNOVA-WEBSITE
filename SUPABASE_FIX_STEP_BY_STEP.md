# STEP-BY-STEP: Fix Localhost Redirect Issue

## Current Problem
When you login at `https://ajnova-website.vercel.app/login`, it redirects to:
```
http://localhost:3000/?code=2a52d644-c402-48e5-8628-7611ae97a327
```

This means **Supabase Site URL is still set to localhost**.

## EXACT Steps to Fix (Follow Carefully)

### Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Login to your account
3. You should see your project: **jvssfdlouhwxioahvame**
4. Click on the project

### Step 2: Navigate to Authentication Settings

1. On the left sidebar, click **"Authentication"** (shield icon)
2. Then click **"URL Configuration"** (should be in the sub-menu)
3. You should now see these fields:
   - Site URL
   - Redirect URLs
   - Additional Redirect URLs (might be called differently)

### Step 3: Update Site URL (CRITICAL)

Find the field labeled **"Site URL"**

**Current value (WRONG):**
```
http://localhost:3000
```

**Change it to:**
```
https://ajnova-website.vercel.app
```

**IMPORTANT NOTES:**
- Use `https://` NOT `http://`
- NO trailing slash at the end
- Exact URL: `https://ajnova-website.vercel.app`

### Step 4: Update Redirect URLs

Find the field labeled **"Redirect URLs"** or **"Additional Redirect URLs"**

This field should contain a list of allowed redirect URLs. Update it to include BOTH:

```
https://ajnova-website.vercel.app/**
http://localhost:3000/**
```

**Format:**
- One URL per line, OR comma-separated (depends on Supabase UI)
- Must include `/**` at the end (wildcard to allow all paths)
- Keep localhost for local development

### Step 5: Check Auth Providers Settings

While you're in the Authentication section:

1. Click **"Providers"** in the left menu
2. Find **"Google"** provider
3. Make sure it's **Enabled**
4. Check if there are any URL settings here
5. If there's a "Redirect URL" field, it should be:
   ```
   https://jvssfdlouhwxioahvame.supabase.co/auth/v1/callback
   ```

### Step 6: Save Everything

1. Click **"Save"** button (usually at bottom right)
2. Wait for confirmation message
3. **IMPORTANT:** Supabase settings can take 1-2 minutes to propagate

### Step 7: Clear Browser Cache

1. Open your browser
2. Clear cookies and cache (or use Incognito/Private mode)
3. This ensures old OAuth redirects are cleared

### Step 8: Test the Login Flow

1. Go to `https://ajnova-website.vercel.app/login`
2. Click "Sign up with Google"
3. Complete Google OAuth
4. **Expected result:** Should redirect to `https://ajnova-website.vercel.app/dashboard`
5. **If still wrong:** Continue to troubleshooting below

## Visual Guide - What You Should See

### In Supabase Dashboard → Authentication → URL Configuration:

```
┌─────────────────────────────────────────────────────────┐
│ Site URL                                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ https://ajnova-website.vercel.app                   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ Redirect URLs                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ https://ajnova-website.vercel.app/**                │ │
│ │ http://localhost:3000/**                            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│                                     [Save] [Cancel]      │
└─────────────────────────────────────────────────────────┘
```

## Still Not Working? Try This

### Option A: Check Supabase Project Settings (Alternative Location)

Sometimes these settings are in a different location:

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"Authentication"** under Settings
3. Look for **"Site URL"** and **"Redirect URLs"**
4. Update them as described above

### Option B: Verify What Supabase Actually Has

1. In Supabase Dashboard, go to **SQL Editor**
2. Run this query to see your current auth config:
   ```sql
   SELECT * FROM auth.config;
   ```
3. Look for `site_url` in the results
4. If it shows `localhost:3000`, the Site URL hasn't been updated yet

### Option C: Use Supabase CLI to Update

If the dashboard isn't saving properly:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref jvssfdlouhwxioahvame

# Update site URL via CLI
supabase db execute --sql "UPDATE auth.config SET site_url = 'https://ajnova-website.vercel.app' WHERE TRUE;"
```

## Common Mistakes to Avoid

1. ❌ Adding trailing slash: `https://ajnova-website.vercel.app/`
   ✅ Correct: `https://ajnova-website.vercel.app`

2. ❌ Using http instead of https: `http://ajnova-website.vercel.app`
   ✅ Correct: `https://ajnova-website.vercel.app`

3. ❌ Forgetting the wildcard in Redirect URLs: `https://ajnova-website.vercel.app`
   ✅ Correct: `https://ajnova-website.vercel.app/**`

4. ❌ Not clicking Save button
   ✅ Always click Save and wait for confirmation

5. ❌ Testing immediately without clearing cache
   ✅ Use incognito mode or clear cache first

## Screenshot Checklist

Please verify these in your Supabase Dashboard:

- [ ] Site URL shows: `https://ajnova-website.vercel.app`
- [ ] Redirect URLs includes: `https://ajnova-website.vercel.app/**`
- [ ] Redirect URLs includes: `http://localhost:3000/**`
- [ ] Save button clicked and confirmed
- [ ] Google provider is enabled
- [ ] No other URL fields have localhost values

## What Happens Behind the Scenes

1. User clicks "Sign up with Google" on your Vercel site
2. Frontend calls `signInWithGoogle()` with `redirectTo: ${window.location.origin}/auth/callback`
3. This resolves to: `https://ajnova-website.vercel.app/auth/callback`
4. Supabase checks if this URL is allowed in "Redirect URLs" ✅
5. BUT, Supabase also checks the "Site URL" setting
6. If "Site URL" is `localhost:3000`, Supabase redirects there ❌
7. **FIX:** Set "Site URL" to `https://ajnova-website.vercel.app` ✅

## After You Update Settings

1. **Wait 1-2 minutes** for Supabase to propagate changes
2. **Clear browser cache** or use incognito mode
3. **Test login flow** again
4. **Check the URL** - should be your Vercel URL, not localhost

## Need to Verify Settings?

Take a screenshot of your Supabase → Authentication → URL Configuration page and share it. I can verify if it's configured correctly.

## Emergency Workaround (Temporary)

If you need to test immediately while troubleshooting Supabase:

1. Download the code from Vercel
2. Run locally: `npm run dev`
3. Test at `http://localhost:3000`
4. This will work with current Supabase settings
5. But fix Supabase settings for production!

## Questions to Answer

To help debug further, please answer:

1. Did you find the "Site URL" field in Supabase?
2. What value does it currently show?
3. Were you able to change it to the Vercel URL?
4. Did you click Save?
5. Did you see a success/confirmation message?

Let me know what you see in the Supabase dashboard!
