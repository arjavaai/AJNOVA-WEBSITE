import { APSForm, APSStatus } from './aps-types'

// Mock APS Form
export const mockAPSForm: APSForm = {
  id: '1',
  studentId: '1',
  status: 'NOT_STARTED',
  personalDetails: {
    fullName: 'Ajay Kumar',
    dateOfBirth: new Date('1998-05-15'),
    gender: 'MALE',
    nationality: 'Indian',
    passportNumber: 'P1234567',
    passportExpiryDate: new Date('2028-12-31'),
    email: 'ajay.kumar@example.com',
    mobileNumber: '+91 98765 43210',
    countryOfResidence: 'India'
  },
  secondaryEducation: {
    grade10SchoolName: 'ABC Public School',
    grade10Year: 2014,
    grade10Marks: 92,
    grade10MarksType: 'PERCENTAGE',
    grade10Board: 'CBSE',
    grade12SchoolName: 'ABC Public School',
    grade12Year: 2016,
    grade12Marks: 88,
    grade12MarksType: 'PERCENTAGE',
    grade12Board: 'CBSE'
  },
  higherEducation: {
    degreeAwarded: 'Bachelor of Technology',
    universityName: 'ABC University',
    countryOfEducation: 'India',
    studyPeriodFrom: new Date('2016-08-01'),
    studyPeriodTo: new Date('2020-06-30'),
    isCurrent: false,
    finalGrade: 8.5,
    gradeType: 'CGPA',
    backlogs: 0,
    mediumOfInstruction: 'ENGLISH',
    transcripts: []
  },
  languageTestScores: {
    englishTest: 'IELTS',
    englishScore: 7.5,
    englishTestDate: new Date('2023-06-15'),
    germanLevel: 'A2'
  },
  universityPreferences: {
    preferredUniversity1: 'Technical University of Munich',
    preferredUniversity2: 'RWTH Aachen University',
    preferredIntake: 'WINTER_2025',
    applicationChannel: 'UNIASSIST'
  },
  optionalInfo: {},
  declarationAccepted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  completionPercentage: 0
}

// In-memory store
export let apsFormStore: APSForm = { ...mockAPSForm }

export function getAPSForm(studentId: string): APSForm | null {
  if (apsFormStore.studentId === studentId) {
    return apsFormStore
  }
  return null
}

export function updateAPSForm(studentId: string, updates: Partial<APSForm>): APSForm {
  if (apsFormStore.studentId !== studentId) {
    throw new Error('APS form not found')
  }
  
  apsFormStore = {
    ...apsFormStore,
    ...updates,
    updatedAt: new Date()
  }
  
  return apsFormStore
}

export function calculateCompletionPercentage(form: APSForm): number {
  let completed = 0
  let total = 0
  
  // Personal details (9 fields)
  const personalFields = [
    form.personalDetails.fullName,
    form.personalDetails.dateOfBirth,
    form.personalDetails.gender,
    form.personalDetails.nationality,
    form.personalDetails.passportNumber,
    form.personalDetails.passportExpiryDate,
    form.personalDetails.email,
    form.personalDetails.mobileNumber,
    form.personalDetails.countryOfResidence
  ]
  total += personalFields.length
  completed += personalFields.filter(f => f && f !== '').length
  
  // Secondary education (6 required fields)
  const secondaryFields = [
    form.secondaryEducation.grade10SchoolName,
    form.secondaryEducation.grade10Year,
    form.secondaryEducation.grade10Marks,
    form.secondaryEducation.grade12SchoolName,
    form.secondaryEducation.grade12Year,
    form.secondaryEducation.grade12Marks
  ]
  total += secondaryFields.length
  completed += secondaryFields.filter(f => f && f !== '').length
  
  // Higher education (7 required fields)
  const higherFields = [
    form.higherEducation.degreeAwarded,
    form.higherEducation.universityName,
    form.higherEducation.countryOfEducation,
    form.higherEducation.studyPeriodFrom,
    form.higherEducation.finalGrade,
    form.higherEducation.mediumOfInstruction
  ]
  total += higherFields.length
  completed += higherFields.filter(f => f && f !== '' && f !== undefined).length
  
  // Language scores (1 required field)
  total += 1
  if (form.languageTestScores.germanLevel) completed += 1
  
  // University preferences (1 required field)
  total += 1
  if (form.universityPreferences.preferredIntake) completed += 1
  
  // Declaration
  total += 1
  if (form.declarationAccepted) completed += 1
  
  return Math.round((completed / total) * 100)
}
