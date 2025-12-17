'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EligibilityResult {
  public_university_eligible: boolean
  private_university_eligible: boolean
  readiness_score: number
  eligibility_status: 'ELIGIBLE' | 'CONDITIONAL' | 'NOT_ELIGIBLE'
  recommendations?: string[]
}

export function EligibilitySummaryCard() {
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    fetchEligibility()
  }, [])

  async function fetchEligibility() {
    try {
      const { eligibility } = await import('@/lib/api-client')
      const data = await eligibility.getLastResult()

      if (data.result) {
        setResult(data.result)
        setHasChecked(true)
      } else {
        setHasChecked(false)
      }
    } catch (error) {
      console.error('Error fetching eligibility:', error)
      setHasChecked(false)
    } finally {
      setLoading(false)
    }
  }

  function getEligibilityBadge() {
    if (!result) return null

    if (result.public_university_eligible) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300" variant="outline">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Public University Eligible
        </Badge>
      )
    } else if (result.private_university_eligible) {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-300" variant="outline">
          <AlertCircle className="w-3 h-3 mr-1" />
          Private University Eligible
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-300" variant="outline">
          <XCircle className="w-3 h-3 mr-1" />
          Needs Improvement
        </Badge>
      )
    }
  }

  function getScoreColor(score: number) {
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-red-600'
  }

  function getProgressColor(score: number) {
    if (score >= 75) return 'bg-green-500'
    if (score >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!hasChecked || !result) {
    return (
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            Preliminary Profile Assessment
          </CardTitle>
          <CardDescription>
            Find out your admission chances for German universities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Answer a few quick questions to understand your profile readiness for public and private universities in Germany.
          </p>
          <Link href="/dashboard/eligibility">
            <Button className="w-full">
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Eligibility Result</CardTitle>
            <CardDescription>Based on your academic profile and test scores</CardDescription>
          </div>
          {getEligibilityBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Readiness Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Readiness Score</span>
              <span className={cn("text-2xl font-bold", getScoreColor(result.readiness_score))}>
                {result.readiness_score}%
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500", getProgressColor(result.readiness_score))}
                style={{ width: `${result.readiness_score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your academics and language scores
            </p>
          </div>

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Next Steps:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                {result.recommendations.slice(0, 2).map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link href="/dashboard/consultations" className="flex-1">
              <Button variant="default" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </Link>
            <Link href="/dashboard/profile" className="flex-1">
              <Button variant="outline" className="w-full">
                Improve Profile
              </Button>
            </Link>
          </div>

          {/* Re-check link */}
          <Link href="/dashboard/eligibility" className="block text-center">
            <Button variant="link" size="sm" className="text-xs">
              Retake assessment →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
