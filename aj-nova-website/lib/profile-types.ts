export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
export type QualificationLevel = 'HIGH_SCHOOL' | 'DIPLOMA' | 'BACHELORS' | 'MASTERS' | 'PHD'
export type ScoreType = 'CGPA' | 'PERCENTAGE'
export type EnglishTest = 'IELTS' | 'TOEFL' | 'NONE' | 'PENDING'
export type GermanLevel = 'NONE' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type WorkExperienceLevel = 'NONE' | 'LESS_THAN_1' | 'ONE_TO_THREE' | 'THREE_PLUS'
export type StudyLevel = 'BACHELORS' | 'MASTERS' | 'PHD'
export type Intake = 'WINTER_2025' | 'SUMMER_2026' | 'WINTER_2026' | 'SUMMER_2027'

export interface PersonalInformation {
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: Date | null
  gender: Gender | null
  nationality: string
  countryOfResidence: string
  passportNumber: string
  passportExpiry: Date | null
}

export interface Education {
  id: string
  level: QualificationLevel | null
  fieldOfStudy: string
  institution: string
  country: string
  graduationYear: number | null
  scoreType: ScoreType
  score: number | null
  backlogs?: number
  mediumOfInstruction: string
  isPrimary: boolean
}

export interface SecondaryEducation {
  grade10SchoolName: string
  grade10Year: number | null
  grade10Marks: number | null
  grade10Board?: string
  grade12SchoolName: string
  grade12Year: number | null
  grade12Marks: number | null
  grade12Board?: string
}

export interface LanguageTest {
  englishTest: EnglishTest | null
  englishScore?: number
  englishTestDate?: Date
  germanLevel: GermanLevel | null
  germanTestDate?: Date
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  description: string
}

export interface ContactPreferences {
  email: string
  mobileNumber: string
  alternatePhone?: string
  streetAddress?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  preferredIntake: Intake | null
  interestedCountry: string
  studyLevel: StudyLevel | null
  preferredProgram?: string
}

export interface UploadedDocument {
  id: string
  category: 'PASSPORT' | 'TRANSCRIPT' | 'DEGREE' | 'LANGUAGE' | 'OTHER'
  name: string
  url: string
  uploadedAt: Date
  size: number
  type: string
}

export interface StudentProfile {
  id: string
  userId: string
  personalInfo: PersonalInformation
  education: Education[]
  secondaryEducation: SecondaryEducation
  languageTests: LanguageTest
  workExperience: WorkExperience[]
  workExperienceLevel: WorkExperienceLevel | null
  contactPreferences: ContactPreferences
  documents: UploadedDocument[]
  completionPercentage: number
  lastUpdated: Date
  createdAt: Date
}

export interface ProfileSection {
  id: string
  title: string
  completionPercentage: number
  requiredFieldsFilled: number
  totalRequiredFields: number
}

export const COUNTRIES = [
  'Germany',
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  // Add more countries as needed
]

export const FIELDS_OF_STUDY = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Data Science',
  'Artificial Intelligence',
  'Biotechnology',
  'Civil Engineering',
  'Economics',
  'Medicine',
  // Add more fields as needed
]
