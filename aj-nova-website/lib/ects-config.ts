/**
 * ECTS Calculator Configuration
 * Country mappings, degree type constants, and disclaimer text
 */

import { Country, CountryType, CountryOption } from './ects-types'

// ============================================
// Degree Type to ECTS Mappings
// ============================================

export const DEGREE_TYPE_MAPPINGS = {
  BACHELOR_3YR: 180,
  BACHELOR_4YR: 240,
  MASTER_2YR: 120,
  MASTER_1YR: 60,
  ASSOCIATE: 120,  // 2 years typically
} as const

// ============================================
// Country Mappings
// ============================================

export const COUNTRY_MAPPINGS: Record<string, Country> = {
  // EU/ECTS Countries
  'DE': { code: 'DE', name: 'Germany', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'FR': { code: 'FR', name: 'France', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'IT': { code: 'IT', name: 'Italy', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'ES': { code: 'ES', name: 'Spain', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'NL': { code: 'NL', name: 'Netherlands', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'AT': { code: 'AT', name: 'Austria', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'BE': { code: 'BE', name: 'Belgium', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'PL': { code: 'PL', name: 'Poland', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'SE': { code: 'SE', name: 'Sweden', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'DK': { code: 'DK', name: 'Denmark', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'FI': { code: 'FI', name: 'Finland', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'PT': { code: 'PT', name: 'Portugal', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'CZ': { code: 'CZ', name: 'Czech Republic', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'GR': { code: 'GR', name: 'Greece', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'HU': { code: 'HU', name: 'Hungary', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'RO': { code: 'RO', name: 'Romania', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'IE': { code: 'IE', name: 'Ireland', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'HR': { code: 'HR', name: 'Croatia', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'SK': { code: 'SK', name: 'Slovakia', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'LT': { code: 'LT', name: 'Lithuania', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'SI': { code: 'SI', name: 'Slovenia', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'LV': { code: 'LV', name: 'Latvia', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'EE': { code: 'EE', name: 'Estonia', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'CY': { code: 'CY', name: 'Cyprus', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'LU': { code: 'LU', name: 'Luxembourg', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'MT': { code: 'MT', name: 'Malta', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'BG': { code: 'BG', name: 'Bulgaria', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'NO': { code: 'NO', name: 'Norway', type: 'EU_ECTS', defaultECTSPerYear: 60 },
  'CH': { code: 'CH', name: 'Switzerland', type: 'EU_ECTS', defaultECTSPerYear: 60 },

  // India Subcontinent
  'IN': { code: 'IN', name: 'India', type: 'INDIA_SUBCONTINENT', defaultECTSPerYear: 60 },
  'PK': { code: 'PK', name: 'Pakistan', type: 'INDIA_SUBCONTINENT', defaultECTSPerYear: 60 },
  'BD': { code: 'BD', name: 'Bangladesh', type: 'INDIA_SUBCONTINENT', defaultECTSPerYear: 60 },

  // USA/Canada
  'US': { code: 'US', name: 'United States', type: 'USA_CANADA', defaultECTSPerYear: 60 },
  'CA': { code: 'CA', name: 'Canada', type: 'USA_CANADA', defaultECTSPerYear: 60 },

  // United Kingdom
  'GB': { code: 'GB', name: 'United Kingdom', type: 'UK', defaultECTSPerYear: 60 },
}

// ============================================
// Country Options for Dropdowns (Grouped)
// ============================================

export const COUNTRY_OPTIONS: CountryOption[] = [
  // Europe (EU/ECTS)
  { value: 'AT', label: 'Austria', type: 'EU_ECTS', region: 'Europe' },
  { value: 'BE', label: 'Belgium', type: 'EU_ECTS', region: 'Europe' },
  { value: 'BG', label: 'Bulgaria', type: 'EU_ECTS', region: 'Europe' },
  { value: 'HR', label: 'Croatia', type: 'EU_ECTS', region: 'Europe' },
  { value: 'CY', label: 'Cyprus', type: 'EU_ECTS', region: 'Europe' },
  { value: 'CZ', label: 'Czech Republic', type: 'EU_ECTS', region: 'Europe' },
  { value: 'DK', label: 'Denmark', type: 'EU_ECTS', region: 'Europe' },
  { value: 'EE', label: 'Estonia', type: 'EU_ECTS', region: 'Europe' },
  { value: 'FI', label: 'Finland', type: 'EU_ECTS', region: 'Europe' },
  { value: 'FR', label: 'France', type: 'EU_ECTS', region: 'Europe' },
  { value: 'DE', label: 'Germany', type: 'EU_ECTS', region: 'Europe' },
  { value: 'GR', label: 'Greece', type: 'EU_ECTS', region: 'Europe' },
  { value: 'HU', label: 'Hungary', type: 'EU_ECTS', region: 'Europe' },
  { value: 'IE', label: 'Ireland', type: 'EU_ECTS', region: 'Europe' },
  { value: 'IT', label: 'Italy', type: 'EU_ECTS', region: 'Europe' },
  { value: 'LV', label: 'Latvia', type: 'EU_ECTS', region: 'Europe' },
  { value: 'LT', label: 'Lithuania', type: 'EU_ECTS', region: 'Europe' },
  { value: 'LU', label: 'Luxembourg', type: 'EU_ECTS', region: 'Europe' },
  { value: 'MT', label: 'Malta', type: 'EU_ECTS', region: 'Europe' },
  { value: 'NL', label: 'Netherlands', type: 'EU_ECTS', region: 'Europe' },
  { value: 'NO', label: 'Norway', type: 'EU_ECTS', region: 'Europe' },
  { value: 'PL', label: 'Poland', type: 'EU_ECTS', region: 'Europe' },
  { value: 'PT', label: 'Portugal', type: 'EU_ECTS', region: 'Europe' },
  { value: 'RO', label: 'Romania', type: 'EU_ECTS', region: 'Europe' },
  { value: 'SK', label: 'Slovakia', type: 'EU_ECTS', region: 'Europe' },
  { value: 'SI', label: 'Slovenia', type: 'EU_ECTS', region: 'Europe' },
  { value: 'ES', label: 'Spain', type: 'EU_ECTS', region: 'Europe' },
  { value: 'SE', label: 'Sweden', type: 'EU_ECTS', region: 'Europe' },
  { value: 'CH', label: 'Switzerland', type: 'EU_ECTS', region: 'Europe' },

  // United Kingdom
  { value: 'GB', label: 'United Kingdom', type: 'UK', region: 'Europe' },

  // South Asia
  { value: 'IN', label: 'India', type: 'INDIA_SUBCONTINENT', region: 'Asia' },
  { value: 'PK', label: 'Pakistan', type: 'INDIA_SUBCONTINENT', region: 'Asia' },
  { value: 'BD', label: 'Bangladesh', type: 'INDIA_SUBCONTINENT', region: 'Asia' },

  // North America
  { value: 'US', label: 'United States', type: 'USA_CANADA', region: 'North America' },
  { value: 'CA', label: 'Canada', type: 'USA_CANADA', region: 'North America' },

  // Other (sorted alphabetically)
  { value: 'AF', label: 'Afghanistan', type: 'OTHER', region: 'Asia' },
  { value: 'AL', label: 'Albania', type: 'OTHER', region: 'Europe' },
  { value: 'DZ', label: 'Algeria', type: 'OTHER', region: 'Africa' },
  { value: 'AR', label: 'Argentina', type: 'OTHER', region: 'South America' },
  { value: 'AM', label: 'Armenia', type: 'OTHER', region: 'Asia' },
  { value: 'AU', label: 'Australia', type: 'OTHER', region: 'Oceania' },
  { value: 'AZ', label: 'Azerbaijan', type: 'OTHER', region: 'Asia' },
  { value: 'BH', label: 'Bahrain', type: 'OTHER', region: 'Middle East' },
  { value: 'BY', label: 'Belarus', type: 'OTHER', region: 'Europe' },
  { value: 'BO', label: 'Bolivia', type: 'OTHER', region: 'South America' },
  { value: 'BA', label: 'Bosnia and Herzegovina', type: 'OTHER', region: 'Europe' },
  { value: 'BR', label: 'Brazil', type: 'OTHER', region: 'South America' },
  { value: 'BT', label: 'Bhutan', type: 'OTHER', region: 'Asia' },
  { value: 'KH', label: 'Cambodia', type: 'OTHER', region: 'Asia' },
  { value: 'CL', label: 'Chile', type: 'OTHER', region: 'South America' },
  { value: 'CN', label: 'China', type: 'OTHER', region: 'Asia' },
  { value: 'CO', label: 'Colombia', type: 'OTHER', region: 'South America' },
  { value: 'EG', label: 'Egypt', type: 'OTHER', region: 'Africa' },
  { value: 'ET', label: 'Ethiopia', type: 'OTHER', region: 'Africa' },
  { value: 'GE', label: 'Georgia', type: 'OTHER', region: 'Asia' },
  { value: 'GH', label: 'Ghana', type: 'OTHER', region: 'Africa' },
  { value: 'HK', label: 'Hong Kong', type: 'OTHER', region: 'Asia' },
  { value: 'ID', label: 'Indonesia', type: 'OTHER', region: 'Asia' },
  { value: 'IR', label: 'Iran', type: 'OTHER', region: 'Middle East' },
  { value: 'IQ', label: 'Iraq', type: 'OTHER', region: 'Middle East' },
  { value: 'IL', label: 'Israel', type: 'OTHER', region: 'Middle East' },
  { value: 'JP', label: 'Japan', type: 'OTHER', region: 'Asia' },
  { value: 'JO', label: 'Jordan', type: 'OTHER', region: 'Middle East' },
  { value: 'KZ', label: 'Kazakhstan', type: 'OTHER', region: 'Asia' },
  { value: 'KE', label: 'Kenya', type: 'OTHER', region: 'Africa' },
  { value: 'KW', label: 'Kuwait', type: 'OTHER', region: 'Middle East' },
  { value: 'LB', label: 'Lebanon', type: 'OTHER', region: 'Middle East' },
  { value: 'MY', label: 'Malaysia', type: 'OTHER', region: 'Asia' },
  { value: 'MV', label: 'Maldives', type: 'OTHER', region: 'Asia' },
  { value: 'MX', label: 'Mexico', type: 'OTHER', region: 'North America' },
  { value: 'MA', label: 'Morocco', type: 'OTHER', region: 'Africa' },
  { value: 'MM', label: 'Myanmar', type: 'OTHER', region: 'Asia' },
  { value: 'NP', label: 'Nepal', type: 'OTHER', region: 'Asia' },
  { value: 'NZ', label: 'New Zealand', type: 'OTHER', region: 'Oceania' },
  { value: 'NG', label: 'Nigeria', type: 'OTHER', region: 'Africa' },
  { value: 'OM', label: 'Oman', type: 'OTHER', region: 'Middle East' },
  { value: 'PE', label: 'Peru', type: 'OTHER', region: 'South America' },
  { value: 'PH', label: 'Philippines', type: 'OTHER', region: 'Asia' },
  { value: 'QA', label: 'Qatar', type: 'OTHER', region: 'Middle East' },
  { value: 'RU', label: 'Russia', type: 'OTHER', region: 'Europe' },
  { value: 'SA', label: 'Saudi Arabia', type: 'OTHER', region: 'Middle East' },
  { value: 'RS', label: 'Serbia', type: 'OTHER', region: 'Europe' },
  { value: 'SG', label: 'Singapore', type: 'OTHER', region: 'Asia' },
  { value: 'ZA', label: 'South Africa', type: 'OTHER', region: 'Africa' },
  { value: 'KR', label: 'South Korea', type: 'OTHER', region: 'Asia' },
  { value: 'LK', label: 'Sri Lanka', type: 'OTHER', region: 'Asia' },
  { value: 'SY', label: 'Syria', type: 'OTHER', region: 'Middle East' },
  { value: 'TW', label: 'Taiwan', type: 'OTHER', region: 'Asia' },
  { value: 'TH', label: 'Thailand', type: 'OTHER', region: 'Asia' },
  { value: 'TR', label: 'Turkey', type: 'OTHER', region: 'Middle East' },
  { value: 'UA', label: 'Ukraine', type: 'OTHER', region: 'Europe' },
  { value: 'AE', label: 'United Arab Emirates', type: 'OTHER', region: 'Middle East' },
  { value: 'UZ', label: 'Uzbekistan', type: 'OTHER', region: 'Asia' },
  { value: 'VN', label: 'Vietnam', type: 'OTHER', region: 'Asia' },
  { value: 'YE', label: 'Yemen', type: 'OTHER', region: 'Middle East' },
  { value: 'ZW', label: 'Zimbabwe', type: 'OTHER', region: 'Africa' },
]

// ============================================
// Uni-Assist Disclaimer
// ============================================

export const UNI_ASSIST_DISCLAIMER = `IMPORTANT LEGAL DISCLAIMER:

This ECTS calculator is provided by AJ NOVA as a preliminary estimation tool only. The calculation is based on general conversion guidelines and may not reflect the exact evaluation by uni-assist or German universities.

OFFICIAL EVALUATION REQUIRED:
• All international credentials MUST be officially evaluated by uni-assist
• This tool does NOT replace official uni-assist assessment
• Final ECTS recognition is determined by individual universities
• Discrepancies may exist between this estimate and official evaluation

LIMITATION OF LIABILITY:
AJ NOVA assumes no responsibility for admission decisions based on these estimates. For official evaluation, please visit: https://www.uni-assist.de

By using this calculator, you acknowledge that you understand this is an unofficial estimation tool only.`

// ============================================
// Helper Functions
// ============================================

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRY_MAPPINGS[code]
}

/**
 * Get country type by code
 */
export function getCountryType(code: string): CountryType {
  return COUNTRY_MAPPINGS[code]?.type || 'OTHER'
}

/**
 * Group countries by region for UI display
 */
export function getCountriesGroupedByRegion() {
  const grouped: Record<string, CountryOption[]> = {}

  COUNTRY_OPTIONS.forEach(country => {
    if (!grouped[country.region]) {
      grouped[country.region] = []
    }
    grouped[country.region].push(country)
  })

  return grouped
}

/**
 * Get countries by type
 */
export function getCountriesByType(type: CountryType): CountryOption[] {
  return COUNTRY_OPTIONS.filter(c => c.type === type)
}
