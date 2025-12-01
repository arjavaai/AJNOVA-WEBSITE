import { Application, University, Program, ApplicationStatus, TimelineEvent } from './application-types'

// Mock Universities
export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    logo: '/universities/tum.png',
    website: 'https://www.tum.de'
  },
  {
    id: '2',
    name: 'RWTH Aachen University',
    country: 'Germany',
    city: 'Aachen',
    logo: '/universities/rwth.png',
    website: 'https://www.rwth-aachen.de'
  },
  {
    id: '3',
    name: 'University of Stuttgart',
    country: 'Germany',
    city: 'Stuttgart',
    logo: '/universities/stuttgart.png',
    website: 'https://www.uni-stuttgart.de'
  },
  {
    id: '4',
    name: 'Karlsruhe Institute of Technology',
    country: 'Germany',
    city: 'Karlsruhe',
    logo: '/universities/kit.png',
    website: 'https://www.kit.edu'
  }
]

// Mock Programs
export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Computer Science',
    degree: 'Master of Science',
    duration: '2 years',
    language: 'English'
  },
  {
    id: '2',
    name: 'Data Science',
    degree: 'Master of Science',
    duration: '2 years',
    language: 'English'
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    degree: 'Master of Science',
    duration: '2 years',
    language: 'English'
  },
  {
    id: '4',
    name: 'Electrical Engineering',
    degree: 'Master of Science',
    duration: '2 years',
    language: 'English'
  }
]

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    studentId: '1',
    universityId: '1',
    university: mockUniversities[0],
    programId: '1',
    program: mockPrograms[0],
    status: 'UNDER_REVIEW',
    applicationDate: new Date('2024-10-15'),
    referenceNumber: 'TUM-2024-001234',
    intake: 'SUMMER_2025',
    applicationChannel: 'DIRECT',
    counsellorId: 'c1',
    counsellorName: 'Dr. Sarah Schmidt',
    documents: [
      { id: 'd1', name: 'Passport', status: 'SENT', uploadedAt: new Date('2024-10-16'), verifiedAt: new Date('2024-10-17'), sentAt: new Date('2024-10-18') },
      { id: 'd2', name: 'Transcripts', status: 'SENT', uploadedAt: new Date('2024-10-16'), verifiedAt: new Date('2024-10-17'), sentAt: new Date('2024-10-18') },
      { id: 'd3', name: 'SOP', status: 'VERIFIED', uploadedAt: new Date('2024-10-20'), verifiedAt: new Date('2024-10-21') },
      { id: 'd4', name: 'LOR', status: 'UPLOADED', uploadedAt: new Date('2024-10-22') },
      { id: 'd5', name: 'CV', status: 'REQUIRED' }
    ],
    timeline: [
      { id: 't1', status: 'APPLIED', date: new Date('2024-10-15'), description: 'Application submitted to TUM', performedBy: 'System' },
      { id: 't2', status: 'DOCUMENTS_SENT', date: new Date('2024-10-18'), description: 'Initial documents sent to university', performedBy: 'Dr. Sarah Schmidt' },
      { id: 't3', status: 'UNDER_REVIEW', date: new Date('2024-10-25'), description: 'University started reviewing your application', performedBy: 'University' }
    ],
    notes: 'Strong profile with relevant work experience',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-25')
  },
  {
    id: '2',
    studentId: '1',
    universityId: '2',
    university: mockUniversities[1],
    programId: '2',
    program: mockPrograms[1],
    status: 'ACCEPTED',
    applicationDate: new Date('2024-09-20'),
    referenceNumber: 'RWTH-2024-005678',
    intake: 'SUMMER_2025',
    applicationChannel: 'UNIASSIST',
    counsellorId: 'c1',
    counsellorName: 'Dr. Sarah Schmidt',
    documents: [
      { id: 'd6', name: 'Passport', status: 'ACCEPTED', uploadedAt: new Date('2024-09-21'), verifiedAt: new Date('2024-09-22'), sentAt: new Date('2024-09-23') },
      { id: 'd7', name: 'Transcripts', status: 'ACCEPTED', uploadedAt: new Date('2024-09-21'), verifiedAt: new Date('2024-09-22'), sentAt: new Date('2024-09-23') },
      { id: 'd8', name: 'SOP', status: 'ACCEPTED', uploadedAt: new Date('2024-09-21'), verifiedAt: new Date('2024-09-22'), sentAt: new Date('2024-09-23') },
      { id: 'd9', name: 'LOR', status: 'ACCEPTED', uploadedAt: new Date('2024-09-21'), verifiedAt: new Date('2024-09-22'), sentAt: new Date('2024-09-23') }
    ],
    timeline: [
      { id: 't4', status: 'APPLIED', date: new Date('2024-09-20'), description: 'Application submitted to RWTH Aachen', performedBy: 'System' },
      { id: 't5', status: 'DOCUMENTS_SENT', date: new Date('2024-09-23'), description: 'All documents sent to university', performedBy: 'Dr. Sarah Schmidt' },
      { id: 't6', status: 'UNDER_REVIEW', date: new Date('2024-09-30'), description: 'Application under review', performedBy: 'University' },
      { id: 't7', status: 'WAITING_FOR_DECISION', date: new Date('2024-10-15'), description: 'Review complete, awaiting decision', performedBy: 'University' },
      { id: 't8', status: 'ACCEPTED', date: new Date('2024-11-01'), description: 'Congratulations! Offer received', performedBy: 'University' }
    ],
    decisionDate: new Date('2024-11-01'),
    offerDetails: 'Conditional offer. English language certificate required by March 2025.',
    notes: 'Excellent match for the program',
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: '3',
    studentId: '1',
    universityId: '3',
    university: mockUniversities[2],
    programId: '1',
    program: mockPrograms[0],
    status: 'DOCUMENTS_SENT',
    applicationDate: new Date('2024-11-01'),
    referenceNumber: 'STUT-2024-003456',
    intake: 'WINTER_2025',
    applicationChannel: 'DIRECT',
    counsellorId: 'c1',
    counsellorName: 'Dr. Sarah Schmidt',
    documents: [
      { id: 'd10', name: 'Passport', status: 'SENT', uploadedAt: new Date('2024-11-02'), verifiedAt: new Date('2024-11-03'), sentAt: new Date('2024-11-04') },
      { id: 'd11', name: 'Transcripts', status: 'SENT', uploadedAt: new Date('2024-11-02'), verifiedAt: new Date('2024-11-03'), sentAt: new Date('2024-11-04') },
      { id: 'd12', name: 'SOP', status: 'VERIFIED', uploadedAt: new Date('2024-11-05'), verifiedAt: new Date('2024-11-06') },
      { id: 'd13', name: 'LOR', status: 'REQUIRED' }
    ],
    timeline: [
      { id: 't9', status: 'APPLIED', date: new Date('2024-11-01'), description: 'Application submitted', performedBy: 'System' },
      { id: 't10', status: 'DOCUMENTS_SENT', date: new Date('2024-11-04'), description: 'Initial documents sent', performedBy: 'Dr. Sarah Schmidt' }
    ],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-06')
  },
  {
    id: '4',
    studentId: '1',
    universityId: '4',
    university: mockUniversities[3],
    programId: '3',
    program: mockPrograms[2],
    status: 'REJECTED',
    applicationDate: new Date('2024-08-15'),
    referenceNumber: 'KIT-2024-007890',
    intake: 'WINTER_2025',
    applicationChannel: 'UNIASSIST',
    counsellorId: 'c1',
    counsellorName: 'Dr. Sarah Schmidt',
    documents: [
      { id: 'd14', name: 'Passport', status: 'SENT', uploadedAt: new Date('2024-08-16'), verifiedAt: new Date('2024-08-17'), sentAt: new Date('2024-08-18') },
      { id: 'd15', name: 'Transcripts', status: 'SENT', uploadedAt: new Date('2024-08-16'), verifiedAt: new Date('2024-08-17'), sentAt: new Date('2024-08-18') }
    ],
    timeline: [
      { id: 't11', status: 'APPLIED', date: new Date('2024-08-15'), description: 'Application submitted', performedBy: 'System' },
      { id: 't12', status: 'DOCUMENTS_SENT', date: new Date('2024-08-18'), description: 'Documents sent', performedBy: 'Dr. Sarah Schmidt' },
      { id: 't13', status: 'UNDER_REVIEW', date: new Date('2024-08-25'), description: 'Under review', performedBy: 'University' },
      { id: 't14', status: 'REJECTED', date: new Date('2024-09-10'), description: 'Application not successful', performedBy: 'University' }
    ],
    decisionDate: new Date('2024-09-10'),
    rejectionReason: 'Grade requirements not met. Minimum GPA of 3.0 required.',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-09-10')
  }
]

