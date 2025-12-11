'use client'

/**
 * Other Countries Inputs Component
 * Formula: Years × 60 ECTS
 */

import { OtherDegreeDetails } from '@/lib/ects-types'

interface OtherCountryInputsProps {
  details: Partial<OtherDegreeDetails>
  onChange: (details: Partial<OtherDegreeDetails>) => void
}

const degreeLevelOptions = [
  { value: 'BACHELOR', label: "Bachelor's Degree" },
  { value: 'MASTER', label: "Master's Degree" },
  { value: 'PHD', label: 'Doctoral Degree (PhD)' },
]

export function OtherCountryInputs({ details, onChange }: OtherCountryInputsProps) {
  const calculatedECTS = details.yearsCompleted ? details.yearsCompleted * 60 : 0

  return (
    <div className="space-y-6">
      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-xl">
        <p className="text-sm text-orange-900 dark:text-orange-100">
          <strong>Other Countries:</strong> ECTS is estimated based on the duration of study.
          Standard conversion: 60 ECTS per year of full-time study.
        </p>
      </div>

      {/* Years Completed Input */}
      <div>
        <label
          htmlFor="years-completed"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Years of Full-Time Study *
        </label>
        <input
          type="number"
          id="years-completed"
          min="1"
          max="10"
          step="0.5"
          value={details.yearsCompleted || ''}
          onChange={(e) =>
            onChange({
              ...details,
              yearsCompleted: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="e.g., 3, 4, 2"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Number of years of full-time study for this degree. Typical Bachelor: 3-4 years, Master: 1-2 years
        </p>
      </div>

      {/* Degree Level */}
      <div>
        <label
          htmlFor="degree-level"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Degree Level *
        </label>
        <select
          id="degree-level"
          value={details.degreeLevel || ''}
          onChange={(e) =>
            onChange({
              ...details,
              degreeLevel: e.target.value as OtherDegreeDetails['degreeLevel'],
            })
          }
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        >
          <option value="">Select degree level</option>
          {degreeLevelOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          The level of your completed degree
        </p>
      </div>

      {/* Formula Display */}
      <div className="p-4 bg-muted rounded-xl">
        <p className="text-sm font-medium text-foreground mb-2">Calculation Formula:</p>
        <p className="text-sm text-muted-foreground font-mono">
          ECTS = Years × 60
        </p>
        {calculatedECTS > 0 && (
          <p className="text-sm text-coral font-semibold mt-2">
            Your ECTS: {details.yearsCompleted} × 60 = {calculatedECTS}
          </p>
        )}
      </div>

      {/* Warning */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
        <p className="text-xs text-amber-900 dark:text-amber-100">
          <strong>Note:</strong> This is a rough estimation. Official evaluation by uni-assist is
          strongly recommended for accurate assessment.
        </p>
      </div>
    </div>
  )
}
