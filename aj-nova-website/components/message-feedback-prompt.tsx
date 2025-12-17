'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageFeedbackPromptProps {
  conversationId: string
  onFeedback: (helpful: boolean) => void
  className?: string
}

export function MessageFeedbackPrompt({
  conversationId,
  onFeedback,
  className,
}: MessageFeedbackPromptProps) {
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleFeedback = (helpful: boolean) => {
    onFeedback(helpful)
    setSubmitted(true)
    // Auto-dismiss after 3 seconds
    setTimeout(() => setDismissed(true), 3000)
  }

  if (dismissed) return null

  if (submitted) {
    return (
      <Card className={cn("border-green-200 bg-green-50/50", className)}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Thank you for your feedback!</p>
                <p className="text-sm text-green-700">
                  We're constantly working to improve your experience.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDismissed(true)}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("border-blue-200 bg-blue-50/50", className)}>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-blue-900 mb-1">Did you get the help you needed?</p>
            <p className="text-sm text-blue-700">
              Your feedback helps us improve our support.
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(true)}
              className="hover:bg-green-100 hover:border-green-300 hover:text-green-700"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(false)}
              className="hover:bg-red-100 hover:border-red-300 hover:text-red-700"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              No
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDismissed(true)}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Hook to determine if feedback prompt should be shown
 * Show after 5 minutes of no new messages
 */
export function useShouldShowMessageFeedback(
  lastMessageTime: Date | null,
  hasShownFeedback: boolean
): boolean {
  if (!lastMessageTime || hasShownFeedback) return false

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  return lastMessageTime < fiveMinutesAgo
}