// In-memory store
export let applicationsStore = [...mockApplications]

export function getApplicationsByStudentId(studentId: string): Application[] {
  return applicationsStore.filter(app => app.studentId === studentId)
}

export function getApplicationById(id: string): Application | undefined {
  return applicationsStore.find(app => app.id === id)
}

export function updateApplication(id: string, updates: Partial<Application>): Application {
  const index = applicationsStore.findIndex(app => app.id === id)
  if (index === -1) {
    throw new Error('Application not found')
  }
  
  applicationsStore[index] = {
    ...applicationsStore[index],
    ...updates,
    updatedAt: new Date()
  }
  
  return applicationsStore[index]
}

export function createApplication(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Application {
  const newApplication: Application = {
    ...application,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  applicationsStore.push(newApplication)
  return newApplication
}

export function getApplicationStats(studentId: string): any {
  const apps = getApplicationsByStudentId(studentId)
  const total = apps.length
  const accepted = apps.filter(a => a.status === 'ACCEPTED').length
  const rejected = apps.filter(a => a.status === 'REJECTED').length
  const inProgress = apps.filter(a => 
    ['APPLIED', 'DOCUMENTS_SENT', 'UNDER_REVIEW', 'WAITING_FOR_DECISION'].includes(a.status)
  ).length
  
  return {
    total,
    accepted,
    rejected,
    inProgress,
    withdrawn: apps.filter(a => a.status === 'WITHDRAWN').length,
    acceptanceRate: total > 0 ? Math.round((accepted / (accepted + rejected)) * 100) : 0
  }
}
