/**
 * ECTS Calculator - Calculation Engine
 * Core logic for converting international qualifications to ECTS credits
 */

import {
  DegreeDetails,
  ECTSResult,
  ECTSBreakdown,
  ConfidenceLevel,
  DegreeLevel,
  EUDegreeDetails,
  IndiaDegreeDetails,
  USACanadaDegreeDetails,
  UKDegreeDetails,
  OtherDegreeDetails,
  ValidationError,
} from './ects-types'
import { DEGREE_TYPE_MAPPINGS } from './ects-config'

// ============================================
// Main Calculation Function
// ============================================

/**
 * Calculate ECTS credits based on degree details
 * @param degreeDetails - Student's degree information
 * @returns ECTSResult with total ECTS, level, formula, and confidence
 */
export function calculateECTS(degreeDetails: DegreeDetails): ECTSResult {
  let totalECTS: number
  let formulaUsed: string
  let confidence: ConfidenceLevel
  let level: DegreeLevel

  switch (degreeDetails.type) {
    case 'EU_ECTS':
      ({ totalECTS, formulaUsed, confidence, level } = calculateEU(degreeDetails))
      break

    case 'INDIA_SUBCONTINENT':
      ({ totalECTS, formulaUsed, confidence, level } = calculateIndia(degreeDetails))
      break

    case 'USA_CANADA':
      ({ totalECTS, formulaUsed, confidence, level } = calculateUSACanada(degreeDetails))
      break

    case 'UK':
      ({ totalECTS, formulaUsed, confidence, level } = calculateUK(degreeDetails))
      break

    case 'OTHER':
      ({ totalECTS, formulaUsed, confidence, level } = calculateOther(degreeDetails))
      break

    default:
      throw new Error('Invalid degree type')
  }

  // Create breakdown
  const breakdown: ECTSBreakdown = {
    baseCalculation: totalECTS,
    adjustments: [],
    finalECTS: totalECTS,
  }

  return {
    totalECTS,
    level,
    breakdown,
    formulaUsed,
    confidence,
  }
}

// ============================================
// Country-Specific Calculation Functions
// ============================================

/**
 * Calculate ECTS for EU/ECTS countries
 * Formula: Direct CP to ECTS (1:1 mapping)
 */
function calculateEU(details: EUDegreeDetails) {
  const totalECTS = details.creditPoints

  // Determine level based on ECTS
  const level = determineLevelFromECTS(totalECTS)

  return {
    totalECTS,
    formulaUsed: 'Direct ECTS (1 CP = 1 ECTS)',
    confidence: 'HIGH' as ConfidenceLevel,
    level,
  }
}

/**
 * Calculate ECTS for India/Pakistan/Bangladesh
 * Formula: Duration-based fixed values
 */
function calculateIndia(details: IndiaDegreeDetails) {
  const totalECTS = DEGREE_TYPE_MAPPINGS[details.degreeType]

  // Determine level from degree type
  const level = details.degreeType.includes('MASTER') ? 'MASTER' : 'BACHELOR'

  return {
    totalECTS,
    formulaUsed: `Duration-based: ${details.degreeType.replace(/_/g, ' ')} = ${totalECTS} ECTS`,
    confidence: 'HIGH' as ConfidenceLevel,
    level: level as DegreeLevel,
  }
}

/**
 * Calculate ECTS for USA/Canada
 * Formula: 1 US Credit = 2 ECTS
 */
function calculateUSACanada(details: USACanadaDegreeDetails) {
  const totalECTS = details.usCredits * 2

  // Determine level from degree level
  const level = details.degreeLevel === 'MASTER' ? 'MASTER' : 'BACHELOR'

  return {
    totalECTS,
    formulaUsed: '1 US Credit = 2 ECTS',
    confidence: 'MEDIUM' as ConfidenceLevel,
    level: level as DegreeLevel,
  }
}

/**
 * Calculate ECTS for United Kingdom
 * Formula: 1 UK Credit = 0.5 ECTS
 */
function calculateUK(details: UKDegreeDetails) {
  const totalECTS = details.ukCredits * 0.5

  return {
    totalECTS,
    formulaUsed: '1 UK Credit = 0.5 ECTS',
    confidence: 'MEDIUM' as ConfidenceLevel,
    level: details.degreeLevel as DegreeLevel,
  }
}

/**
 * Calculate ECTS for other countries
 * Formula: Years × 60 ECTS
 */
