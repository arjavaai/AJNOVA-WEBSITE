import {
  EligibilityFormData,
  EligibilityResult,
  EligibilityLevel,
  ScoreBreakdown,
  ScoreType,
  EnglishTest,
  GermanLevel,
  WorkExperience,
  QualificationLevel
} from './eligibility-types'

// Check if qualification meets German university requirements
function checkAcademicEligibility(qualificationLevel: QualificationLevel, score: number, scoreType: ScoreType): {
  eligible: boolean
  needsStudienkolleg: boolean
  status: string
} {
  // High school graduates typically need Studienkolleg for direct admission
  if (qualificationLevel === 'HIGH_SCHOOL') {
    // Check if score meets minimum requirement
    const meetsMinimum = scoreType === 'CGPA' ? score >= 5.0 : score >= 50
    return {
      eligible: meetsMinimum,
      needsStudienkolleg: true,
      status: meetsMinimum
        ? 'Meets general admission criteria (Studienkolleg required)'
        : 'Does not meet minimum academic requirements'
    }
  }

  // Diploma holders
  if (qualificationLevel === 'DIPLOMA') {
    const meetsMinimum = scoreType === 'CGPA' ? score >= 5.5 : score >= 55
    return {
      eligible: meetsMinimum,
      needsStudienkolleg: false,
      status: meetsMinimum
        ? 'Meets general admission criteria'
        : 'Does not meet minimum academic requirements'
    }
  }

  // Bachelor's degree holders
  if (qualificationLevel === 'BACHELORS') {
    const meetsMinimum = scoreType === 'CGPA' ? score >= 5.0 : score >= 50
    return {
      eligible: meetsMinimum,
      needsStudienkolleg: false,
      status: meetsMinimum
        ? 'Meets general admission criteria'
        : 'Does not meet minimum academic requirements'
    }
  }

  // Master's and PhD holders
  const meetsMinimum = scoreType === 'CGPA' ? score >= 5.0 : score >= 50
  return {
    eligible: meetsMinimum,
    needsStudienkolleg: false,
    status: meetsMinimum
      ? 'Meets general admission criteria'
      : 'Does not meet minimum academic requirements'
  }
}

// Check English proficiency (for English-taught programs)
function checkEnglishProficiency(test: EnglishTest, score?: number): {
  status: string
  sufficient: boolean
} {
  if (test === 'NONE') {
    return {
      status: 'No English proficiency test taken',
      sufficient: false
    }
  }

  if (test === 'PENDING') {
    return {
      status: 'English proficiency test pending',
      sufficient: false
    }
  }

  if (!score) {
    return {
      status: 'English proficiency score required',
      sufficient: false
    }
  }

  if (test === 'IELTS') {
    const sufficient = score >= 6.5
    return {
      status: sufficient
        ? 'Sufficient for English-taught programs'
        : 'Below typical requirement (IELTS 6.5+ recommended)',
      sufficient
    }
  }

  if (test === 'TOEFL') {
    const sufficient = score >= 80
    return {
      status: sufficient
        ? 'Sufficient for English-taught programs'
        : 'Below typical requirement (TOEFL 80+)',
      sufficient
    }
  }

  return {
    status: 'English proficiency test required',
    sufficient: false
  }
}

// Check German proficiency (for German-taught programs)
function checkGermanProficiency(level: GermanLevel): {
  status: string
  forGermanPrograms: boolean
} {
  if (level === 'NONE') {
    return {
      status: 'Not required for English-taught programs',
      forGermanPrograms: false
    }
  }

  const sufficientForGerman = ['B2', 'C1', 'C2'].includes(level)

  return {
    status: sufficientForGerman
      ? 'Sufficient for German-taught programs'
      : 'Only required for German-taught programs (B2+ needed)',
    forGermanPrograms: sufficientForGerman
  }
}

