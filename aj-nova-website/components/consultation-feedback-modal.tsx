'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConsultationFeedbackModalProps {
  open: boolean
  onClose: () => void
  consultationId: string
  counsellorName: string
  onSubmit: (feedback: { rating: number; comment: string }) => Promise<void>
}

export function ConsultationFeedbackModal({
  open,
  onClose,
  consultationId,
  counsellorName,
  onSubmit,
}: ConsultationFeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please provide a rating')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({ rating, comment })
      // Reset and close
      setRating(0)
      setComment('')
      onClose()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>How was your consultation?</DialogTitle>
          <DialogDescription>
            We'd love to hear about your experience with {counsellorName}. Your feedback helps us improve our service.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rate your experience</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={cn(
                      "w-10 h-10 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 5 && "Excellent! We're thrilled to hear that."}
                {rating === 4 && "Great! We're glad you had a good experience."}
                {rating === 3 && "Good. We'll work to make it better next time."}
                {rating === 2 && "We appreciate your feedback and will improve."}
                {rating === 1 && "We're sorry to hear that. We'll do better."}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Additional comments (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Tell us more about your consultation experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Skip
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || rating === 0}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Hook to check if feedback modal should be shown
export function useShouldShowFeedback(consultation: {
  id: string
  scheduled_date: string | Date
  duration_minutes: number
  status: string
  feedback_submitted?: boolean
}): boolean {
  if (consultation.feedback_submitted) return false
  if (consultation.status !== 'COMPLETED') return false

  const consultationEnd = new Date(consultation.scheduled_date)
  consultationEnd.setMinutes(consultationEnd.getMinutes() + consultation.duration_minutes)

  const oneHourAfterEnd = new Date(consultationEnd.getTime() + 60 * 60 * 1000)
  const now = new Date()

  // Show if current time is past 1 hour after consultation end
  return now >= oneHourAfterEnd
}
