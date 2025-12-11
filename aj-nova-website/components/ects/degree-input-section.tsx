'use client'

/**
 * Degree Input Section Component
 * Dynamically renders appropriate input fields based on selected country type
 */

import { Country, DegreeDetails } from '@/lib/ects-types'
import { EUCountryInputs } from './eu-country-inputs'
import { IndiaInputs } from './india-inputs'
import { USACanadaInputs } from './usa-canada-inputs'
import { UKInputs } from './uk-inputs'
import { OtherCountryInputs } from './other-country-inputs'

interface DegreeInputSectionProps {
  selectedCountry: Country | null
  degreeDetails: Partial<DegreeDetails> | null
  onDegreeDetailsChange: (details: Partial<DegreeDetails>) => void
}

export function DegreeInputSection({
  selectedCountry,
  degreeDetails,
  onDegreeDetailsChange,
}: DegreeInputSectionProps) {
  if (!selectedCountry) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-muted-foreground">
          Please select a country in the Student Information section first to see relevant degree input fields.
        </p>
      </div>
    )
  }

  // Render appropriate component based on country type
  switch (selectedCountry.type) {
    case 'EU_ECTS':
      return (
        <EUCountryInputs
          details={{
            ...degreeDetails,
            type: 'EU_ECTS',
          }}
          onChange={onDegreeDetailsChange}
        />
      )

    case 'INDIA_SUBCONTINENT':
      return (
        <IndiaInputs
          details={{
            ...degreeDetails,
            type: 'INDIA_SUBCONTINENT',
          }}
          onChange={onDegreeDetailsChange}
        />
      )

    case 'USA_CANADA':
      return (
        <USACanadaInputs
          details={{
            ...degreeDetails,
            type: 'USA_CANADA',
          }}
          onChange={onDegreeDetailsChange}
        />
      )

    case 'UK':
      return (
        <UKInputs
          details={{
            ...degreeDetails,
            type: 'UK',
          }}
          onChange={onDegreeDetailsChange}
        />
      )

    case 'OTHER':
      return (
        <OtherCountryInputs
          details={{
            ...degreeDetails,
            type: 'OTHER',
          }}
          onChange={onDegreeDetailsChange}
        />
      )

    default:
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Unsupported country type: {selectedCountry.type}</p>
        </div>
      )
  }
}
