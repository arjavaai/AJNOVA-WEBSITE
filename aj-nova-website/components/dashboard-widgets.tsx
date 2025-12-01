'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  CheckCircle2, 
  Send, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  AlertCircle,
  Download,
  Edit
} from 'lucide-react'
import { ProfileSummary, EligibilityResult, UpcomingEvent, QuickStat } from '@/lib/dashboard-types'
import { getDaysUntil } from '@/lib/dashboard-mock-data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface QuickStatsProps {
  stats: {
    documentsUploaded: number
    documentsApproved: number
    applicationsSubmitted: number
    nextDeadlineDays: number | null
  }
  className?: string
}

export function QuickStats({ stats, className }: QuickStatsProps) {
  const statCards: QuickStat[] = [
    {
      label: 'Documents Uploaded',
      value: stats.documentsUploaded,
      icon: 'FileText',
    },
    {
      label: 'Documents Approved',
      value: stats.documentsApproved,
      icon: 'CheckCircle',
    },
    {
      label: 'Applications Submitted',
      value: stats.applicationsSubmitted,
      icon: 'Send',
    },
    {
      label: 'Days Until Deadline',
      value: stats.nextDeadlineDays || 0,
      icon: 'Calendar',
    }
  ]

  function getIcon(iconName: string) {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5" />
      case 'CheckCircle':
        return <CheckCircle2 className="w-5 h-5" />
      case 'Send':
        return <Send className="w-5 h-5" />
      case 'Calendar':
        return <Calendar className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {getIcon(stat.icon)}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface ProfileSummaryCardProps {
  profile: ProfileSummary
  className?: string
}

export function ProfileSummaryCard({ profile, className }: ProfileSummaryCardProps) {
  function getStatusBadge(status: string) {
    const config: Record<string, { variant: any; label: string }> = {
      ACTIVE: { variant: 'default', label: 'Active' },
      UNDER_REVIEW: { variant: 'secondary', label: 'Under Review' },
      VERIFIED: { variant: 'default', label: 'Verified' }
    }
    return <Badge variant={config[status]?.variant}>{config[status]?.label}</Badge>
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile Summary</CardTitle>
          {getStatusBadge(profile.status)}
        </div>
        <CardDescription>Complete your profile to unlock all features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-2xl font-bold text-primary">{profile.completionPercentage}%</span>
          </div>
          <Progress value={profile.completionPercentage} className="h-2" />
        </div>

        {profile.missingFields.length > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">
                  {profile.missingFields.length} field{profile.missingFields.length > 1 ? 's' : ''} missing
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  {profile.missingFields.join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" size="sm" asChild>
            <Link href="/dashboard/profile">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/profile/download">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface EligibilityCardProps {
  result: EligibilityResult
  className?: string
}

export function EligibilityCard({ result, className }: EligibilityCardProps) {
  function getBadgeConfig(badge: string) {
    const config: Record<string, { variant: any; label: string; color: string }> = {
      PUBLIC_ELIGIBLE: { 
        variant: 'default', 
        label: 'Public University Eligible', 
        color: 'text-green-700 bg-green-50 border-green-200' 
      },
      PRIVATE_ELIGIBLE: { 
        variant: 'secondary', 
        label: 'Private University Eligible', 
        color: 'text-amber-700 bg-amber-50 border-amber-200' 
      },
      NEEDS_IMPROVEMENT: { 
        variant: 'destructive', 
        label: 'Needs Improvement', 
        color: 'text-red-700 bg-red-50 border-red-200' 
      }
    }
    return config[badge] || config.NEEDS_IMPROVEMENT
  }

  const badgeConfig = getBadgeConfig(result.badge)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your Eligibility Result</CardTitle>
        <CardDescription>Based on your academic profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("p-4 rounded-lg border", badgeConfig.color)}>
          <div className="flex items-center justify-between mb-3">
            <Badge variant={badgeConfig.variant} className="text-sm">
              {badgeConfig.label}
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold">{result.readinessScore}%</div>
              <div className="text-xs">Readiness Score</div>
            </div>
          </div>
          <p className="text-sm">{result.explanation}</p>
        </div>

        {result.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Recommendations:</h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href="/dashboard/consultations">
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/profile">
              Improve Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface UpcomingEventsProps {
  events: UpcomingEvent[]
  className?: string
  maxItems?: number
}

export function UpcomingEvents({ events, className, maxItems = 3 }: UpcomingEventsProps) {
  const displayEvents = events.slice(0, maxItems)

  function getEventIcon(type: string) {
    switch (type) {
      case 'CONSULTATION':
        return <Calendar className="w-4 h-4" />
      case 'DEADLINE':
        return <AlertCircle className="w-4 h-4" />
      case 'MEETING':
        return <Calendar className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  function getEventColor(type: string): string {
    switch (type) {
      case 'CONSULTATION':
        return 'text-blue-600 bg-blue-50'
      case 'DEADLINE':
        return 'text-red-600 bg-red-50'
      case 'MEETING':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (displayEvents.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
            <p className="text-sm text-muted-foreground">No upcoming events</p>
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
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule and deadlines</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/calendar">
              View Calendar
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date)
            
            return (
              <div
                key={event.id}
                className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                onClick={() => event.actionLink && (window.location.href = event.actionLink)}
              >
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  getEventColor(event.type)
                )}>
                  {getEventIcon(event.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    {daysUntil <= 3 && daysUntil >= 0 && (
                      <Badge variant="destructive" className="ml-2 flex-shrink-0">
                        {daysUntil === 0 ? 'Today' : `${daysUntil}d`}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {event.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {event.time && ` at ${event.time}`}
                  </p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  )}
                </div>

                {/* Arrow */}
                {event.actionLink && (
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
