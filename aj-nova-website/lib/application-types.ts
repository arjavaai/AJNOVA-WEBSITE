export type ApplicationStatus = 
  | 'APPLIED'
  | 'DOCUMENTS_SENT'
  | 'UNDER_REVIEW'
  | 'WAITING_FOR_DECISION'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'

export type DocumentStatus = 
  | 'REQUIRED'
  | 'UPLOADED'
  | 'VERIFIED'
  | 'SENT'
  | 'ACCEPTED'

export type IntakeTerm = 'WINTER_2025' | 'SUMMER_2025' | 'WINTER_2026' | 'SUMMER_2026'

export interface University {
  id: string
  name: string
  logo?: string
  country: string
  city: string
  website?: string
}

export interface Program {
  id: string
  name: string
  degree: string // Bachelor, Master, PhD
  duration: string
  language: string
  tuitionFee?: string
}

export interface ApplicationDocument {
  id: string
  name: string
  status: DocumentStatus
  uploadedAt?: Date
  verifiedAt?: Date
  sentAt?: Date
  documentId?: string // Link to actual document
}

export interface TimelineEvent {
  id: string
  status: ApplicationStatus
  date: Date
  description: string
  performedBy?: string
}

export interface Application {
  id: string
  studentId: string
  universityId: string
  university: University
  programId: string
  program: Program
  status: ApplicationStatus
  applicationDate: Date
  referenceNumber: string
  intake: IntakeTerm
  applicationChannel: 'DIRECT' | 'UNIASSIST' | 'OTHER'
  counsellorId?: string
  counsellorName?: string
  documents: ApplicationDocument[]
  timeline: TimelineEvent[]
  decisionDate?: Date
  offerDetails?: string
  rejectionReason?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApplicationStats {
  total: number
  applied: number
  inProgress: number
  accepted: number
  rejected: number
  withdrawn: number
  acceptanceRate: number
}

export interface ApplicationFilters {
  status?: ApplicationStatus
  intake?: IntakeTerm
  universityId?: string
  search?: string
}

export interface ApplicationSort {
  field: 'date' | 'status' | 'university' | 'program'
  order: 'asc' | 'desc'
}
