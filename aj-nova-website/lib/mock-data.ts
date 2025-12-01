import { Document, StudentProfile, DocumentStatus } from './types'

// Mock student profile for testing
export const mockStudentProfile: StudentProfile = {
  id: '1',
  name: 'Ajay Kumar',
  email: 'ajay.kumar@example.com',
  phone: '+91 98765 43210',
  education: `Bachelor of Technology in Computer Science, ABC University (2019-2023)
CGPA: 8.5/10
Relevant Coursework: Data Structures, Algorithms, Machine Learning, Web Development`,
  workExperience: `Software Engineer, Tech Solutions Pvt Ltd (2023-Present)
- Developed and maintained web applications using React and Node.js
- Collaborated with cross-functional teams to deliver high-quality products
- Implemented RESTful APIs and optimized database queries`,
  skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 'SQL'],
  languageScores: 'IELTS: 7.5 (Overall), GRE: 320 (Verbal: 160, Quantitative: 160)',
  completionPercentage: 85
}

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: '1',
    studentId: '1',
    type: 'SOP',
    title: 'Statement of Purpose',
    content: '',
    status: 'NOT_STARTED',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentId: '1',
    type: 'LOR',
    title: 'Letter of Recommendation',
    content: '',
    status: 'NOT_STARTED',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    studentId: '1',
    type: 'RESUME',
    title: 'Resume/CV',
    content: '',
    status: 'NOT_STARTED',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    studentId: '1',
    type: 'COVER_LETTER',
    title: 'Cover Letter',
    content: '',
    status: 'NOT_STARTED',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// In-memory storage for documents (replace with database in production)
export let documentsStore = [...mockDocuments]

export function getDocumentsByStudentId(studentId: string): Document[] {
  return documentsStore.filter(doc => doc.studentId === studentId)
}

export function getDocumentById(id: string): Document | undefined {
  return documentsStore.find(doc => doc.id === id)
}

export function updateDocument(id: string, updates: Partial<Document>): Document {
  const index = documentsStore.findIndex(doc => doc.id === id)
  if (index === -1) {
    throw new Error('Document not found')
  }
  
  documentsStore[index] = {
    ...documentsStore[index],
    ...updates,
    updatedAt: new Date()
  }
  
  return documentsStore[index]
}

export function createDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Document {
  const newDocument: Document = {
    ...document,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  documentsStore.push(newDocument)
  return newDocument
}
