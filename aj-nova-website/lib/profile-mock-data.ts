import { StudentProfile, ProfileSection } from './profile-types'

export const mockProfile: StudentProfile = {
  id: '1',
  userId: '1',
  personalInfo: {
    firstName: 'Ajay',
    lastName: 'Kumar',
    middleName: '',
    dateOfBirth: new Date('1998-05-15'),
    gender: 'MALE',
    nationality: 'India',
    countryOfResidence: 'India',
    passportNumber: 'M1234567',
    passportExpiry: new Date('2028-12-31')
  },
  education: [
    {
      id: '1',
      level: 'BACHELORS',
      fieldOfStudy: 'Computer Science',
      institution: 'Delhi University',
      country: 'India',
      graduationYear: 2020,
      scoreType: 'CGPA',
      score: 7.8,
      backlogs: 0,
      mediumOfInstruction: 'English',
      isPrimary: true
    }
  ],
  secondaryEducation: {
    grade10SchoolName: 'Delhi Public School',
    grade10Year: 2014,
    grade10Marks: 85,
    grade10Board: 'CBSE',
    grade12SchoolName: 'Delhi Public School',
    grade12Year: 2016,
    grade12Marks: 82,
    grade12Board: 'CBSE'
  },
  languageTests: {
    englishTest: 'IELTS',
    englishScore: 7.0,
    englishTestDate: new Date('2023-06-15'),
    germanLevel: 'A2',
    germanTestDate: new Date('2023-09-20')
  },
  workExperience: [
    {
      id: '1',
      company: 'Tech Solutions Pvt Ltd',
      position: 'Software Developer',
      startDate: new Date('2020-07-01'),
      endDate: new Date('2023-05-31'),
      isCurrent: false,
      description: 'Developed web applications using React and Node.js'
    }
  ],
  workExperienceLevel: 'ONE_TO_THREE',
  contactPreferences: {
    email: 'ajay.kumar@example.com',
    mobileNumber: '+91 9876543210',
    alternatePhone: '',
    streetAddress: '123 MG Road',
    city: 'Delhi',
    state: 'Delhi',
    postalCode: '110001',
    country: 'India',
    preferredIntake: 'WINTER_2025',
    interestedCountry: 'Germany',
    studyLevel: 'MASTERS',
    preferredProgram: 'Data Science'
  },
  documents: [
    {
      id: '1',
      category: 'PASSPORT',
      name: 'passport.pdf',
      url: '/documents/passport.pdf',
      uploadedAt: new Date('2024-01-15'),
      size: 2048576,
      type: 'application/pdf'
    },
    {
      id: '2',
      category: 'TRANSCRIPT',
      name: 'transcripts.pdf',
      url: '/documents/transcripts.pdf',
      uploadedAt: new Date('2024-01-15'),
      size: 3145728,
      type: 'application/pdf'
    }
  ],
  completionPercentage: 85,
  lastUpdated: new Date(),
  createdAt: new Date('2024-01-10')
}

