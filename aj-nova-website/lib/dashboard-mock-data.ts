import { 
  DashboardData, 
  ProgressStage, 
  DashboardActivity,
  DashboardNotification,
  UpcomingEvent,
  StageStatus,
  ApplicationStage
} from './dashboard-types'

export const mockDashboardData: DashboardData = {
  studentName: 'Ajay Kumar',
  progress: [
    {
      id: 'CONSULTATION',
      name: 'Initial Consultation',
      status: 'COMPLETED',
      completionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      order: 1
    },
    {
      id: 'ELIGIBILITY',
      name: 'Eligibility Check',
      status: 'COMPLETED',
      completionDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      order: 2
    },
    {
      id: 'APS',
      name: 'APS Verification',
      status: 'IN_PROGRESS',
      order: 3
    },
    {
      id: 'DOCUMENTS',
      name: 'Document Generation',
      status: 'PENDING',
      order: 4
    },
    {
      id: 'REVIEW',
      name: 'Review & Finalize',
      status: 'PENDING',
      order: 5
    },
    {
      id: 'SUBMISSION',
      name: 'Application Submission',
      status: 'PENDING',
      order: 6
    }
  ],
  profileSummary: {
    completionPercentage: 85,
    status: 'ACTIVE',
    missingFields: ['Work Experience', 'Test Scores'],
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  eligibilityResult: {
    badge: 'PUBLIC_ELIGIBLE',
    readinessScore: 82,
    explanation: 'Based on your academic background and profile, you are eligible for public universities in Germany.',
    recommendations: [
      'Consider improving your German language skills for better opportunities',
      'Prepare for APS verification to strengthen your application',
      'Start working on your Statement of Purpose'
    ]
  },
  recentActivities: [
    {
      id: '1',
      type: 'APS_VERIFIED',
      title: 'APS Form Submitted',
      description: 'Your APS verification form has been submitted successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      link: '/dashboard/aps-form',
      icon: 'CheckCircle'
    },
    {
      id: '2',
      type: 'DOCUMENT_UPLOAD',
      title: 'Documents Uploaded',
      description: 'Degree certificate and transcripts uploaded',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      link: '/dashboard/documents',
      icon: 'FileText'
    },
    {
      id: '3',
      type: 'MEETING_SCHEDULED',
      title: 'Consultation Scheduled',
      description: 'Meeting with Dr. Sarah Mitchell on Dec 5, 2025',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      link: '/dashboard/consultations',
      icon: 'Calendar'
    },
    {
      id: '4',
      type: 'PROFILE_UPDATE',
      title: 'Profile Updated',
      description: 'Academic information updated',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      link: '/dashboard/profile',
      icon: 'User'
    }
  ],
  notifications: [
    {
      id: '1',
      type: 'APS',
      title: 'APS Review in Progress',
      message: 'Your APS documents are being reviewed by our team',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
      link: '/dashboard/aps-form',
      actionLabel: 'View Status'
    },
    {
      id: '2',
      type: 'MEETING',
      title: 'Consultation Reminder',
      message: 'You have a consultation tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
      link: '/dashboard/consultations',
      actionLabel: 'View Details'
    },
    {
      id: '3',
      type: 'DOCUMENT',
      title: 'Documents Verified',
      message: 'Your degree certificate has been verified',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      link: '/dashboard/documents',
      actionLabel: 'View Document'
    },
    {
      id: '4',
      type: 'SYSTEM',
      title: 'Profile Completion',
      message: 'Complete your profile to unlock document generation',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      read: true,
      link: '/dashboard/profile',
      actionLabel: 'Complete Profile'
    }
  ],
  upcomingEvents: [
    {
      id: '1',
      type: 'CONSULTATION',
      title: 'Consultation with Dr. Sarah Mitchell',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      description: 'Initial consultation for Masters in Computer Science',
      actionLabel: 'Join Meeting',
      actionLink: '/dashboard/consultations'
    },
    {
      id: '2',
      type: 'DEADLINE',
      title: 'APS Verification Deadline',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: 'Complete APS verification process',
      actionLabel: 'View APS Form',
      actionLink: '/dashboard/aps-form'
    },
    {
      id: '3',
      type: 'DEADLINE',
      title: 'University Application Deadline',
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: 'Technical University of Munich - Winter 2026',
      actionLabel: 'View Application',
      actionLink: '/dashboard/applications'
    }
  ],
  stats: {
    documentsUploaded: 8,
    documentsApproved: 5,
    applicationsSubmitted: 1,
    nextDeadlineDays: 7,
    profileCompletion: 85,
    apsStatus: 'Under Review'
  }
}

// Helper functions
export function getProgressPercentage(progress: ProgressStage[]): number {
  const completed = progress.filter(s => s.status === 'COMPLETED').length
  return Math.round((completed / progress.length) * 100)
}

export function getCurrentStage(progress: ProgressStage[]): ProgressStage | null {
  return progress.find(s => s.status === 'IN_PROGRESS') || 
         progress.find(s => s.status === 'NEEDS_ACTION') ||
         progress.find(s => s.status === 'PENDING') ||
         null
}

export function getUnreadNotificationCount(notifications: DashboardNotification[]): number {
  return notifications.filter(n => !n.read).length
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
  
  const months = Math.floor(days / 30)
  return `${months} month${months !== 1 ? 's' : ''} ago`
}

export function getNextDeadline(events: UpcomingEvent[]): UpcomingEvent | null {
  const deadlines = events
    .filter(e => e.type === 'DEADLINE')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
  
  return deadlines[0] || null
}

export function getDaysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}
