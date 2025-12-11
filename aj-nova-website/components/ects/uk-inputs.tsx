'use client'

/**
 * UK Inputs Component
 * Formula: 1 UK Credit = 0.5 ECTS
 */

import { UKDegreeDetails } from '@/lib/ects-types'

interface UKInputsProps {
  details: Partial<UKDegreeDetails>
  onChange: (details: Partial<UKDegreeDetails>) => void
}

const degreeLevelOptions = [
  { value: 'BACHELOR', label: "Bachelor's Degree" },
  { value: 'MASTER', label: "Master's Degree" },
]

export function UKInputs({ details, onChange }: UKInputsProps) {
  const calculatedECTS = details.ukCredits ? details.ukCredits * 0.5 : 0

  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-xl">
        <p className="text-sm text-purple-900 dark:text-purple-100">
          <strong>UK System:</strong> UK credits (CATS) are converted using the formula: 1 UK
          Credit = 0.5 ECTS credits.
        </p>
      </div>

      {/* UK Credits Input */}
      <div>
        <label
          htmlFor="uk-credits"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Total UK Credits (CATS) *
        </label>
        <input
          type="number"
          id="uk-credits"
          min="1"
          max="600"
          value={details.ukCredits || ''}
          onChange={(e) =>
            onChange({
              ...details,
              ukCredits: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="e.g., 360, 480"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Credit Accumulation and Transfer Scheme (CATS). Typical Bachelor: 360 credits, Master: 180 credits
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
              degreeLevel: e.target.value as UKDegreeDetails['degreeLevel'],
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
          ECTS = UK Credits × 0.5
        </p>
        {calculatedECTS > 0 && (
          <p className="text-sm text-coral font-semibold mt-2">
            Your ECTS: {details.ukCredits} × 0.5 = {calculatedECTS}
          </p>
        )}
      </div>
    </div>
  )
}