export function calculateProfileCompletion(profile: Partial<StudentProfile>): number {
  let filledFields = 0
  let totalFields = 0

  // Personal Info (7 required fields)
  const personalRequired = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality', 'countryOfResidence', 'passportNumber', 'passportExpiry']
  totalFields += personalRequired.length
  if (profile.personalInfo) {
    personalRequired.forEach(field => {
      if (profile.personalInfo?.[field as keyof typeof profile.personalInfo]) filledFields++
    })
  }

  // Education (7 required fields for primary)
  totalFields += 7
  const primaryEdu = profile.education?.find(e => e.isPrimary)
  if (primaryEdu) {
    if (primaryEdu.level) filledFields++
    if (primaryEdu.fieldOfStudy) filledFields++
    if (primaryEdu.institution) filledFields++
    if (primaryEdu.country) filledFields++
    if (primaryEdu.graduationYear) filledFields++
    if (primaryEdu.score !== null) filledFields++
    if (primaryEdu.mediumOfInstruction) filledFields++
  }

  // Secondary Education (6 required fields)
  totalFields += 6
  if (profile.secondaryEducation) {
    const sec = profile.secondaryEducation
    if (sec.grade10SchoolName) filledFields++
    if (sec.grade10Year) filledFields++
    if (sec.grade10Marks) filledFields++
    if (sec.grade12SchoolName) filledFields++
    if (sec.grade12Year) filledFields++
    if (sec.grade12Marks) filledFields++
  }

  // Language Tests (2 required fields)
  totalFields += 2
  if (profile.languageTests) {
    if (profile.languageTests.englishTest) filledFields++
    if (profile.languageTests.germanLevel) filledFields++
  }

  // Contact & Preferences (5 required fields)
  totalFields += 5
  if (profile.contactPreferences) {
    const contact = profile.contactPreferences
    if (contact.email) filledFields++
    if (contact.mobileNumber) filledFields++
    if (contact.preferredIntake) filledFields++
    if (contact.interestedCountry) filledFields++
    if (contact.studyLevel) filledFields++
  }

  // Documents (3 required categories)
  totalFields += 3
  const hasPassport = profile.documents?.some(d => d.category === 'PASSPORT')
  const hasTranscript = profile.documents?.some(d => d.category === 'TRANSCRIPT')
  const hasDegree = profile.documents?.some(d => d.category === 'DEGREE')
  if (hasPassport) filledFields++
  if (hasTranscript) filledFields++
  if (hasDegree) filledFields++

  return Math.round((filledFields / totalFields) * 100)
}

