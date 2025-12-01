export type UserRole = 'COUNSELLOR' | 'ADMIN' | 'SUPER_ADMIN'
export type StudentStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING'
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST'
export type ApplicationStatus = 'DRAFT' | 'APPLIED' | 'DOCUMENTS_SENT' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'WAITING_LIST'
export type ServiceType = 'BLOCKED_ACCOUNT' | 'HEALTH_INSURANCE' | 'COURSE_SELECTION' | 'AIRPORT_PICKUP' | 'BANK_ACCOUNT' | 'SIM_CARD' | 'ACCOMMODATION' | 'LOAN' | 'FLIGHT_BOOKING' | 'APS_VERIFICATION' | 'VISA_APPLICATION'
export type ServiceStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  assignedStudents: number
  isActive: boolean
}

export interface StudentListItem {
  id: string
  name: string
  email: string
  phone: string
  status: StudentStatus
  profileCompletion: number
  apsStatus: string
  documentsStatus: string
  assignedCounsellor: string
  lastActivity: Date
  intake: string
  country: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: LeadStatus
  assignedTo?: string
  createdAt: Date
  lastContact?: Date
  notes?: string
}

export interface DocumentReview {
  id: string
  type: 'APS_FORM' | 'SOP' | 'LOR' | 'RESUME' | 'COVER_LETTER' | 'OTHER'
  studentId: string
  studentName: string
  submittedAt: Date
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED'
  reviewedBy?: string
  reviewedAt?: Date
  comments?: string
}

export interface Application {
  id: string
  studentId: string
  studentName: string
  universityName: string
  programName: string
  status: ApplicationStatus
  submittedAt: Date
  decisionDate?: Date
  assignedCounsellor: string
  notes?: string
}

export interface Service {
  id: string
  type: ServiceType
  studentId: string
  studentName: string
  status: ServiceStatus
  startDate?: Date
  completionDate?: Date
  notes?: string
  documents?: string[]
}

export interface AdminMetrics {
  totalStudents: number
  activeStudents: number
  pendingReviews: number
  upcomingConsultations: number
  recentApplications: number
  documentApprovalRate: number
  studentSatisfaction: number
}

export interface RecentActivity {
  id: string
  type: 'DOCUMENT_SUBMITTED' | 'APPLICATION_UPDATED' | 'STUDENT_REGISTERED' | 'STATUS_CHANGED' | 'CONSULTATION_SCHEDULED'
  studentName: string
  description: string
  timestamp: Date
}

export interface CounsellorPerformance {
  counsellorId: string
  counsellorName: string
  studentsAssigned: number
  documentsReviewed: number
  averageReviewTime: number // in hours
  approvalRate: number
  studentSatisfaction: number
}

export interface AnalyticsData {
  period: string
  totalStudents: number
  newStudents: number
  activeApplications: number
  documentsApproved: number
  apsVerified: number
  consultationsHeld: number
  conversionRate: number
}
