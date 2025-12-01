'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  FileText, 
  Calendar, 
  User, 
  MessageSquare,
  Upload,
  ArrowRight
} from 'lucide-react'
import { DashboardActivity, DashboardNotification } from '@/lib/dashboard-types'
import { formatTimeAgo } from '@/lib/dashboard-mock-data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface RecentActivityProps {
  activities: DashboardActivity[]
  className?: string
  maxItems?: number
}

export function RecentActivity({ activities, className, maxItems = 5 }: RecentActivityProps) {
  const displayActivities = activities.slice(0, maxItems)

  function getActivityIcon(type: string) {
    switch (type) {
      case 'DOCUMENT_UPLOAD':
        return <Upload className="w-4 h-4" />
      case 'DOCUMENT_APPROVED':
        return <CheckCircle2 className="w-4 h-4" />
      case 'APS_VERIFIED':
        return <CheckCircle2 className="w-4 h-4" />
      case 'MESSAGE_RECEIVED':
        return <MessageSquare className="w-4 h-4" />
      case 'APPLICATION_UPDATE':
        return <FileText className="w-4 h-4" />
      case 'MEETING_SCHEDULED':
        return <Calendar className="w-4 h-4" />
      case 'PROFILE_UPDATE':
        return <User className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  function getActivityColor(type: string): string {
    switch (type) {
      case 'DOCUMENT_APPROVED':
      case 'APS_VERIFIED':
        return 'text-green-600 bg-green-50'
      case 'DOCUMENT_UPLOAD':
        return 'text-blue-600 bg-blue-50'
      case 'MESSAGE_RECEIVED':
        return 'text-purple-600 bg-purple-50'
      case 'MEETING_SCHEDULED':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (displayActivities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/activity">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex gap-4 p-3 rounded-lg transition-colors",
                activity.link && "hover:bg-accent cursor-pointer"
              )}
              onClick={() => activity.link && (window.location.href = activity.link)}
            >
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                getActivityColor(activity.type)
              )}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">{activity.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>

              {/* Arrow */}
              {activity.link && (
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface NotificationsPanelProps {
  notifications: DashboardNotification[]
  className?: string
  maxItems?: number
  onMarkAsRead?: (id: string) => void
}

export function NotificationsPanel({ 
  notifications, 
  className, 
  maxItems = 5,
  onMarkAsRead
}: NotificationsPanelProps) {
  const displayNotifications = notifications.slice(0, maxItems)
  const unreadCount = notifications.filter(n => !n.read).length

  function getNotificationIcon(type: string) {
    switch (type) {
      case 'DOCUMENT':
        return <FileText className="w-4 h-4" />
      case 'APS':
        return <CheckCircle2 className="w-4 h-4" />
      case 'MESSAGE':
        return <MessageSquare className="w-4 h-4" />
      case 'APPLICATION':
        return <FileText className="w-4 h-4" />
      case 'MEETING':
        return <Calendar className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  function getNotificationColor(type: string): string {
    switch (type) {
      case 'APS':
        return 'text-green-600 bg-green-50'
      case 'DOCUMENT':
        return 'text-blue-600 bg-blue-50'
      case 'MESSAGE':
        return 'text-purple-600 bg-purple-50'
      case 'MEETING':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (displayNotifications.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full px-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/notifications">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        <CardDescription>Stay updated with your application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex gap-3 p-3 rounded-lg transition-colors border",
                !notification.read && "bg-blue-50/50 border-blue-200",
                notification.read && "border-transparent",
                notification.link && "hover:bg-accent cursor-pointer"
              )}
              onClick={() => {
                if (onMarkAsRead && !notification.read) {
                  onMarkAsRead(notification.id)
                }
                if (notification.link) {
                  window.location.href = notification.link
                }
              }}
            >
              {/* Icon */}
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                getNotificationColor(notification.type)
              )}>
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <p className={cn(
                    "text-sm font-medium",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 ml-2 mt-1" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(notification.timestamp)}
                  </p>
                  {notification.actionLabel && notification.link && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      {notification.actionLabel}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