export function getProfileSections(profile: Partial<StudentProfile>): ProfileSection[] {
  // Personal Info
  const personalRequired = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality', 'countryOfResidence', 'passportNumber', 'passportExpiry']
  let personalFilled = 0
  if (profile.personalInfo) {
    personalRequired.forEach(field => {
      const value = profile.personalInfo?.[field as keyof typeof profile.personalInfo]
      if (value !== null && value !== undefined && value !== '') personalFilled++
    })
  }
  const personalPercent = Math.round((personalFilled / personalRequired.length) * 100)

  // Academic Background (primary education)
  let educationFilled = 0
  const educationTotal = 7
  const primaryEdu = profile.education?.find(e => e.isPrimary) || profile.education?.[0]
  if (primaryEdu) {
    if (primaryEdu.level) educationFilled++
    if (primaryEdu.fieldOfStudy) educationFilled++
    if (primaryEdu.institution) educationFilled++
    if (primaryEdu.country) educationFilled++
    if (primaryEdu.graduationYear) educationFilled++
    if (primaryEdu.score !== null && primaryEdu.score !== undefined) educationFilled++
    if (primaryEdu.mediumOfInstruction) educationFilled++
  }
  const educationPercent = Math.round((educationFilled / educationTotal) * 100)

  // Secondary Education
  let secondaryFilled = 0
  const secondaryTotal = 6
  if (profile.secondaryEducation) {
    const sec = profile.secondaryEducation
    if (sec.grade10SchoolName) secondaryFilled++
    if (sec.grade10Year) secondaryFilled++
    if (sec.grade10Marks) secondaryFilled++
    if (sec.grade12SchoolName) secondaryFilled++
    if (sec.grade12Year) secondaryFilled++
    if (sec.grade12Marks) secondaryFilled++
  }
  const secondaryPercent = Math.round((secondaryFilled / secondaryTotal) * 100)

  // Language Tests
  let languageFilled = 0
  const languageTotal = 2
  if (profile.languageTests) {
    if (profile.languageTests.englishTest) languageFilled++
    if (profile.languageTests.germanLevel && profile.languageTests.germanLevel !== 'NONE') languageFilled++
  }
  const languagePercent = Math.round((languageFilled / languageTotal) * 100)

  // Work Experience (optional)
  const workFilled = (profile.workExperience && profile.workExperience.length > 0) ? 1 : 0
  const workTotal = 1
  const workPercent = Math.round((workFilled / workTotal) * 100)

  // Contact & Preferences
  let contactFilled = 0
  const contactTotal = 5
  if (profile.contactPreferences) {
    const contact = profile.contactPreferences
    if (contact.email) contactFilled++
    if (contact.mobileNumber) contactFilled++
    if (contact.preferredIntake) contactFilled++
    if (contact.interestedCountry) contactFilled++
    if (contact.studyLevel) contactFilled++
  }
  const contactPercent = Math.round((contactFilled / contactTotal) * 100)

  // Documents
  let documentsFilled = 0
  const documentsTotal = 3
  const hasPassport = profile.documents?.some(d => d.category === 'PASSPORT')
  const hasTranscript = profile.documents?.some(d => d.category === 'TRANSCRIPT')
  const hasDegree = profile.documents?.some(d => d.category === 'DEGREE')
  if (hasPassport) documentsFilled++
  if (hasTranscript) documentsFilled++
  if (hasDegree) documentsFilled++
  const documentsPercent = Math.round((documentsFilled / documentsTotal) * 100)

  return [
    {
      id: 'personal',
      title: 'Personal Information',
      completionPercentage: personalPercent,
      requiredFieldsFilled: personalFilled,
      totalRequiredFields: personalRequired.length
    },
    {
      id: 'education',
      title: 'Academic Background',
      completionPercentage: educationPercent,
      requiredFieldsFilled: educationFilled,
      totalRequiredFields: educationTotal
    },
    {
      id: 'secondary',
      title: 'Secondary Education',
      completionPercentage: secondaryPercent,
      requiredFieldsFilled: secondaryFilled,
      totalRequiredFields: secondaryTotal
    },
    {
      id: 'language',
      title: 'Language & Test Scores',
      completionPercentage: languagePercent,
      requiredFieldsFilled: languageFilled,
      totalRequiredFields: languageTotal
    },
    {
      id: 'work',
      title: 'Work Experience',
      completionPercentage: workPercent,
      requiredFieldsFilled: workFilled,
      totalRequiredFields: workTotal
    },
    {
      id: 'contact',
      title: 'Contact & Preferences',
      completionPercentage: contactPercent,
      requiredFieldsFilled: contactFilled,
      totalRequiredFields: contactTotal
    },
    {
      id: 'documents',
      title: 'Document Uploads',
      completionPercentage: documentsPercent,
      requiredFieldsFilled: documentsFilled,
      totalRequiredFields: documentsTotal
    }
  ]
}

export function getEmptyProfile(): Partial<StudentProfile> {
  return {
    personalInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
      dateOfBirth: null,
      gender: null,
      nationality: '',
      countryOfResidence: '',
      passportNumber: '',
      passportExpiry: null
    },
    education: [{
      id: '1',
      level: null,
      fieldOfStudy: '',
      institution: '',
      country: '',
      graduationYear: null,
      scoreType: 'CGPA',
      score: null,
      backlogs: 0,
      mediumOfInstruction: '',
      isPrimary: true
    }],
    secondaryEducation: {
      grade10SchoolName: '',
      grade10Year: null,
      grade10Marks: null,
      grade10Board: '',
      grade12SchoolName: '',
      grade12Year: null,
      grade12Marks: null,
      grade12Board: ''
    },
    languageTests: {
      englishTest: null,
      englishScore: undefined,
      englishTestDate: undefined,
      germanLevel: null,
      germanTestDate: undefined
    },
    workExperience: [],
    workExperienceLevel: null,
    contactPreferences: {
      email: '',
      mobileNumber: '',
      alternatePhone: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      preferredIntake: null,
      interestedCountry: 'Germany',
      studyLevel: null,
      preferredProgram: ''
    },
    documents: [],
    completionPercentage: 0
  }
}
