import { 
  StudentListItem, 
  Lead, 
  DocumentReview, 
  Application, 
  Service, 
  AdminMetrics, 
  RecentActivity,
  CounsellorPerformance,
  AnalyticsData
} from './admin-types'

export const mockAdminMetrics: AdminMetrics = {
  totalStudents: 247,
  activeStudents: 189,
  pendingReviews: 23,
  upcomingConsultations: 12,
  recentApplications: 34,
  documentApprovalRate: 92.5,
  studentSatisfaction: 4.6
}

export const mockStudents: StudentListItem[] = [
  {
    id: '1',
    name: 'Ajay Kumar',
    email: 'ajay.kumar@example.com',
    phone: '+91 9876543210',
    status: 'ACTIVE',
    profileCompletion: 85,
    apsStatus: 'Verified',
    documentsStatus: 'In Review',
    assignedCounsellor: 'Dr. Sarah Mitchell',
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    intake: 'Winter 2025',
    country: 'India'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543211',
    status: 'ACTIVE',
    profileCompletion: 95,
    apsStatus: 'Pending',
    documentsStatus: 'Approved',
    assignedCounsellor: 'John Anderson',
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
    intake: 'Summer 2026',
    country: 'India'
  },
  {
    id: '3',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 9876543212',
    status: 'ACTIVE',
    profileCompletion: 60,
    apsStatus: 'Not Started',
    documentsStatus: 'Pending',
    assignedCounsellor: 'Dr. Sarah Mitchell',
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    intake: 'Winter 2025',
    country: 'India'
  }
]

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Ankit Patel',
    email: 'ankit.patel@example.com',
    phone: '+91 9876543213',
    source: 'Contact Form',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '+91 9876543214',
    source: 'Consultation Request',
    status: 'CONTACTED',
    assignedTo: 'Dr. Sarah Mitchell',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastContact: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 9876543215',
    source: 'Eligibility Checker',
    status: 'QUALIFIED',
    assignedTo: 'John Anderson',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
]

export const mockDocumentReviews: DocumentReview[] = [
  {
    id: '1',
    type: 'APS_FORM',
    studentId: '1',
    studentName: 'Ajay Kumar',
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: 'HIGH',
    status: 'PENDING'
  },
  {
    id: '2',
    type: 'SOP',
    studentId: '2',
    studentName: 'Priya Sharma',
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    priority: 'MEDIUM',
    status: 'IN_REVIEW',
    reviewedBy: 'Dr. Sarah Mitchell'
  },
  {
    id: '3',
    type: 'RESUME',
    studentId: '3',
    studentName: 'Rahul Verma',
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    priority: 'LOW',
    status: 'APPROVED',
    reviewedBy: 'John Anderson',
    reviewedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    comments: 'Excellent resume. Well structured and comprehensive.'
  }
]

export const mockApplications: Application[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ajay Kumar',
    universityName: 'Technical University of Munich',
    programName: 'MS in Computer Science',
    status: 'APPLIED',
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    assignedCounsellor: 'Dr. Sarah Mitchell'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Priya Sharma',
    universityName: 'University of Stuttgart',
    programName: 'MS in Data Science',
    status: 'UNDER_REVIEW',
    submittedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    assignedCounsellor: 'John Anderson'
  },
  {
    id: '3',
    studentId: '1',
    studentName: 'Ajay Kumar',
    universityName: 'RWTH Aachen',
    programName: 'MS in Artificial Intelligence',
    status: 'ACCEPTED',
    submittedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    decisionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    assignedCounsellor: 'Dr. Sarah Mitchell'
  }
]

export const mockServices: Service[] = [
  {
    id: '1',
    type: 'BLOCKED_ACCOUNT',
    studentId: '1',
    studentName: 'Ajay Kumar',
    status: 'IN_PROGRESS',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: 'HEALTH_INSURANCE',
    studentId: '2',
    studentName: 'Priya Sharma',
    status: 'COMPLETED',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    completionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'VISA_APPLICATION',
    studentId: '1',
    studentName: 'Ajay Kumar',
    status: 'NOT_STARTED'
  }
]

export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'DOCUMENT_SUBMITTED',
    studentName: 'Ajay Kumar',
    description: 'Submitted APS verification form',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '2',
    type: 'APPLICATION_UPDATED',
    studentName: 'Priya Sharma',
    description: 'Application status updated to Under Review',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'STUDENT_REGISTERED',
    studentName: 'Vikram Singh',
    description: 'New student registered',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '4',
    type: 'STATUS_CHANGED',
    studentName: 'Ajay Kumar',
    description: 'Document approved: Resume',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '5',
    type: 'CONSULTATION_SCHEDULED',
    studentName: 'Rahul Verma',
    description: 'Consultation scheduled for Dec 5, 2025',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
]

export const mockCounsellorPerformance: CounsellorPerformance[] = [
  {
    counsellorId: '1',
    counsellorName: 'Dr. Sarah Mitchell',
    studentsAssigned: 45,
    documentsReviewed: 156,
    averageReviewTime: 2.5,
    approvalRate: 94.2,
    studentSatisfaction: 4.8
  },
  {
    counsellorId: '2',
    counsellorName: 'John Anderson',
    studentsAssigned: 38,
    documentsReviewed: 128,
    averageReviewTime: 3.1,
    approvalRate: 91.5,
    studentSatisfaction: 4.6
  }
]

export const mockAnalyticsData: AnalyticsData[] = [
  {
    period: 'Jan 2025',
    totalStudents: 210,
    newStudents: 23,
    activeApplications: 45,
    documentsApproved: 67,
    apsVerified: 18,
    consultationsHeld: 34,
    conversionRate: 78.3
  },
  {
    period: 'Feb 2025',
    totalStudents: 225,
    newStudents: 28,
    activeApplications: 52,
    documentsApproved: 73,
    apsVerified: 22,
    consultationsHeld: 41,
    conversionRate: 81.2
  },
  {
    period: 'Mar 2025',
    totalStudents: 247,
    newStudents: 32,
    activeApplications: 58,
    documentsApproved: 89,
    apsVerified: 27,
    consultationsHeld: 48,
    conversionRate: 84.5
  }
]

export function formatActivityTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-purple-100 text-purple-800',
    QUALIFIED: 'bg-green-100 text-green-800',
    CONVERTED: 'bg-green-100 text-green-800',
    LOST: 'bg-red-100 text-red-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    IN_REVIEW: 'bg-blue-100 text-blue-800',
    APPLIED: 'bg-blue-100 text-blue-800',
    UNDER_REVIEW: 'bg-purple-100 text-purple-800',
    ACCEPTED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-green-100 text-green-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    NOT_STARTED: 'bg-gray-100 text-gray-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}