// Determine overall eligibility level
function determineEligibilityLevel(
  academicEligible: boolean,
  needsStudienkolleg: boolean,
  englishSufficient: boolean
): EligibilityLevel {
  if (academicEligible && !needsStudienkolleg && englishSufficient) {
    return 'PUBLIC_ELIGIBLE'
  } else if (academicEligible) {
    return 'PRIVATE_ELIGIBLE'
  }
  return 'NEEDS_IMPROVEMENT'
}

// Get message based on eligibility level
function getEligibilityMessage(level: EligibilityLevel, needsStudienkolleg: boolean): string {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      if (needsStudienkolleg) {
        return "Your academic qualifications meet the general requirements for German public universities. You will need to complete Studienkolleg (preparatory course) before direct admission to a degree program."
      }
      return "Based on your academic qualifications and language proficiency, you meet the general eligibility criteria for public universities in Germany."
    case 'PRIVATE_ELIGIBLE':
      return "Your academic background meets general requirements. Additional steps may be needed such as improving language proficiency or completing Studienkolleg for certain programs."
    case 'NEEDS_IMPROVEMENT':
      return "Your profile would benefit from strengthening in certain areas. Our counsellors can help you explore pathways to improve your qualifications and meet university requirements."
  }
}

// Get recommendations based on eligibility assessment
function getRecommendations(
  level: EligibilityLevel,
  academicStatus: string,
  englishStatus: string,
  germanStatus: string,
  needsStudienkolleg: boolean,
  formData: EligibilityFormData
): string[] {
  const recommendations: string[] = []

  // Studienkolleg recommendation
  if (needsStudienkolleg) {
    recommendations.push('Complete Studienkolleg (preparatory course) for direct university admission')
  }

  // English recommendations
  if (formData.englishTest === 'NONE') {
    recommendations.push('Take an English proficiency test (IELTS 6.5+ or TOEFL 80+ recommended) for English-taught programs')
  } else if (formData.englishScore && formData.englishTest === 'IELTS' && formData.englishScore < 6.5) {
    recommendations.push('IELTS 6.5+ overall is recommended for most English-taught public university programs')
  } else if (formData.englishScore && formData.englishTest === 'TOEFL' && formData.englishScore < 80) {
    recommendations.push('Improve English score to meet university requirements (TOEFL 80+)')
  }

  // German recommendations (only for German-taught programs)
  if (formData.germanLevel === 'NONE') {
    recommendations.push('German language not required for English-taught programs')
  } else if (!['B2', 'C1', 'C2'].includes(formData.germanLevel)) {
    recommendations.push('For German-taught programs, achieve B2 level or higher')
  }

  // General recommendations
  if (level === 'NEEDS_IMPROVEMENT') {
    recommendations.push('Book a consultation with our counsellors for a personalized improvement plan')
  } else {
    recommendations.push('Proceed with APS verification and document preparation')
  }

  return recommendations
}

// Get next steps based on eligibility level
function getNextSteps(level: EligibilityLevel, needsStudienkolleg: boolean): string[] {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      if (needsStudienkolleg) {
        return [
          'Research Studienkolleg programs and requirements',
          'Submit APS verification documents',
          'Prepare application for Studienkolleg',
          'Book consultation for detailed guidance'
        ]
      }
      return [
        'Complete APS verification process',
        'Prepare admission documents (SOP, LOR, CV)',
        'Research and shortlist universities',
        'Begin university applications'
      ]
    case 'PRIVATE_ELIGIBLE':
      return [
        'Complete missing requirements (language tests, etc.)',
        'Book consultation for personalized guidance',
        'Explore suitable university programs',
        'Prepare required documents'
      ]
    case 'NEEDS_IMPROVEMENT':
      return [
        'Book a free consultation to assess your options',
        'Understand specific gaps in your profile',
        'Create an improvement action plan',
        'Consider alternative pathways to German education'
      ]
  }
}

