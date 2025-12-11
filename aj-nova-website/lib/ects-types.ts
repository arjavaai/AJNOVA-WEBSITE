/**
 * ECTS Calculator Type Definitions
 * TypeScript interfaces and types for the ECTS estimation system
 */

// ============================================
// Country Types
// ============================================

export type CountryType =
  | 'EU_ECTS'            // European countries using ECTS system
  | 'INDIA_SUBCONTINENT' // India, Pakistan, Bangladesh
  | 'USA_CANADA'         // United States and Canada
  | 'UK'                 // United Kingdom
  | 'OTHER'              // All other countries

export interface Country {
  code: string           // ISO country code (e.g., 'DE', 'IN', 'US')
  name: string           // Full country name
  type: CountryType      // Classification for calculation logic
  defaultECTSPerYear: number  // Standard ECTS per year (usually 60)
}

// ============================================
// Student Information
// ============================================

export interface StudentInfo {
  name: string
  email?: string         // Optional email address
  country: Country
}

// ============================================
// Degree Details (Discriminated Union)
// ============================================

// Base interface for common properties
interface BaseDegreeDetails {
  type: CountryType
}

// EU/ECTS Country Input (Direct CP to ECTS)
export interface EUDegreeDetails extends BaseDegreeDetails {
  type: 'EU_ECTS'
  creditPoints: number   // Total credit points (CP)
  subjects?: SubjectCredit[]  // Optional granular breakdown
}

// India/Pakistan/Bangladesh Input (Duration-based)
export interface IndiaDegreeDetails extends BaseDegreeDetails {
  type: 'INDIA_SUBCONTINENT'
  degreeType: 'BACHELOR_3YR' | 'BACHELOR_4YR' | 'MASTER_2YR' | 'MASTER_1YR'
  yearOfCompletion?: number  // Optional, for display only
}

// USA/Canada Input (US Credits)
export interface USACanadaDegreeDetails extends BaseDegreeDetails {
  type: 'USA_CANADA'
  usCredits: number      // Total US semester credits
  degreeLevel: 'ASSOCIATE' | 'BACHELOR' | 'MASTER'
}

// UK Input (UK Credits)
export interface UKDegreeDetails extends BaseDegreeDetails {
  type: 'UK'
  ukCredits: number      // Total UK credits
  degreeLevel: 'BACHELOR' | 'MASTER'
}

// Other Countries Input (Years-based)
export interface OtherDegreeDetails extends BaseDegreeDetails {
  type: 'OTHER'
  yearsCompleted: number // Number of years of study
  degreeLevel: 'BACHELOR' | 'MASTER' | 'PHD'
}

// Discriminated union of all degree detail types
export type DegreeDetails =
  | EUDegreeDetails
  | IndiaDegreeDetails
  | USACanadaDegreeDetails
  | UKDegreeDetails
  | OtherDegreeDetails

// Subject-level credits (for EU countries)
export interface SubjectCredit {
  subjectName: string
  credits: number
  grade?: string         // Optional grade information
}

// ============================================
// Calculation Results
// ============================================

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type DegreeLevel = 'BACHELOR' | 'MASTER' | 'PHD'

export interface ECTSResult {
  totalECTS: number      // Final calculated ECTS value
  level: DegreeLevel     // Degree level classification
  breakdown: ECTSBreakdown  // Detailed calculation breakdown
  formulaUsed: string    // Description of formula applied
  confidence: ConfidenceLevel  // Confidence level of estimate
  adminOverride?: AdminOverride  // Optional admin adjustment
}

export interface ECTSBreakdown {
  baseCalculation: number  // Initial ECTS before adjustments
  adjustments: Adjustment[]  // List of adjustments applied
  finalECTS: number        // Final ECTS after all adjustments
}

export interface Adjustment {
  type: string           // Type of adjustment
  value: number          // Adjustment value (positive or negative)
  reason: string         // Explanation for adjustment
}

export interface AdminOverride {
  overriddenValue: number  // New ECTS value set by admin
  reason: string         // Justification for override
  overriddenBy: string   // Admin user ID or name
  overriddenAt: Date     // Timestamp of override
}

// ============================================
// Complete Calculation
// ============================================

export interface ECTSCalculation {
  id?: string            // Unique identifier (for database storage)
  studentInfo: StudentInfo  // Student information
  degreeDetails: DegreeDetails  // Degree details (varies by country)
  result: ECTSResult     // Calculation result
  createdAt: Date        // Calculation timestamp
  savedBy?: string       // User ID if saved to database
}

// ============================================
// Form Data State
// ============================================

export interface ECTSFormData {
  studentInfo: Partial<StudentInfo>
  degreeDetails: Partial<DegreeDetails> | null
  disclaimerAccepted: boolean
}

// ============================================
// Helper Types for UI
// ============================================

export interface CountryOption {
  value: string          // Country code
  label: string          // Display name
  type: CountryType      // Country classification
  region: string         // Geographic region for grouping
}

export interface DegreeTypeOption {
  value: string
  label: string
  ects: number           // Fixed ECTS value for this degree type
}

// ============================================
// Validation Error Types
// ============================================

export interface ValidationError {
  field: string
  message: string
}

export type ValidationErrors = ValidationError[]
