export type ApplicationStage = 
  | 'CONSULTATION'
  | 'ELIGIBILITY'
  | 'APS'
  | 'DOCUMENTS'
  | 'REVIEW'
  | 'SUBMISSION'

export type StageStatus = 
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'NEEDS_ACTION'

export type ProfileStatus = 
  | 'ACTIVE'
  | 'UNDER_REVIEW'
  | 'VERIFIED'

export type EligibilityBadge = 
  | 'PUBLIC_ELIGIBLE'
  | 'PRIVATE_ELIGIBLE'
  | 'NEEDS_IMPROVEMENT'

export type ActivityType = 
  | 'DOCUMENT_UPLOAD'
  | 'DOCUMENT_APPROVED'
  | 'APS_VERIFIED'
  | 'MESSAGE_RECEIVED'
  | 'APPLICATION_UPDATE'
  | 'MEETING_SCHEDULED'
  | 'PROFILE_UPDATE'

export type NotificationType = 
  | 'DOCUMENT'
  | 'APS'
  | 'MESSAGE'
  | 'APPLICATION'
  | 'MEETING'
  | 'SYSTEM'

export interface ProgressStage {
  id: ApplicationStage
  name: string
  status: StageStatus
  completionDate?: Date
  order: number
}

export interface ProfileSummary {
  completionPercentage: number
  status: ProfileStatus
  missingFields: string[]
  lastUpdated: Date
}

export interface EligibilityResult {
  badge: EligibilityBadge
  readinessScore: number
  explanation: string
  recommendations: string[]
}

export interface DashboardActivity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: Date
  link?: string
  icon: string
}

export interface DashboardNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
  actionLabel?: string
}

export interface QuickStat {
  label: string
  value: number
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
}

export interface UpcomingEvent {
  id: string
  type: 'CONSULTATION' | 'DEADLINE' | 'MEETING' | 'REMINDER'
  title: string
  date: Date
  time?: string
  description?: string
  actionLabel?: string
  actionLink?: string
}

export interface DashboardStats {
  documentsUploaded: number
  documentsApproved: number
  applicationsSubmitted: number
  nextDeadlineDays: number | null
  profileCompletion: number
  apsStatus: string
}

export interface DashboardData {
  studentName: string
  progress: ProgressStage[]
  profileSummary: ProfileSummary
  eligibilityResult: EligibilityResult
  recentActivities: DashboardActivity[]
  notifications: DashboardNotification[]
  upcomingEvents: UpcomingEvent[]
  stats: DashboardStats
}
