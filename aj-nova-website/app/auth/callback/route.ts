import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createOrUpdateUserInDatabase } from '@/lib/auth'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Create or update user in database
      try {
        await createOrUpdateUserInDatabase(data.user)
      } catch (dbError) {
        console.error('Error creating/updating user in database:', dbError)
        // Continue anyway - we'll handle missing user data in the app
      }

      // Redirect to dashboard or requested page
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
