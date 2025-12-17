'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { getRandomEncouragement } from '@/lib/motivational-messages'
import { cn } from '@/lib/utils'

interface MotivationalQuoteProps {
  className?: string
  showIcon?: boolean
}

export function MotivationalQuote({ className, showIcon = true }: MotivationalQuoteProps) {
  const [quote, setQuote] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setQuote(getRandomEncouragement())
  }, [])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) return null

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4",
      className
    )}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-3">
        {showIcon && (
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900 italic">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  )
}

// Minimal version without card styling
export function MotivationalQuoteMinimal({ className }: { className?: string }) {
  const [quote, setQuote] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setQuote(getRandomEncouragement())
  }, [])

  if (!mounted) return null

  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
      <Sparkles className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm italic">"{quote}"</p>
    </div>
  )
}
