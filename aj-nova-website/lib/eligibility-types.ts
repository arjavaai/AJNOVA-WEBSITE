export type QualificationLevel = 
  | 'HIGH_SCHOOL'
  | 'DIPLOMA'
  | 'BACHELORS'
  | 'MASTERS'
  | 'PHD'

export type FieldOfStudy = 
  | 'ENGINEERING'
  | 'BUSINESS'
  | 'IT'
  | 'HEALTH_SCIENCES'
  | 'ARTS'
  | 'OTHER'

export type ScoreType = 'CGPA' | 'PERCENTAGE'

export type EnglishTest = 'IELTS' | 'TOEFL' | 'NONE' | 'PENDING'

export type GermanLevel = 'NONE' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type WorkExperience = 'NONE' | 'LESS_THAN_1' | 'ONE_TO_THREE' | 'THREE_PLUS'

export type EligibilityLevel = 
  | 'PUBLIC_ELIGIBLE'
  | 'PRIVATE_ELIGIBLE'
  | 'NEEDS_IMPROVEMENT'

export interface EligibilityFormData {
  qualificationLevel: QualificationLevel
  fieldOfStudy: FieldOfStudy
  otherFieldOfStudy?: string
  scoreType: ScoreType
  score: number
  englishTest: EnglishTest
  englishScore?: number
  germanLevel: GermanLevel
  workExperience: WorkExperience
  preferredIntake?: string
  countryOfEducation?: string
}

export interface ScoreBreakdown {
  academicScore: number
  academicMax: number
  englishScore: number
  englishMax: number
  germanScore: number
  germanMax: number
  workExperienceScore: number
  workExperienceMax: number
  totalScore: number
  totalMax: number
}

export interface EligibilityResult {
  level: EligibilityLevel
  readinessScore: number
  breakdown: ScoreBreakdown
  badge: {
    label: string
    color: string
  }
  message: string
  recommendations: string[]
  nextSteps: string[]
}

export interface EligibilityHistory {
  id: string
  studentId: string
  formData: EligibilityFormData
  result: EligibilityResult
  createdAt: Date
}

// Scoring weights (must total 100)
export const SCORING_WEIGHTS = {
  ACADEMIC: 40,
  ENGLISH: 20,
  GERMAN: 25,
  WORK_EXPERIENCE: 15
} as const

// Score thresholds
export const SCORE_THRESHOLDS = {
  PUBLIC_ELIGIBLE: 70,
  PRIVATE_ELIGIBLE: 50
} as const
