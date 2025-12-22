'use client'

import { useState, useEffect } from 'react'
import { Bell, Check, Trash2, Loader2, ExternalLink, MessageSquare } from 'lucide-react'
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NotificationsPanelProps {
  userId: string | undefined
  className?: string
  includeMessages?: boolean
}

export function NotificationsPanel({ userId, className, includeMessages = false }: NotificationsPanelProps) {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useRealtimeNotifications(userId)

  const [messages, setMessages] = useState<any[]>([])
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('notifications')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (userId && includeMessages) {
      fetchMessages()
      // Poll for new messages every 30 seconds
      const interval = setInterval(fetchMessages, 30000)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, includeMessages])

  async function fetchMessages() {
    try {
      const { messages: messagesAPI } = await import('@/lib/api-client')
      const data = await messagesAPI.list()
      setMessages(data.messages || [])
      setUnreadMessages(data.unread_count || 0)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setMessagesLoading(false)
    }
  }

  if (!userId) return null

  // Show only first 5 notifications in dropdown
  const recentNotifications = notifications.slice(0, 5)
  const recentMessages = messages.slice(0, 5)
  
  // Combined unread count
  const totalUnread = includeMessages ? unreadCount + unreadMessages : unreadCount
  
  // Debug logging
  if (includeMessages) {
    console.log('Notifications Panel Debug:', {
      unreadCount,
      unreadMessages,
      totalUnread,
      messagesLength: messages.length
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
        >
          <Bell className="h-5 w-5" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-red-600 rounded-full border-2 border-background">
              {totalUnread > 9 ? '9+' : totalUnread}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        {includeMessages ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs Header */}
            <div className="border-b px-2 py-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notifications" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="messages" className="relative">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                  {unreadMessages > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-red-600 rounded-full">
                      {unreadMessages}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="m-0">
              <ScrollArea className="h-[400px]">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : recentNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Bell className="w-12 h-12 text-muted-foreground opacity-20 mb-3" />
                    <p className="text-sm text-muted-foreground text-center">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
              {notifications.length > 0 && (
                <>
                  <DropdownMenuSeparator className="my-0" />
                  <div className="p-2">
                    <Link href="/dashboard/notifications">
                      <Button variant="ghost" className="w-full justify-between" size="sm">
                        <span>View all notifications</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="m-0">
              <ScrollArea className="h-[400px]">
                {messagesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : recentMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <MessageSquare className="w-12 h-12 text-muted-foreground opacity-20 mb-3" />
                    <p className="text-sm text-muted-foreground text-center">No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentMessages.map((message) => (
                      <MessageItem 
                        key={message.id} 
                        message={message} 
                        userId={userId}
                        onClose={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
              {messages.length > 0 && (
                <>
                  <DropdownMenuSeparator className="my-0" />
                  <div className="p-2">
                    <Link href="/dashboard/messages" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-between" size="sm">
                        <span>View all messages</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold text-base">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-7"
                >
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notifications list */}
            <ScrollArea className="h-[400px]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : recentNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Bell className="w-12 h-12 text-muted-foreground opacity-20 mb-3" />
                  <p className="text-sm text-muted-foreground text-center">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {recentNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer - View All Link */}
            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Link href="/dashboard/notifications">
                    <Button variant="ghost" className="w-full justify-between" size="sm">
                      <span>View all notifications</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Individual notification item component
function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: any
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document_approved':
      case 'application_update':
        return 'text-green-600 bg-green-50'
      case 'document_revision':
      case 'consultation_scheduled':
        return 'text-amber-600 bg-amber-50'
      case 'new_message':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const handleClick = () => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id)
    }
  }

  const content = (
    <div className={cn(
      "px-4 py-3 hover:bg-accent cursor-pointer group relative transition-colors",
      !notification.is_read && "bg-blue-50/50 dark:bg-blue-950/20"
    )}>
      <div className="pr-12">
        <div className="flex items-start gap-3">
          {/* Type indicator dot */}
          <div className={cn(
            "mt-1.5 w-2 h-2 rounded-full flex-shrink-0",
            !notification.is_read ? getTypeColor(notification.type) : "bg-gray-300"
          )} />

          {/* Content */}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-tight">{notification.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.is_read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-blue-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onMarkAsRead(notification.id)
            }}
            title="Mark as read"
          >
            <Check className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-red-100 hover:text-red-600"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(notification.id)
          }}
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )

  if (notification.link) {
    return (
      <Link href={notification.link} onClick={handleClick}>
        {content}
      </Link>
    )
  }

  return <div onClick={handleClick}>{content}</div>
}

// Individual message item component
function MessageItem({
  message,
  userId,
  onClose,
}: {
  message: any
  userId: string
  onClose: () => void
}) {
  const isOwn = message.sender_id === userId
  const formattedTime = formatDistanceToNow(new Date(message.created_at), { addSuffix: true })

  return (
    <Link href="/dashboard/messages" onClick={onClose}>
      <div className={cn(
        "px-4 py-3 hover:bg-accent cursor-pointer transition-colors",
        !message.read && !isOwn && "bg-blue-50/50 dark:bg-blue-950/20"
      )}>
        <div className="flex items-start gap-3">
          {/* Type indicator dot */}
          <div className={cn(
            "mt-1.5 w-2 h-2 rounded-full flex-shrink-0",
            !message.read && !isOwn ? "bg-blue-600" : "bg-gray-300"
          )} />

          {/* Content */}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-tight">
              {isOwn ? 'You' : 'Admin/Counsellor'}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
            <p className="text-xs text-muted-foreground">
              {formattedTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
