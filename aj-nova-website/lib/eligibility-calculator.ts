import {
  EligibilityFormData,
  EligibilityResult,
  EligibilityLevel,
  ScoreBreakdown,
  ScoreType,
  EnglishTest,
  GermanLevel,
  WorkExperience,
  SCORING_WEIGHTS,
  SCORE_THRESHOLDS
} from './eligibility-types'

// Calculate academic score (40 points max)
function calculateAcademicScore(score: number, scoreType: ScoreType): number {
  if (scoreType === 'CGPA') {
    if (score >= 7.0) return 40
    if (score >= 6.0) return 30
    if (score >= 5.0) return 20
    return 10
  } else {
    // PERCENTAGE
    if (score >= 70) return 40
    if (score >= 60) return 30
    if (score >= 50) return 20
    return 10
  }
}

// Calculate English proficiency score (20 points max)
function calculateEnglishScore(test: EnglishTest, score?: number): number {
  if (test === 'NONE') return 0
  if (test === 'PENDING') return 10

  if (!score) return 0

  if (test === 'IELTS') {
    if (score >= 6.0) return 20
    if (score >= 5.5) return 15
    return 10
  } else if (test === 'TOEFL') {
    if (score >= 80) return 20
    if (score >= 70) return 15
    return 10
  }

  return 0
}

// Calculate German language score (25 points max)
function calculateGermanScore(level: GermanLevel): number {
  switch (level) {
    case 'C2':
    case 'C1':
    case 'B2':
    case 'B1':
      return 25
    case 'A2':
      return 20
    case 'A1':
      return 10
    case 'NONE':
    default:
      return 0
  }
}

// Calculate work experience score (15 points max)
function calculateWorkExperienceScore(experience: WorkExperience): number {
  switch (experience) {
    case 'THREE_PLUS':
      return 15
    case 'ONE_TO_THREE':
      return 10
    case 'LESS_THAN_1':
      return 5
    case 'NONE':
    default:
      return 0
  }
}

// Determine eligibility level
function determineEligibilityLevel(totalScore: number): EligibilityLevel {
  if (totalScore >= SCORE_THRESHOLDS.PUBLIC_ELIGIBLE) {
    return 'PUBLIC_ELIGIBLE'
  } else if (totalScore >= SCORE_THRESHOLDS.PRIVATE_ELIGIBLE) {
    return 'PRIVATE_ELIGIBLE'
  }
  return 'NEEDS_IMPROVEMENT'
}

// Get message based on eligibility level
function getEligibilityMessage(level: EligibilityLevel): string {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      return "Congratulations! Based on your academic background and language proficiency, you're eligible for public universities in Germany. Your strong profile positions you well for competitive programs."
    case 'PRIVATE_ELIGIBLE':
      return "Good news! You're eligible for private universities in Germany. While public universities may be competitive, private institutions offer excellent programs and may be a great fit for your goals."
    case 'NEEDS_IMPROVEMENT':
      return "Don't worry — every journey starts with a single step. Your current profile shows potential, and with some improvements, you can achieve your study abroad goals."
  }
}

// Get recommendations based on scores and eligibility
function getRecommendations(
  level: EligibilityLevel,
  breakdown: ScoreBreakdown,
  formData: EligibilityFormData
): string[] {
  const recommendations: string[] = []

  // Academic recommendations
  if (breakdown.academicScore < 30) {
    recommendations.push('Focus on improving your academic performance or consider post-graduation courses')
  }

  // English recommendations
  if (formData.englishTest === 'NONE') {
    recommendations.push('Take an English proficiency test (IELTS 6.0+ or TOEFL 80+)')
  } else if (breakdown.englishScore < 15) {
    recommendations.push('Improve your English test score to meet university requirements')
  }

  // German recommendations
  if (breakdown.germanScore === 0) {
    recommendations.push('Start German language courses (aim for at least A2 level)')
  } else if (breakdown.germanScore < 20) {
    recommendations.push('Continue German language learning to reach B1 or higher for better opportunities')
  }

  // Work experience recommendations
  if (breakdown.workExperienceScore < 10 && level !== 'PUBLIC_ELIGIBLE') {
    recommendations.push('Gain relevant work experience to strengthen your profile')
  }

  // General recommendations
  if (level === 'NEEDS_IMPROVEMENT') {
    recommendations.push('Book a consultation with our counsellors for a personalized improvement plan')
  }

  return recommendations
}

// Get next steps based on eligibility level
function getNextSteps(level: EligibilityLevel): string[] {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      return [
        'Complete your profile information',
        'Submit APS verification documents',
        'Generate admission documents (SOP, LOR, CV)',
        'Start university applications'
      ]
    case 'PRIVATE_ELIGIBLE':
      return [
        'Explore private university options',
        'Consider improving language scores',
        'Book consultation for personalized guidance',
        'Research scholarship opportunities'
      ]
    case 'NEEDS_IMPROVEMENT':
      return [
        'Take English proficiency test if not done',
        'Enroll in German language courses',
        'Book a free consultation for guidance',
        'Create a profile improvement timeline'
      ]
  }
}

// Get badge information
function getBadgeInfo(level: EligibilityLevel): { label: string; color: string } {
  switch (level) {
    case 'PUBLIC_ELIGIBLE':
      return {
        label: 'Eligible for Public Universities',
        color: 'green'
      }
    case 'PRIVATE_ELIGIBLE':
      return {
        label: 'Eligible for Private Universities',
        color: 'amber'
      }
    case 'NEEDS_IMPROVEMENT':
      return {
        label: 'Profile Needs Improvement',
        color: 'red'
      }
  }
}

// Main calculation function
export function calculateEligibility(formData: EligibilityFormData): EligibilityResult {
  // Calculate individual scores
  const academicScore = calculateAcademicScore(formData.score, formData.scoreType)
  const englishScore = calculateEnglishScore(formData.englishTest, formData.englishScore)
  const germanScore = calculateGermanScore(formData.germanLevel)
  const workExperienceScore = calculateWorkExperienceScore(formData.workExperience)

  // Calculate total
  const totalScore = academicScore + englishScore + germanScore + workExperienceScore

  // Create score breakdown
  const breakdown: ScoreBreakdown = {
    academicScore,
    academicMax: SCORING_WEIGHTS.ACADEMIC,
    englishScore,
    englishMax: SCORING_WEIGHTS.ENGLISH,
    germanScore,
    germanMax: SCORING_WEIGHTS.GERMAN,
    workExperienceScore,
    workExperienceMax: SCORING_WEIGHTS.WORK_EXPERIENCE,
    totalScore,
    totalMax: 100
  }

  // Determine eligibility level
  const level = determineEligibilityLevel(totalScore)

  // Build result
  const result: EligibilityResult = {
    level,
    readinessScore: totalScore,
    breakdown,
    badge: getBadgeInfo(level),
    message: getEligibilityMessage(level),
    recommendations: getRecommendations(level, breakdown, formData),
    nextSteps: getNextSteps(level)
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
