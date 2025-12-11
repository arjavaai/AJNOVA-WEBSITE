'use client'

/**
 * Export Actions Component
 * Buttons for exporting ECTS calculation (PDF, Email, Save)
 */

import { useState } from 'react'
import { Download, Mail, Save, Loader2 } from 'lucide-react'
import { ECTSCalculation } from '@/lib/ects-types'

interface ExportActionsProps {
  calculation: ECTSCalculation | null
  onExportPDF: () => Promise<void>
  onEmailReport?: (email: string) => Promise<void>
  onSaveToProfile?: () => Promise<void>
  showSave?: boolean // Whether to show Save to Profile button (dashboard only)
}

export function ExportActions({
  calculation,
  onExportPDF,
  onEmailReport,
  onSaveToProfile,
  showSave = false,
}: ExportActionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')

  if (!calculation) return null

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await onExportPDF()
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleEmailReport = async () => {
    if (!emailAddress || !emailAddress.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    setIsEmailing(true)
    try {
      if (onEmailReport) {
        await onEmailReport(emailAddress)
        setShowEmailModal(false)
        setEmailAddress('')
        alert('Email sent successfully!')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email. Please try again.')
    } finally {
      setIsEmailing(false)
    }
  }

  const handleSaveToProfile = async () => {
    setIsSaving(true)
    try {
      if (onSaveToProfile) {
        await onSaveToProfile()
        alert('Calculation saved to your profile!')
      }
    } catch (error) {
      console.error('Error saving to profile:', error)
      alert('Failed to save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Export Your Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PDF Download Button */}
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-coral hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-sm"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download PDF
            </>
          )}
        </button>

        {/* Email Report Button */}
        {onEmailReport && (
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-background border-2 border-coral text-coral hover:bg-coral/10 font-medium rounded-xl transition-all"
          >
            <Mail className="w-5 h-5" />
            Email Report
          </button>
        )}

        {/* Save to Profile Button (Dashboard only) */}
        {showSave && onSaveToProfile && (
          <button
            onClick={handleSaveToProfile}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-navy hover:bg-navy/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save to Profile
              </>
            )}
          </button>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-4">Email ECTS Report</h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder={calculation.studentInfo.email || 'your.email@example.com'}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleEmailReport}
                  disabled={isEmailing}
                  className="flex-1 px-4 py-2 bg-coral hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                >
                  {isEmailing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Email'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowEmailModal(false)
                    setEmailAddress('')
                  }}
                  className="px-4 py-2 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
