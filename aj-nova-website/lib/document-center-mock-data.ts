import { 
  UploadedDocument, 
  DocumentStats,
  DocumentCategory,
  VerificationStatus,
  UsageStatus,
  FileType
} from './document-center-types'

export const mockUploadedDocuments: UploadedDocument[] = [
  {
    id: '1',
    studentId: '1',
    name: 'Passport Copy.pdf',
    category: 'PERSONAL',
    fileType: 'PDF',
    fileSize: 2457600, // 2.4 MB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    verifiedBy: 'Dr. Sarah Mitchell',
    url: '/documents/passport.pdf',
    version: 1,
    description: 'Valid passport copy',
    linkedApplications: ['TUM-Winter2026'],
    tags: ['passport', 'identity']
  },
  {
    id: '2',
    studentId: '1',
    name: 'Bachelor Degree Certificate.pdf',
    category: 'ACADEMIC',
    fileType: 'PDF',
    fileSize: 3145728, // 3 MB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
    verifiedBy: 'Dr. Sarah Mitchell',
    url: '/documents/degree.pdf',
    version: 1,
    description: 'B.Tech Degree Certificate',
    linkedApplications: ['TUM-Winter2026', 'RWTH-Winter2026'],
    tags: ['degree', 'academic']
  },
  {
    id: '3',
    studentId: '1',
    name: 'Academic Transcripts.pdf',
    category: 'ACADEMIC',
    fileType: 'PDF',
    fileSize: 5242880, // 5 MB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
    verifiedBy: 'Dr. Sarah Mitchell',
    url: '/documents/transcripts.pdf',
    version: 1,
    description: 'Complete academic transcripts',
    linkedApplications: ['TUM-Winter2026', 'RWTH-Winter2026'],
    tags: ['transcripts', 'grades']
  },
  {
    id: '4',
    studentId: '1',
    name: 'IELTS Certificate.pdf',
    category: 'LANGUAGE',
    fileType: 'PDF',
    fileSize: 1048576, // 1 MB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    verifiedBy: 'Maria Schmidt',
    url: '/documents/ielts.pdf',
    version: 1,
    description: 'IELTS Score: 7.5',
    linkedApplications: ['TUM-Winter2026'],
    tags: ['language', 'english', 'ielts']
  },
  {
    id: '5',
    studentId: '1',
    name: 'Statement of Purpose - TUM.pdf',
    category: 'AI_GENERATED',
    fileType: 'PDF',
    fileSize: 524288, // 512 KB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'PENDING',
    usageStatus: 'NOT_USED',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    url: '/documents/sop-tum.pdf',
    version: 2,
    description: 'AI-generated SOP for TUM application',
    tags: ['sop', 'ai-generated', 'tum']
  },
  {
    id: '6',
    studentId: '1',
    name: 'Resume_AjayKumar.pdf',
    category: 'AI_GENERATED',
    fileType: 'PDF',
    fileSize: 409600, // 400 KB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    verifiedBy: 'John Anderson',
    url: '/documents/resume.pdf',
    version: 3,
    description: 'Professional academic CV',
    linkedApplications: ['TUM-Winter2026', 'RWTH-Winter2026'],
    tags: ['resume', 'cv', 'ai-generated']
  },
  {
    id: '7',
    studentId: '1',
    name: 'Work Experience Letter.pdf',
    category: 'OTHER',
    fileType: 'PDF',
    fileSize: 716800, // 700 KB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'NEEDS_CORRECTION',
    usageStatus: 'NOT_USED',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    url: '/documents/work-letter.pdf',
    version: 1,
    description: 'Experience letter from XYZ Company',
    counsellorComments: 'Please update with proper company letterhead',
    tags: ['work', 'experience']
  },
  {
    id: '8',
    studentId: '1',
    name: 'Passport Photo.jpg',
    category: 'PERSONAL',
    fileType: 'JPG',
    fileSize: 204800, // 200 KB
    uploadStatus: 'UPLOADED',
    verificationStatus: 'VERIFIED',
    usageStatus: 'IN_USE',
    uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
    verifiedBy: 'Dr. Sarah Mitchell',
    url: '/documents/photo.jpg',
    thumbnailUrl: '/documents/photo-thumb.jpg',
    version: 1,
    description: 'Passport-size photo',
    linkedApplications: ['TUM-Winter2026'],
    tags: ['photo', 'passport']
  }
]

