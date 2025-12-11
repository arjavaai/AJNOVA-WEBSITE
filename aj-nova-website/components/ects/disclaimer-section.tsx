'use client'

/**
 * Disclaimer Section Component
 * Displays legal disclaimer with checkbox acceptance
 */

import { UNI_ASSIST_DISCLAIMER } from '@/lib/ects-config'

interface DisclaimerSectionProps {
  disclaimerAccepted: boolean
  onDisclaimerChange: (accepted: boolean) => void
}

export function DisclaimerSection({
  disclaimerAccepted,
  onDisclaimerChange,
}: DisclaimerSectionProps) {
  return (
    <div className="space-y-4">
      {/* Disclaimer Text Box */}
      <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900 rounded-xl max-h-80 overflow-y-auto">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-amber-900 dark:text-amber-100">
            {UNI_ASSIST_DISCLAIMER}
          </pre>
        </div>
      </div>

      {/* Acceptance Checkbox */}
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
        <input
          type="checkbox"
          id="disclaimer-checkbox"
          checked={disclaimerAccepted}
          onChange={(e) => onDisclaimerChange(e.target.checked)}
          className="mt-1 w-5 h-5 text-coral border-border rounded focus:ring-coral focus:ring-offset-0 cursor-pointer"
        />
        <label
          htmlFor="disclaimer-checkbox"
          className="text-sm text-foreground cursor-pointer select-none"
        >
          <span className="font-semibold">I understand and accept:</span>
          <br />I acknowledge that this is an unofficial estimation tool only. All international
          credentials must be officially evaluated by uni-assist, and final ECTS recognition is
          determined by individual German universities. This calculation does not guarantee
          admission or credit recognition.
        </label>
      </div>

      {/* Validation Message */}
      {!disclaimerAccepted && (
        <p className="text-xs text-muted-foreground text-center">
          You must accept the disclaimer to proceed with the calculation
        </p>
      )}
    </div>
  )
}
