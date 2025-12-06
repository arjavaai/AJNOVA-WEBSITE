import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Server-side authentication utilities
 * Only use these in Server Components, API routes, and Server Actions
 */

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function getUserWithProfile() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return null
  }

  // Get user data from database
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', user.id)
    .single()

  if (userError || !userData) {
    return { ...user, dbUser: null, profile: null }
  }

  return {
    ...user,
    dbUser: userData,
    profile: userData.profiles
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!userData || !allowedRoles.includes(userData.role)) {
    redirect('/dashboard')
  }

  return { user, role: userData.role }
}

/**
 * Database user management
 */
export async function createOrUpdateUserInDatabase(authUser: any) {
  const supabase = await createClient()

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()

  if (existingUser) {
    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', authUser.id)

    return existingUser
  }

  // Create new user
  const { data: newUser, error: userError } = await supabase
    .from('users')
    .insert({
      id: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
      role: 'student', // Default role
      auth_provider: 'google',
      google_id: authUser.user_metadata?.sub,
      profile_photo_url: authUser.user_metadata?.avatar_url,
      status: 'active',
      last_login: new Date().toISOString()
    })
    .select()
    .single()

  if (userError) {
    throw userError
  }

  // Create profile for student
  if (newUser?.role === 'student') {
    await supabase
      .from('profiles')
      .insert({
        user_id: newUser.id,
        first_name: authUser.user_metadata?.full_name?.split(' ')[0],
        last_name: authUser.user_metadata?.full_name?.split(' ').slice(1).join(' '),
        completion_percentage: 0
      })
  }

  return newUser
}
