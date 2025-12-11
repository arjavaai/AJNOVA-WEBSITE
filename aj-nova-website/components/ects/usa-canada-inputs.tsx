'use client'

/**
 * USA/Canada Inputs Component
 * Formula: 1 US Credit = 2 ECTS
 */

import { USACanadaDegreeDetails } from '@/lib/ects-types'

interface USACanadaInputsProps {
  details: Partial<USACanadaDegreeDetails>
  onChange: (details: Partial<USACanadaDegreeDetails>) => void
}

const degreeLevelOptions = [
  { value: 'ASSOCIATE', label: 'Associate Degree' },
  { value: 'BACHELOR', label: "Bachelor's Degree" },
  { value: 'MASTER', label: "Master's Degree" },
]

export function USACanadaInputs({ details, onChange }: USACanadaInputsProps) {
  const calculatedECTS = details.usCredits ? details.usCredits * 2 : 0

  return (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl">
        <p className="text-sm text-green-900 dark:text-green-100">
          <strong>USA/Canada System:</strong> US semester credits are converted using the standard
          formula: 1 US Credit = 2 ECTS credits.
        </p>
      </div>

      {/* US Credits Input */}
      <div>
        <label
          htmlFor="us-credits"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Total US Semester Credits *
        </label>
        <input
          type="number"
          id="us-credits"
          min="1"
          max="300"
          value={details.usCredits || ''}
          onChange={(e) =>
            onChange({
              ...details,
              usCredits: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="e.g., 120, 180"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Total semester credits (not quarter credits). Typical Bachelor: 120 credits, Master: 30-60 credits
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
              degreeLevel: e.target.value as USACanadaDegreeDetails['degreeLevel'],
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
          ECTS = US Credits × 2
        </p>
        {calculatedECTS > 0 && (
          <p className="text-sm text-coral font-semibold mt-2">
            Your ECTS: {details.usCredits} × 2 = {calculatedECTS}
          </p>
        )}
      </div>
    </div>
  )
}
