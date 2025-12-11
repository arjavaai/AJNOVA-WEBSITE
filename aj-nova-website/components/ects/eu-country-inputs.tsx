'use client'

/**
 * EU/ECTS Country Inputs Component
 * For European countries using the ECTS system
 * Formula: Direct CP to ECTS (1:1 mapping)
 */

import { EUDegreeDetails } from '@/lib/ects-types'

interface EUCountryInputsProps {
  details: Partial<EUDegreeDetails>
  onChange: (details: Partial<EUDegreeDetails>) => void
}

export function EUCountryInputs({ details, onChange }: EUCountryInputsProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>EU/ECTS System:</strong> For European countries using ECTS, the conversion is
          direct (1 CP = 1 ECTS). Enter your total credit points.
        </p>
      </div>

      {/* Credit Points Input */}
      <div>
        <label
          htmlFor="credit-points"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Total Credit Points (CP) *
        </label>
        <input
          type="number"
          id="credit-points"
          min="1"
          max="500"
          value={details.creditPoints || ''}
          onChange={(e) =>
            onChange({
              ...details,
              creditPoints: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="e.g., 180, 240"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter the total credit points from your degree certificate (typically 180 for 3-year
          Bachelor, 240 for 4-year Bachelor, 120 for Master)
        </p>
      </div>

      {/* Formula Display */}
      <div className="p-4 bg-muted rounded-xl">
        <p className="text-sm font-medium text-foreground mb-2">Calculation Formula:</p>
        <p className="text-sm text-muted-foreground font-mono">
          ECTS = Credit Points × 1
        </p>
        {details.creditPoints && details.creditPoints > 0 && (
          <p className="text-sm text-coral font-semibold mt-2">
            Your ECTS: {details.creditPoints}
          </p>
        )}
      </div>
    </div>
  )
}