export function getDocumentStats(documents: UploadedDocument[]): DocumentStats {
  const totalStorageUsed = documents.reduce((sum, doc) => sum + doc.fileSize, 0)
  
  return {
    totalDocuments: documents.length,
    personalDocuments: documents.filter(d => d.category === 'PERSONAL').length,
    academicDocuments: documents.filter(d => d.category === 'ACADEMIC').length,
    languageCertificates: documents.filter(d => d.category === 'LANGUAGE').length,
    aiGenerated: documents.filter(d => d.category === 'AI_GENERATED').length,
    applicationDocuments: documents.filter(d => d.category === 'APPLICATION').length,
    verifiedDocuments: documents.filter(d => d.verificationStatus === 'VERIFIED').length,
    pendingDocuments: documents.filter(d => d.verificationStatus === 'PENDING').length,
    totalStorageUsed,
    storageLimit: 100 * 1024 * 1024 // 100 MB
  }
}

export function filterDocuments(
  documents: UploadedDocument[],
  category?: DocumentCategory,
  searchQuery?: string
): UploadedDocument[] {
  let filtered = documents

  if (category) {
    filtered = filtered.filter(d => d.category === category)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(query) ||
      d.description?.toLowerCase().includes(query) ||
      d.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getStoragePercentage(used: number, limit: number): number {
  return Math.round((used / limit) * 100)
}

export function getDocumentsByCategory(
  documents: UploadedDocument[], 
  category: DocumentCategory
): UploadedDocument[] {
  return documents.filter(d => d.category === category)
}

export function getVerifiedDocuments(documents: UploadedDocument[]): UploadedDocument[] {
  return documents.filter(d => d.verificationStatus === 'VERIFIED')
}

export function getPendingDocuments(documents: UploadedDocument[]): UploadedDocument[] {
  return documents.filter(d => d.verificationStatus === 'PENDING')
}

export function sortDocuments(
  documents: UploadedDocument[],
  sortBy: 'date' | 'name' | 'size' = 'date',
  order: 'asc' | 'desc' = 'desc'
): UploadedDocument[] {
  const sorted = [...documents]

  switch (sortBy) {
    case 'date':
      sorted.sort((a, b) => {
        const diff = a.uploadedAt.getTime() - b.uploadedAt.getTime()
        return order === 'asc' ? diff : -diff
      })
      break
    case 'name':
      sorted.sort((a, b) => {
        const comp = a.name.localeCompare(b.name)
        return order === 'asc' ? comp : -comp
      })
      break
    case 'size':
      sorted.sort((a, b) => {
        const diff = a.fileSize - b.fileSize
        return order === 'asc' ? diff : -diff
      })
      break
  }

  return sorted
}

// In-memory store
let documentsStore: UploadedDocument[] = [...mockUploadedDocuments]

export function getDocuments(studentId: string): UploadedDocument[] {
  return documentsStore.filter(d => d.studentId === studentId)
}

export function getDocumentById(id: string): UploadedDocument | null {
  return documentsStore.find(d => d.id === id) || null
}

export function uploadDocument(document: Omit<UploadedDocument, 'id'>): UploadedDocument {
  const newDoc: UploadedDocument = {
    ...document,
    id: Math.random().toString(36).substr(2, 9)
  }
  documentsStore.push(newDoc)
  return newDoc
}

export function deleteDocument(id: string): boolean {
  const index = documentsStore.findIndex(d => d.id === id)
  if (index !== -1) {
    documentsStore.splice(index, 1)
    return true
  }
  return false
}

export function updateDocument(id: string, updates: Partial<UploadedDocument>): UploadedDocument | null {
  const doc = documentsStore.find(d => d.id === id)
  if (doc) {
    Object.assign(doc, updates)
    return doc
  }
  return null
}
