'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import { 
  EligibilityFormData, 
  EligibilityResult, 
  ScoreType,
  QualificationLevel,
  FieldOfStudy,
  EnglishTest,
  GermanLevel,
  WorkExperience
} from '@/lib/eligibility-types'
import { calculateEligibility, validateEligibilityForm } from '@/lib/eligibility-calculator'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function EligibilityCheckerPage() {
  const [formData, setFormData] = useState<Partial<EligibilityFormData>>({
    scoreType: 'CGPA',
    englishTest: 'IELTS',
    germanLevel: 'NONE',
    workExperience: 'NONE'
  })
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const validationErrors = validateEligibilityForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors([])
    const eligibilityResult = calculateEligibility(formData as EligibilityFormData)
    setResult(eligibilityResult)
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  function handleReset() {
    setFormData({
      scoreType: 'CGPA',
      englishTest: 'IELTS',
      germanLevel: 'NONE',
      workExperience: 'NONE'
    })
    setResult(null)
    setErrors([])
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Preliminary Profile Assessment for German Universities
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Answer a few questions and learn your admission possibilities in under 2 minutes
        </p>
        <p className="text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4 inline mr-1" />
          This is a preliminary assessment. Final eligibility depends on APS verification, uni-assist evaluation, and individual university requirements.
        </p>
      </div>

      {/* Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Academic Profile</CardTitle>
          <CardDescription>Fill in your details to assess your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Errors */}
            {errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-semibold text-red-900 mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qualification Level */}
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest Qualification Completed *</Label>
                <Select
                  value={formData.qualificationLevel}
                  onValueChange={(value: QualificationLevel) => 
                    setFormData({ ...formData, qualificationLevel: value })
                  }
                >
                  <SelectTrigger id="qualification">
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                    <SelectItem value="DIPLOMA">Diploma</SelectItem>
                    <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                    <SelectItem value="MASTERS">Master's Degree</SelectItem>
                    <SelectItem value="PHD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Field of Study */}
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study *</Label>
                <Select
                  value={formData.fieldOfStudy}
                  onValueChange={(value: FieldOfStudy) => 
                    setFormData({ ...formData, fieldOfStudy: value })
                  }
                >
                  <SelectTrigger id="field">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENGINEERING">Engineering</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="IT">Information Technology</SelectItem>
                    <SelectItem value="HEALTH_SCIENCES">Health Sciences</SelectItem>
                    <SelectItem value="ARTS">Arts</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Other Field of Study */}
            {formData.fieldOfStudy === 'OTHER' && (
              <div className="space-y-2">
                <Label htmlFor="otherField">Specify Your Field *</Label>
                <Input
                  id="otherField"
                  value={formData.otherFieldOfStudy || ''}
                  onChange={(e) => setFormData({ ...formData, otherFieldOfStudy: e.target.value })}
                  placeholder="e.g., Environmental Sciences"
                />
              </div>
            )}

            {/* CGPA/Percentage */}
            <div className="space-y-2">
              <Label>Academic Score *</Label>
              <RadioGroup
                value={formData.scoreType}
                onValueChange={(value: ScoreType) => 
                  setFormData({ ...formData, scoreType: value, score: undefined })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CGPA" id="cgpa" />
                  <Label htmlFor="cgpa" className="cursor-pointer">CGPA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PERCENTAGE" id="percentage" />
                  <Label htmlFor="percentage" className="cursor-pointer">Percentage</Label>
                </div>
              </RadioGroup>
              <Input
                type="number"
                step="0.01"
                value={formData.score || ''}
                onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) })}
                placeholder={formData.scoreType === 'CGPA' ? 'e.g., 7.5' : 'e.g., 75'}
                max={formData.scoreType === 'CGPA' ? 10 : 100}
              />
              <p className="text-xs text-muted-foreground">
                {formData.scoreType === 'CGPA' ? 'Enter on a scale of 10' : 'Enter out of 100'}
              </p>
            </div>

            {/* English Proficiency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="englishTest">English Proficiency *</Label>
                <Select
                  value={formData.englishTest}
                  onValueChange={(value: EnglishTest) => 
                    setFormData({ ...formData, englishTest: value, englishScore: undefined })
                  }
                >
                  <SelectTrigger id="englishTest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                    <SelectItem value="TOEFL">TOEFL</SelectItem>
                    <SelectItem value="PENDING">Test Pending</SelectItem>
                    <SelectItem value="NONE">Not Taken</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.englishTest === 'IELTS' || formData.englishTest === 'TOEFL') && (
                <div className="space-y-2">
                  <Label htmlFor="englishScore">
                    {formData.englishTest === 'IELTS' ? 'IELTS Score' : 'TOEFL Score'} *
                  </Label>
                  <Input
                    id="englishScore"
                    type="number"
                    step="0.5"
                    value={formData.englishScore || ''}
                    onChange={(e) => setFormData({ ...formData, englishScore: parseFloat(e.target.value) })}
                    placeholder={formData.englishTest === 'IELTS' ? 'e.g., 6.5' : 'e.g., 85'}
                  />
                </div>
              )}
            </div>

            {/* German Language Level */}
            <div className="space-y-2">
              <Label htmlFor="german">German Language Level *</Label>
              <Select
                value={formData.germanLevel}
                onValueChange={(value: GermanLevel) => 
                  setFormData({ ...formData, germanLevel: value })
                }
              >
                <SelectTrigger id="german">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="A1">A1 (Beginner)</SelectItem>
                  <SelectItem value="A2">A2 (Elementary)</SelectItem>
                  <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                  <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                  <SelectItem value="C1">C1 (Advanced)</SelectItem>
                  <SelectItem value="C2">C2 (Proficiency)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Work Experience */}
            <div className="space-y-2">
              <Label htmlFor="work">Work Experience *</Label>
              <Select
                value={formData.workExperience}
                onValueChange={(value: WorkExperience) => 
                  setFormData({ ...formData, workExperience: value })
                }
              >
                <SelectTrigger id="work">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="LESS_THAN_1">Less than 1 year</SelectItem>
                  <SelectItem value="ONE_TO_THREE">1-3 years</SelectItem>
                  <SelectItem value="THREE_PLUS">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Assess My Profile
              </Button>
              {result && (
                <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div id="results" className="space-y-6">
          {/* Main Result */}
          <Card className={cn(
            "border-2",
            result.badge.color === 'green' && "border-green-500 bg-green-50",
            result.badge.color === 'amber' && "border-amber-500 bg-amber-50",
            result.badge.color === 'red' && "border-red-500 bg-red-50"
          )}>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Badge 
                  className={cn(
                    "text-lg py-2 px-4 mb-4",
                    result.badge.color === 'green' && "bg-green-600",
                    result.badge.color === 'amber' && "bg-amber-600",
                    result.badge.color === 'red' && "bg-red-600"
                  )}
                >
                  {result.badge.label}
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  Readiness Score: {result.readinessScore}%
                </h2>
                <Progress 
                  value={result.readinessScore} 
                  className="h-3 mb-4"
                />
                <p className="text-lg">{result.message}</p>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Detailed Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Academic */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Academic Score</span>
                    <span className="font-bold">{result.breakdown.academicScore}/{result.breakdown.academicMax}</span>
                  </div>
                  <Progress 
                    value={(result.breakdown.academicScore / result.breakdown.academicMax) * 100} 
                    className="h-2"
                  />
                </div>

                {/* English */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">English Proficiency</span>
                    <span className="font-bold">{result.breakdown.englishScore}/{result.breakdown.englishMax}</span>
                  </div>
                  <Progress 
                    value={(result.breakdown.englishScore / result.breakdown.englishMax) * 100} 
                    className="h-2"
                  />
                </div>

                {/* German */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">German Language</span>
                    <span className="font-bold">{result.breakdown.germanScore}/{result.breakdown.germanMax}</span>
                  </div>
                  <Progress 
                    value={(result.breakdown.germanScore / result.breakdown.germanMax) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Work Experience */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Work Experience</span>
                    <span className="font-bold">{result.breakdown.workExperienceScore}/{result.breakdown.workExperienceMax}</span>
                  </div>
                  <Progress 
                    value={(result.breakdown.workExperienceScore / result.breakdown.workExperienceMax) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" asChild>
              <Link href="/dashboard/consultations">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Free Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1" asChild>
              <Link href="/dashboard">
                Improve My Profile
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
