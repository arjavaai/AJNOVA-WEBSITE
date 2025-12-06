import { createClient } from '@/lib/supabase/server'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

interface CreateNotificationParams {
  userId: string
  title: string
  message: string
  type?: NotificationType
  link?: string
}

export async function createNotification({
  userId,
  title,
  message,
  type = 'info',
  link,
}: CreateNotificationParams) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        link,
        read: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating notification:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error }
  }
}

export async function createNotifications(notifications: CreateNotificationParams[]) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('notifications')
      .insert(
        notifications.map((n) => ({
          user_id: n.userId,
          title: n.title,
          message: n.message,
          type: n.type || 'info',
          link: n.link,
          read: false,
        }))
      )
      .select()

    if (error) {
      console.error('Error creating notifications:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error creating notifications:', error)
    return { success: false, error }
  }
}
