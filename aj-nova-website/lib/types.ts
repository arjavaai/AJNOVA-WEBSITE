export type DocumentType = 'SOP' | 'LOR' | 'RESUME' | 'COVER_LETTER'

export type DocumentStatus = 
  | 'NOT_STARTED'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'NEEDS_REVISION'
  | 'REJECTED'

export interface StudentProfile {
  id: string
  name: string
  email: string
  phone?: string
  education?: string
  workExperience?: string
  skills?: string[]
  languageScores?: string
  completionPercentage?: number
}

export interface Document {
  id: string
  studentId: string
  type: DocumentType
  title: string
  content: string
  status: DocumentStatus
  version: number
  createdAt: Date
  updatedAt: Date
  submittedAt?: Date
  reviewedAt?: Date
  counsellorComments?: string
}

export interface DocumentVersion {
  id: string
  documentId: string
  version: number
  content: string
  createdAt: Date
}

export interface DocumentGenerationRequest {
  documentType: DocumentType
  profileData: StudentProfile
  targetUniversity?: string
  targetProgram?: string
  additionalNotes?: string
}

export interface CounsellorReview {
  id: string
  documentId: string
  counsellorId: string
  status: DocumentStatus
  comments: string
  reviewedAt: Date
}
