export type DocumentCategory = 
  | 'PERSONAL'
  | 'ACADEMIC'
  | 'LANGUAGE'
  | 'AI_GENERATED'
  | 'APPLICATION'
  | 'OTHER'

export type UploadStatus = 
  | 'UPLOADING'
  | 'UPLOADED'
  | 'FAILED'

export type VerificationStatus = 
  | 'PENDING'
  | 'VERIFIED'
  | 'NEEDS_CORRECTION'
  | 'REJECTED'

export type UsageStatus = 
  | 'NOT_USED'
  | 'IN_USE'
  | 'SUBMITTED'
  | 'ACCEPTED'

export type FileType = 
  | 'PDF'
  | 'JPG'
  | 'JPEG'
  | 'PNG'
  | 'DOC'
  | 'DOCX'

export interface UploadedDocument {
  id: string
  studentId: string
  name: string
  category: DocumentCategory
  fileType: FileType
  fileSize: number // in bytes
  uploadStatus: UploadStatus
  verificationStatus: VerificationStatus
  usageStatus: UsageStatus
  uploadedAt: Date
  verifiedAt?: Date
  verifiedBy?: string
  url: string
  thumbnailUrl?: string
  version: number
  description?: string
  tags?: string[]
  linkedApplications?: string[]
  counsellorComments?: string
  metadata?: Record<string, any>
}

export interface DocumentVersion {
  id: string
  documentId: string
  version: number
  name: string
  fileSize: number
  uploadedAt: Date
  url: string
  notes?: string
}

export interface DocumentFilter {
  category?: DocumentCategory
  verificationStatus?: VerificationStatus
  usageStatus?: UsageStatus
  fileType?: FileType
  dateRange?: {
    from: Date
    to: Date
  }
  searchQuery?: string
}

export interface DocumentStats {
  totalDocuments: number
  personalDocuments: number
  academicDocuments: number
  languageCertificates: number
  aiGenerated: number
  applicationDocuments: number
  verifiedDocuments: number
  pendingDocuments: number
  totalStorageUsed: number // in bytes
  storageLimit: number // in bytes
}

export const DOCUMENT_CATEGORIES = {
  PERSONAL: {
    label: 'Personal Documents',
    description: 'Passport, ID, photos',
    icon: 'User'
  },
  ACADEMIC: {
    label: 'Academic Documents',
    description: 'Degrees, transcripts, mark sheets',
    icon: 'GraduationCap'
  },
  LANGUAGE: {
    label: 'Language Certificates',
    description: 'IELTS, TOEFL, German certificates',
    icon: 'Languages'
  },
  AI_GENERATED: {
    label: 'AI Generated',
    description: 'SOP, LOR, Resume, Cover Letter',
    icon: 'Sparkles'
  },
  APPLICATION: {
    label: 'Application Documents',
    description: 'University-specific requirements',
    icon: 'FileText'
  },
  OTHER: {
    label: 'Other Documents',
    description: 'Supporting documents',
    icon: 'Folder'
  }
} as const

export const FILE_TYPE_ICONS: Record<FileType, string> = {
  PDF: '📄',
  JPG: '🖼️',
  JPEG: '🖼️',
  PNG: '🖼️',
  DOC: '📝',
  DOCX: '📝'
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

export const ACCEPTED_FILE_TYPES = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.doc',
  '.docx'
]
