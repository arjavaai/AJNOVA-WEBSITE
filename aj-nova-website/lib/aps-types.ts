export type APSStatus = 
  | 'NOT_STARTED'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'NEEDS_CORRECTION'
  | 'REJECTED'

export type DocumentVerificationStatus = 
  | 'PENDING'
  | 'REVIEWED'
  | 'VERIFIED'
  | 'NEEDS_CORRECTION'
  | 'REJECTED'

export interface PersonalDetails {
  fullName: string
  dateOfBirth: Date
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
  nationality: string
  passportNumber: string
  passportExpiryDate: Date
  email: string
  mobileNumber: string
  countryOfResidence: string
}

export interface SecondaryEducation {
  grade10SchoolName: string
  grade10Year: number
  grade10Marks: number
  grade10MarksType: 'PERCENTAGE' | 'CGPA'
  grade10Board?: string
  
  grade12SchoolName: string
  grade12Year: number
  grade12Marks: number
  grade12MarksType: 'PERCENTAGE' | 'CGPA'
  grade12Board?: string
}

export interface HigherEducation {
  degreeAwarded: string
  universityName: string
  countryOfEducation: string
  studyPeriodFrom: Date
  studyPeriodTo?: Date
  isCurrent: boolean
  finalGrade: number
  gradeType: 'PERCENTAGE' | 'CGPA'
  backlogs?: number
  mediumOfInstruction: 'ENGLISH' | 'GERMAN' | 'OTHER'
  degreeCertificate?: UploadedFile
  transcripts: UploadedFile[]
}

export interface LanguageTestScores {
  englishTest?: 'IELTS' | 'TOEFL' | 'NONE'
  englishScore?: number
  englishTestDate?: Date
  germanLevel: 'NONE' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  otherExams?: {
    type: 'GRE' | 'GMAT' | 'OTHER'
    score: number
    testDate?: Date
  }[]
}

export interface UniversityPreferences {
  preferredUniversity1?: string
  preferredUniversity2?: string
  preferredUniversity3?: string
  preferredIntake: string
  applicationChannel?: 'DIRECT' | 'UNIASSIST' | 'OTHER'
}

export interface OptionalInfo {
  apsApplicationNumber?: string
  existingAPSCertificate?: UploadedFile
}

export interface UploadedFile {
  id: string
  name: string
  url: string
  size: number
  uploadedAt: Date
  status: DocumentVerificationStatus
  comments?: string
}

export interface APSForm {
  id: string
  studentId: string
  status: APSStatus
  personalDetails: PersonalDetails
  secondaryEducation: SecondaryEducation
  higherEducation: HigherEducation
  languageTestScores: LanguageTestScores
  universityPreferences: UniversityPreferences
  optionalInfo: OptionalInfo
  declarationAccepted: boolean
  submittedAt?: Date
  reviewedAt?: Date
  verifiedAt?: Date
  counsellorComments?: string
  createdAt: Date
  updatedAt: Date
  completionPercentage: number
}

export interface APSFormSection {
  id: string
  title: string
  description?: string
  isComplete: boolean
  fields: string[]
}

export const APSSections: APSFormSection[] = [
  {
    id: 'personal',
    title: 'Personal & Identification Details',
    description: 'Your personal information and passport details',
    isComplete: false,
    fields: ['fullName', 'dateOfBirth', 'gender', 'nationality', 'passportNumber', 'passportExpiryDate', 'email', 'mobileNumber', 'countryOfResidence']
  },
  {
    id: 'secondary',
    title: 'Secondary & Higher Secondary Education',
    description: '10th and 12th grade details',
    isComplete: false,
    fields: ['grade10SchoolName', 'grade10Year', 'grade10Marks', 'grade12SchoolName', 'grade12Year', 'grade12Marks']
  },
  {
    id: 'higher',
    title: 'Higher Education',
    description: 'Bachelor/Master degree information',
    isComplete: false,
    fields: ['degreeAwarded', 'universityName', 'countryOfEducation', 'studyPeriodFrom', 'finalGrade', 'mediumOfInstruction']
  },
  {
    id: 'language',
    title: 'Language & Test Scores',
    description: 'English and German proficiency',
    isComplete: false,
    fields: ['germanLevel']
  },
  {
    id: 'preferences',
    title: 'University Preferences & Intake',
    description: 'Your preferred universities and intake',
    isComplete: false,
    fields: ['preferredIntake']
  },
  {
    id: 'optional',
    title: 'Optional Information',
    description: 'Existing APS details if applicable',
    isComplete: false,
    fields: []
  },
  {
    id: 'declaration',
    title: 'Declaration',
    description: 'Confirm your submission',
    isComplete: false,
    fields: ['declarationAccepted']
  }
]