// Get badge information
function getBadgeInfo(level: EligibilityLevel, needsStudienkolleg: boolean): { label: string; color: string } {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      if (needsStudienkolleg) {
        return {
          label: 'Additional Steps Required',
          color: 'amber'
        }
      }
      return {
        label: 'Eligible for Public Universities',
        color: 'green'
      }
    case 'PRIVATE_ELIGIBLE':
      return {
        label: 'Additional Steps Required',
        color: 'amber'
      }
    case 'NEEDS_IMPROVEMENT':
      return {
        label: 'Profile Needs Strengthening',
        color: 'amber'
      }
  }
}

// Main calculation function
export function calculateEligibility(formData: EligibilityFormData): EligibilityResult {
  // Check academic eligibility
  const academicCheck = checkAcademicEligibility(
    formData.qualificationLevel,
    formData.score,
    formData.scoreType
  )

  // Check language proficiency
  const englishCheck = checkEnglishProficiency(formData.englishTest, formData.englishScore)
  const germanCheck = checkGermanProficiency(formData.germanLevel)

  // Determine overall eligibility level
  const level = determineEligibilityLevel(
    academicCheck.eligible,
    academicCheck.needsStudienkolleg,
    englishCheck.sufficient
  )

  // Calculate profile strength indicator (qualitative, not for scoring)
  let profileStrength = 0
  if (academicCheck.eligible) profileStrength += 50
  if (englishCheck.sufficient) profileStrength += 30
  if (germanCheck.forGermanPrograms) profileStrength += 20

  // Create qualitative breakdown (not numerical scores)
  const breakdown: ScoreBreakdown = {
    academicScore: academicCheck.eligible ? 1 : 0,
    academicMax: 1,
    englishScore: englishCheck.sufficient ? 1 : 0,
    englishMax: 1,
    germanScore: germanCheck.forGermanPrograms ? 1 : 0,
    germanMax: 1,
    workExperienceScore: 0, // Not used for eligibility
    workExperienceMax: 0,
    totalScore: profileStrength,
    totalMax: 100
  }

  // Build result
  const result: EligibilityResult = {
    level,
    readinessScore: profileStrength,
    breakdown,
    badge: getBadgeInfo(level, academicCheck.needsStudienkolleg),
    message: getEligibilityMessage(level, academicCheck.needsStudienkolleg),
    recommendations: getRecommendations(
      level,
      academicCheck.status,
      englishCheck.status,
      germanCheck.status,
      academicCheck.needsStudienkolleg,
      formData
    ),
    nextSteps: getNextSteps(level, academicCheck.needsStudienkolleg),
    // Add assessment details for display
    assessmentDetails: {
      academic: academicCheck.status,
      english: englishCheck.status,
      german: germanCheck.status,
      needsStudienkolleg: academicCheck.needsStudienkolleg
    }
  }

  return result
}

// Validate form data
export function validateEligibilityForm(formData: Partial<EligibilityFormData>): string[] {
  const errors: string[] = []

  if (!formData.qualificationLevel) {
    errors.push('Qualification level is required')
  }

  if (!formData.fieldOfStudy) {
    errors.push('Field of study is required')
  }

  if (formData.fieldOfStudy === 'OTHER' && !formData.otherFieldOfStudy) {
    errors.push('Please specify your field of study')
  }

  if (!formData.scoreType) {
    errors.push('Score type is required')
  }

  if (!formData.score || formData.score <= 0) {
    errors.push('Score is required')
  } else {
    if (formData.scoreType === 'CGPA' && formData.score > 10) {
      errors.push('CGPA cannot exceed 10')
    }
    if (formData.scoreType === 'PERCENTAGE' && formData.score > 100) {
      errors.push('Percentage cannot exceed 100')
    }
  }

  if (!formData.englishTest) {
    errors.push('English proficiency status is required')
  }

  if ((formData.englishTest === 'IELTS' || formData.englishTest === 'TOEFL') && !formData.englishScore) {
    errors.push('English test score is required')
  }

  if (!formData.germanLevel) {
    errors.push('German language level is required')
  }

  if (!formData.workExperience) {
    errors.push('Work experience is required')
  }

  return errors
}
