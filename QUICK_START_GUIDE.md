# Quick Start Guide - AJ Nova Platform

This guide will help you configure and test all the newly implemented features.

---

## 📋 Step 1: Configure Environment Variables

Update your `.env.local` file with the following:

```env
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://jvssfdlouhwxioahvame.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Google Gemini API (Already configured)
GEMINI_API_KEY=your_key_here

# Next.js environment (Already configured)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email configuration (NEW - Required)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@yourdomain.com

# Google Analytics (NEW - Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🔑 Step 2: Get Your API Keys

### Resend (Email Service) - Required

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email
4. Go to API Keys section
5. Create a new API key
6. Copy the key and add to `.env.local`
7. Add your sending domain (or use their test domain for development)

**Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Perfect for development and testing

### Google Analytics - Optional

1. Go to https://analytics.google.com
2. Create a new GA4 property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Add to `.env.local`

---

## 🚀 Step 3: Test the New Features

### Test 1: TanStack Query

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open your dashboard
3. Check browser DevTools → Console
4. Look for React Query DevTools in bottom-right corner
5. Click to expand and see queries

**Expected Result:** DevTools should show active queries and their states

---

### Test 2: Real-Time Notifications

#### Add the Notification Bell to Dashboard

1. Open `app/dashboard/layout.tsx` or your dashboard header component

2. Add the NotificationBell:
   ```tsx
   import { NotificationBell } from '@/components/notifications/notification-bell'
   import { getUser } from '@/lib/auth'

   // In your component
   const user = await getUser()

   // In your JSX
   <NotificationBell userId={user?.id} />
   ```

#### Create a Test Notification

1. Open your browser console
2. Run this command to create a test notification:
   ```javascript
   fetch('/api/send-email', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       template: 'welcome',
       data: {
         email: 'your-email@example.com',
         name: 'Your Name'
       }
     })
   })
   ```

3. Or create a notification directly in Supabase:
   - Go to Supabase dashboard
   - Open `notifications` table
   - Click "Insert row"
   - Fill in:
     - `user_id`: Your user ID
     - `title`: "Test Notification"
     - `message`: "This is a test"
     - `type`: "info"
     - `read`: false

**Expected Result:** Notification should appear in the bell dropdown instantly

---

### Test 3: Email Service

#### Option A: Use the API Route

Create a test file `test-email.ts`:

```typescript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    template: 'welcome',
    data: {
      email: 'your-email@example.com',
      name: 'Test User'
    }
  })
})

console.log(await response.json())
```

#### Option B: Test from Code

In any API route or server component:

```typescript
import { sendEmail } from '@/lib/email'

await sendEmail('welcome', {
  email: 'your-email@example.com',
  name: 'Test User'
})
```

**Expected Result:** You should receive a welcome email

---

### Test 4: Error Handling

#### Test Error Boundary

1. Create a component that throws an error:
   ```tsx
   function BrokenComponent() {
     throw new Error('Test error')
     return <div>This won't render</div>
   }
   ```

2. Wrap it with ErrorBoundary:
   ```tsx
   import { ErrorBoundary } from '@/components/error-boundary'

   <ErrorBoundary>
     <BrokenComponent />
   </ErrorBoundary>
   ```

**Expected Result:** You should see a nice error page with "Try again" and "Go home" buttons

#### Test 404 Page

1. Navigate to a non-existent page: `http://localhost:3000/does-not-exist`

**Expected Result:** You should see a custom 404 page with navigation options

---

### Test 5: Google Analytics

1. Add your GA Measurement ID to `.env.local`
2. Restart your dev server
3. Open your site
4. Check browser DevTools → Network tab
5. Look for requests to `google-analytics.com`

**Expected Result:** You should see analytics tracking requests

---

## 🔗 Step 4: Integrate into Your Application

### Add Notification Bell to Dashboard Header

```tsx
// app/dashboard/layout.tsx
import { NotificationBell } from '@/components/notifications/notification-bell'
import { getUser } from '@/lib/auth'

export default async function DashboardLayout({ children }) {
  const user = await getUser()

  return (
    <div>
      <header>
        {/* Your existing header content */}
        <NotificationBell userId={user?.id} />
      </header>
      {children}
    </div>
  )
}
```

### Send Notifications on Events

```tsx
// When application status changes
import { createNotification } from '@/lib/notifications'
import { sendEmail } from '@/lib/email'

// Create in-app notification
await createNotification({
  userId: student.id,
  title: 'Application Status Update',
  message: `Your application to ${university} has been ${status}`,
  type: 'success',
  link: `/dashboard/applications/${applicationId}`
})

// Send email notification
await sendEmail('application-status', {
  email: student.email,
  name: student.name,
  university,
  program,
  status,
  applicationId
})
```

### Use React Query for Data Fetching

```tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function ApplicationsList() {
  const queryClient = useQueryClient()

  // Fetch applications
  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await fetch('/api/applications')
      return res.json()
    }
  })

  // Create application
  const createMutation = useMutation({
    mutationFn: async (newApplication) => {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplication)
      })
      return res.json()
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.applications?.map(app => (
        <div key={app.id}>{app.university}</div>
      ))}
    </div>
  )
}
```

---

## ✅ Verification Checklist

Before deploying to production, verify:

- [ ] Resend API key is configured and working
- [ ] Test emails are being sent successfully
- [ ] Real-time notifications appear instantly
- [ ] Notification bell shows unread count
- [ ] Error boundaries catch and display errors gracefully
- [ ] 404 page appears for invalid routes
- [ ] Google Analytics is tracking (if configured)
- [ ] React Query DevTools show active queries
- [ ] All environment variables are set

---

## 🔧 Troubleshooting

### Emails Not Sending

1. Check Resend API key is correct
2. Verify sending domain is configured in Resend
3. Check console for errors
4. Verify `FROM_EMAIL` matches your verified domain

### Notifications Not Appearing

1. Check Supabase Realtime is enabled
2. Verify RLS policies allow reading notifications
3. Check browser console for errors
4. Verify user ID is correct

### React Query Not Working

1. Check `QueryProvider` is in `app/layout.tsx`
2. Verify it wraps all components
3. Check browser console for errors
4. Open React Query DevTools to debug

### Error Pages Not Showing

1. Verify files are in correct location:
   - `app/error.tsx`
   - `app/global-error.tsx`
   - `app/not-found.tsx`
2. Check if errors are being thrown correctly
3. Verify components are client components (`'use client'`)

---

## 📚 Additional Resources

- **Resend Docs:** https://resend.com/docs
- **TanStack Query Docs:** https://tanstack.com/query/latest
- **Supabase Realtime Docs:** https://supabase.com/docs/guides/realtime
- **Next.js Error Handling:** https://nextjs.org/docs/app/building-your-application/routing/error-handling
- **Google Analytics:** https://developers.google.com/analytics

---

## 🎉 You're All Set!

Your AJ Nova platform now has:
- ✅ Professional email notifications
- ✅ Real-time in-app notifications
- ✅ Optimized data fetching with React Query
- ✅ Google Analytics tracking
- ✅ Comprehensive error handling
- ✅ Production-ready infrastructure

**Next Steps:**
1. Configure environment variables
2. Test all features locally
3. Integrate notification bell into dashboard
4. Test with real users
5. Deploy to production

Need help? Check the `IMPLEMENTATION_COMPLETED.md` file for detailed documentation.
