'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import { mockStudentProfile } from '@/lib/mock-data'
import { DocumentType } from '@/lib/types'

function GenerateDocumentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentType = searchParams.get('type') as DocumentType
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [targetUniversity, setTargetUniversity] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  
  const documentTitles = {
    SOP: 'Statement of Purpose',
    LOR: 'Letter of Recommendation',
    RESUME: 'Resume/CV',
    COVER_LETTER: 'Cover Letter',
  }
  
  async function handleGenerate() {
    setLoading(true)
    
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType,
          profileData: mockStudentProfile,
          targetUniversity,
          targetProgram,
          additionalNotes,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate document')
      }
      
      router.push(`/dashboard/documents/${data.document.id}`)
    } catch (error: any) {
      console.error('Error generating document:', error)
      alert(error.message || 'Failed to generate document')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Generate {documentTitles[documentType]}
          </CardTitle>
          <CardDescription>
            Provide additional information to personalize your document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Step {step} of 3</Label>
            <Progress value={(step / 3) * 100} />
          </div>
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university">Target University (Optional)</Label>
                <Input
                  id="university"
                  placeholder="e.g., Stanford University"
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="program">Target Program (Optional)</Label>
                <Input
                  id="program"
                  placeholder="e.g., Master of Science in Computer Science"
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                />
              </div>
              
              <Button onClick={() => setStep(2)} className="w-full">
                Continue
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific points you want to include or emphasize..."
                  rows={6}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h3 className="font-semibold">Review Your Information</h3>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {mockStudentProfile.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {mockStudentProfile.email}
                  </div>
                  {mockStudentProfile.education && (
                    <div>
                      <span className="font-medium">Education:</span>
                      <pre className="mt-1 text-xs whitespace-pre-wrap">{mockStudentProfile.education}</pre>
                    </div>
                  )}
                  {mockStudentProfile.workExperience && (
                    <div>
                      <span className="font-medium">Work Experience:</span>
                      <pre className="mt-1 text-xs whitespace-pre-wrap">{mockStudentProfile.workExperience}</pre>
                    </div>
                  )}
                  {mockStudentProfile.skills && (
                    <div>
                      <span className="font-medium">Skills:</span> {mockStudentProfile.skills.join(', ')}
                    </div>
                  )}
                  {targetUniversity && (
                    <div>
                      <span className="font-medium">Target University:</span> {targetUniversity}
                    </div>
                  )}
                  {targetProgram && (
                    <div>
                      <span className="font-medium">Target Program:</span> {targetProgram}
                    </div>
                  )}
                  {additionalNotes && (
                    <div>
                      <span className="font-medium">Additional Notes:</span> {additionalNotes}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  ✨ This information will be used to generate your {documentTitles[documentType]}. 
                  The AI will create a personalized document based on your profile. 
                  Estimated time: 20-30 seconds.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1" disabled={loading}>
                  Back
                </Button>
                <Button onClick={handleGenerate} className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function GenerateDocumentPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
      <GenerateDocumentContent />
    </Suspense>
  )
}
