'use client'

/**
 * ECTS Result Panel Component
 * Displays calculated ECTS results with confidence level and formula
 */

import { ECTSResult } from '@/lib/ects-types'
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

interface ResultPanelProps {
  result: ECTSResult
}

export function ResultPanel({ result }: ResultPanelProps) {
  // Get confidence color and icon
  const getConfidenceStyles = () => {
    switch (result.confidence) {
      case 'HIGH':
        return {
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-500',
          icon: CheckCircle,
          label: 'High Confidence',
        }
      case 'MEDIUM':
        return {
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          textColor: 'text-amber-500',
          icon: AlertTriangle,
          label: 'Medium Confidence',
        }
      case 'LOW':
        return {
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-500',
          icon: AlertCircle,
          label: 'Low Confidence',
        }
    }
  }

  const styles = getConfidenceStyles()
  const Icon = styles.icon

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div
        className={`${styles.bgColor} ${styles.borderColor} border-2 rounded-2xl p-8 text-center`}
      >
        {/* ECTS Value */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Estimated ECTS Credits</p>
          <p className={`text-6xl md:text-7xl font-bold ${styles.textColor}`}>
            {result.totalECTS}
          </p>
          <p className="text-xl text-muted-foreground mt-2">ECTS</p>
        </div>

        {/* Level Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium mt-4">
          <span>Level: {result.level}</span>
        </div>

        {/* Confidence Badge */}
        <div className="mt-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${styles.bgColor} ${styles.textColor} text-sm font-medium`}
          >
            <Icon className="w-4 h-4" />
            <span>{styles.label}</span>
          </div>
        </div>
      </div>

      {/* Calculation Details */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Calculation Details</h3>

        <div className="space-y-4">
          {/* Formula */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Formula Used:</p>
            <p className="text-base text-foreground font-mono bg-muted px-3 py-2 rounded">
              {result.formulaUsed}
            </p>
          </div>

          {/* Confidence Explanation */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Confidence Level Explanation:
            </p>
            <p className="text-sm text-foreground">
              {result.confidence === 'HIGH' &&
                'High confidence - This calculation uses standardized conversion rates that are widely accepted by German universities.'}
              {result.confidence === 'MEDIUM' &&
                'Medium confidence - This calculation uses recognized conversion formulas, but actual recognition may vary by institution.'}
              {result.confidence === 'LOW' &&
                'Low confidence - This is a rough estimation. Official evaluation by uni-assist is strongly recommended for accurate assessment.'}
            </p>
          </div>

          {/* Admin Override Notice */}
          {result.adminOverride && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Administrative Override Applied
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Original ECTS: {result.totalECTS}
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Adjusted ECTS: {result.adminOverride.overriddenValue}
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-2">
                Reason: {result.adminOverride.reason}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Important Notice */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Important Reminder
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This is an estimation tool only. All international credentials MUST be officially
              evaluated by uni-assist. Final ECTS recognition is determined by individual German
              universities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