function calculateOther(details: OtherDegreeDetails) {
  const totalECTS = details.yearsCompleted * 60

  return {
    totalECTS,
    formulaUsed: 'Years × 60 ECTS/year',
    confidence: 'LOW' as ConfidenceLevel,
    level: details.degreeLevel as DegreeLevel,
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Determine degree level from ECTS value
 * Note: This is context-dependent and may not be 100% accurate
 */
function determineLevelFromECTS(ects: number): DegreeLevel {
  if (ects >= 300) {
    return 'MASTER' // Likely Bachelor + Master combined or PhD
  } else if (ects >= 180 && ects < 300) {
    return 'BACHELOR' // Standard bachelor
  } else if (ects >= 60 && ects < 180) {
    return 'MASTER' // Likely a master's degree
  } else {
    return 'BACHELOR' // Default
  }
}

/**
 * Validate ECTS range for a given level
 * @param ects - ECTS value to validate
 * @param level - Degree level
 * @returns boolean indicating if ECTS is in expected range
 */
export function validateECTSRange(ects: number, level: DegreeLevel): boolean {
  const ranges = {
    BACHELOR: { min: 180, max: 240 },
    MASTER: { min: 60, max: 120 },
    PHD: { min: 180, max: 240 },
  }

  const range = ranges[level]
  if (!range) return true // Unknown level, skip validation

  return ects >= range.min && ects <= range.max
}

/**
 * Get confidence level description
 */
export function getConfidenceDescription(confidence: ConfidenceLevel): string {
  switch (confidence) {
    case 'HIGH':
      return 'High confidence - Standardized system with established conversion rates'
    case 'MEDIUM':
      return 'Medium confidence - Recognized conversion formula, may vary by institution'
    case 'LOW':
      return 'Low confidence - Estimation only, official evaluation strongly recommended'
  }
}

/**
 * Get level description
 */
export function getLevelDescription(level: DegreeLevel): string {
  switch (level) {
    case 'BACHELOR':
      return "Bachelor's Degree Level"
    case 'MASTER':
      return "Master's Degree Level"
    case 'PHD':
      return 'Doctoral (PhD) Level'
  }
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validate EU degree details
 */
function validateEU(details: Partial<EUDegreeDetails>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!details.creditPoints || details.creditPoints <= 0) {
    errors.push({
      field: 'creditPoints',
      message: 'Credit points must be greater than 0',
    })
  }

  if (details.creditPoints && (details.creditPoints < 1 || details.creditPoints > 500)) {
    errors.push({
      field: 'creditPoints',
      message: 'Credit points must be between 1 and 500',
    })
  }

  return errors
}

/**
 * Validate India degree details
 */
function validateIndia(details: Partial<IndiaDegreeDetails>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!details.degreeType) {
    errors.push({
      field: 'degreeType',
      message: 'Degree type is required',
    })
  }

  const validTypes = ['BACHELOR_3YR', 'BACHELOR_4YR', 'MASTER_2YR', 'MASTER_1YR']
  if (details.degreeType && !validTypes.includes(details.degreeType)) {
    errors.push({
      field: 'degreeType',
      message: 'Invalid degree type',
    })
  }

  return errors
}

/**
 * Validate USA/Canada degree details
 */
function validateUSACanada(details: Partial<USACanadaDegreeDetails>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!details.usCredits || details.usCredits <= 0) {
    errors.push({
      field: 'usCredits',
      message: 'US credits must be greater than 0',
    })
  }

  if (details.usCredits && (details.usCredits < 1 || details.usCredits > 300)) {
    errors.push({
      field: 'usCredits',
      message: 'US credits must be between 1 and 300',
    })
  }

  if (!details.degreeLevel) {
    errors.push({
      field: 'degreeLevel',
      message: 'Degree level is required',
    })
  }

  return errors
}

/**
 * Validate UK degree details
 */
function validateUK(details: Partial<UKDegreeDetails>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!details.ukCredits || details.ukCredits <= 0) {
    errors.push({
      field: 'ukCredits',
      message: 'UK credits must be greater than 0',
    })
  }

  if (details.ukCredits && (details.ukCredits < 1 || details.ukCredits > 600)) {
    errors.push({
      field: 'ukCredits',
      message: 'UK credits must be between 1 and 600',
    })
  }

  if (!details.degreeLevel) {
    errors.push({
      field: 'degreeLevel',
      message: 'Degree level is required',
    })
  }

  return errors
}

/**
 * Validate Other country degree details
 */
function validateOther(details: Partial<OtherDegreeDetails>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!details.yearsCompleted || details.yearsCompleted <= 0) {
    errors.push({
      field: 'yearsCompleted',
      message: 'Years completed must be greater than 0',
    })
  }

  if (details.yearsCompleted && (details.yearsCompleted < 1 || details.yearsCompleted > 10)) {
    errors.push({
      field: 'yearsCompleted',
      message: 'Years completed must be between 1 and 10',
    })
  }

  if (!details.degreeLevel) {
    errors.push({
      field: 'degreeLevel',
      message: 'Degree level is required',
    })
  }

  return errors
}

/**
 * Validate degree details based on type
 */
export function validateDegreeDetails(details: Partial<DegreeDetails>): ValidationError[] {
  if (!details.type) {
    return [{ field: 'type', message: 'Country type is required' }]
  }

  switch (details.type) {
    case 'EU_ECTS':
      return validateEU(details as Partial<EUDegreeDetails>)
    case 'INDIA_SUBCONTINENT':
      return validateIndia(details as Partial<IndiaDegreeDetails>)
    case 'USA_CANADA':
      return validateUSACanada(details as Partial<USACanadaDegreeDetails>)
    case 'UK':
      return validateUK(details as Partial<UKDegreeDetails>)
    case 'OTHER':
      return validateOther(details as Partial<OtherDegreeDetails>)
    default:
      return [{ field: 'type', message: 'Invalid country type' }]
  }
}

/**
 * Validate complete ECTS form
 */
export function validateECTSForm(formData: {
  studentName?: string
  country?: any
  degreeDetails?: Partial<DegreeDetails>
  disclaimerAccepted?: boolean
}): string[] {
  const errors: string[] = []

  // Validate student name
  if (!formData.studentName || formData.studentName.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }

  // Validate country
  if (!formData.country) {
    errors.push('Please select a country')
  }

  // Validate degree details
  if (!formData.degreeDetails) {
    errors.push('Please provide degree details')
  } else {
    const degreeErrors = validateDegreeDetails(formData.degreeDetails)
    errors.push(...degreeErrors.map(e => e.message))
  }

  // Validate disclaimer
  if (!formData.disclaimerAccepted) {
    errors.push('You must accept the disclaimer')
  }

  return errors
}
