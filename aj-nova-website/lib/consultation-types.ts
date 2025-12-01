export type ConsultationStatus = 
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED'
  | 'NO_SHOW'

export type ConsultationType = 
  | 'INITIAL'
  | 'FOLLOW_UP'
  | 'SPECIALIZED'

export type ConsultationDuration = 30 | 60

export type MeetingPlatform = 
  | 'ZOOM'
  | 'GOOGLE_MEET'
  | 'MICROSOFT_TEAMS'
  | 'IN_PERSON'

export interface Counsellor {
  id: string
  name: string
  email: string
  expertise: string[]
  avatar?: string
  availability: TimeSlot[]
}

export interface TimeSlot {
  day: string // Day of week or specific date
  startTime: string // HH:MM format
  endTime: string
  available: boolean
}

export interface AvailableSlot {
  date: Date
  time: string // HH:MM format
  counsellorId: string
  available: boolean
}

export interface Consultation {
  id: string
  studentId: string
  counsellorId: string
  counsellorName: string
  date: Date
  time: string // HH:MM format
  duration: ConsultationDuration
  type: ConsultationType
  status: ConsultationStatus
  topic?: string
  platform: MeetingPlatform
  meetingLink?: string
  meetingId?: string
  meetingPassword?: string
  notes?: string
  remindersSent: boolean
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
  completedAt?: Date
  rescheduleReason?: string
}

export interface BookingRequest {
  studentId: string
  preferredDate: Date
  preferredTime: string
  duration: ConsultationDuration
  type: ConsultationType
  topic?: string
  counsellorId?: string // Optional, auto-assign if not provided
}

export interface RescheduleRequest {
  consultationId: string
  newDate: Date
  newTime: string
  reason?: string
}

export interface CancellationRequest {
  consultationId: string
  reason?: string
}

export interface ConsultationHistory {
  consultation: Consultation
  summary?: string
  actionItems?: string[]
  followUpRequired: boolean
}

export interface ConsultationStats {
  totalBooked: number
  totalCompleted: number
  totalCancelled: number
  upcomingCount: number
  completionRate: number
  averageDuration: number
}

export interface ReminderSettings {
  email24Hours: boolean
  email1Hour: boolean
  inAppNotification: boolean
  sms2Hours: boolean
}

// Calendar view data
export interface CalendarDay {
  date: Date
  hasAvailableSlots: boolean
  slotsCount: number
  isToday: boolean
  isPast: boolean
}

export interface SelectedSlot {
  date: Date
  time: string
  counsellorId: string
  counsellorName: string
}
