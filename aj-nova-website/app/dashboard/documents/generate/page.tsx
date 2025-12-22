'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react'
import { DocumentType } from '@/lib/types'
import Link from 'next/link'

interface StudentProfile {
  first_name?: string
  last_name?: string
  email?: string
  highest_qualification?: string
  field_of_study?: string
  institution_name?: string
  graduation_year?: number
  cgpa_percentage?: number
  education?: any[]
  work_experience?: any[]
  work_experience_years?: string
  completion_percentage?: number
}

function GenerateDocumentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentType = searchParams.get('type') as DocumentType

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [targetUniversity, setTargetUniversity] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      setProfileLoading(true)
      const { profiles } = await import('@/lib/api-client')
      const data = await profiles.getMyProfile()
      setProfile(data.profile)

      // Check if profile completion is sufficient
      if (data.profile?.completion_percentage < 80) {
        setError(`Your profile must be at least 80% complete to generate documents. Current completion: ${data.profile?.completion_percentage || 0}%`)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load your profile. Please try again.')
    } finally {
      setProfileLoading(false)
    }
  }
  
  const documentTitles = {
    SOP: 'Statement of Purpose',
    LOR: 'Letter of Recommendation',
    RESUME: 'Resume/CV',
    COVER_LETTER: 'Cover Letter',
  }
  
  async function handleGenerate() {
    setLoading(true)
    setError(null)

    try {
      const { documents: documentsAPI } = await import('@/lib/api-client')

      const data = await documentsAPI.generate({
        type: documentType.toLowerCase(),
        university: targetUniversity,
        program: targetProgram,
        additional_info: additionalNotes,
      })

      router.push(`/dashboard/documents/${data.document.id}`)
    } catch (error: any) {
      console.error('Error generating document:', error)

      // Extract error message from axios error
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to generate document'
      setError(errorMessage)

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{error}</p>
                {error.includes('profile') && error.includes('complete') && (
                  <Link href="/dashboard/profile" className="inline-flex items-center text-sm font-medium underline underline-offset-4 hover:text-primary">
                    Complete your profile now →
                  </Link>
                )}
              </AlertDescription>
            </Alert>
          )}
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
              {profileLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <h3 className="font-semibold">Review Your Information</h3>

                  <div className="space-y-2 text-sm">
                    {profile?.first_name && profile?.last_name && (
                      <div>
                        <span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}
                      </div>
                    )}
                    {profile?.email && (
                      <div>
                        <span className="font-medium">Email:</span> {profile.email}
                      </div>
                    )}

                    {/* Education - Show array if available, otherwise simple fields */}
                    {profile?.education && profile.education.length > 0 ? (
                      <div>
                        <span className="font-medium">Education:</span>
                        <div className="mt-1 ml-4 space-y-2">
                          {profile.education.map((edu: any, index: number) => (
                            <div key={index} className="text-xs">
                              <div className="font-medium">{edu.degree || edu.qualification}</div>
                              {edu.institution && <div>{edu.institution}</div>}
                              {edu.field_of_study && <div>{edu.field_of_study}</div>}
                              {edu.graduation_year && <div>Graduated: {edu.graduation_year}</div>}
                              {edu.cgpa && <div>CGPA: {edu.cgpa}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {profile?.highest_qualification && (
                          <div>
                            <span className="font-medium">Highest Qualification:</span> {profile.highest_qualification}
                          </div>
                        )}
                        {profile?.institution_name && (
                          <div>
                            <span className="font-medium">Institution:</span> {profile.institution_name}
                          </div>
                        )}
                        {profile?.field_of_study && (
                          <div>
                            <span className="font-medium">Field of Study:</span> {profile.field_of_study}
                          </div>
                        )}
                        {profile?.graduation_year && (
                          <div>
                            <span className="font-medium">Graduation Year:</span> {profile.graduation_year}
                          </div>
                        )}
                        {profile?.cgpa_percentage && (
                          <div>
                            <span className="font-medium">CGPA:</span> {profile.cgpa_percentage}
                          </div>
                        )}
                      </>
                    )}

                    {/* Work Experience */}
                    {profile?.work_experience && profile.work_experience.length > 0 ? (
                      <div>
                        <span className="font-medium">Work Experience:</span>
                        <div className="mt-1 ml-4 space-y-2">
                          {profile.work_experience.map((work: any, index: number) => (
                            <div key={index} className="text-xs">
                              <div className="font-medium">{work.job_title || work.title}</div>
                              {work.company && <div>{work.company}</div>}
                              {work.duration && <div>{work.duration}</div>}
                              {work.description && <div className="text-muted-foreground">{work.description}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : profile?.work_experience_years ? (
                      <div>
                        <span className="font-medium">Work Experience:</span> {profile.work_experience_years}
                      </div>
                    ) : null}

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
              )}
              
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
                <Button
                  onClick={handleGenerate}
                  className="flex-1"
                  disabled={loading || (profile?.completion_percentage && profile.completion_percentage < 80)}
                >
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

              {/* Show helper text if profile incomplete */}
              {profile?.completion_percentage && profile.completion_percentage < 80 && (
                <div className="text-sm text-muted-foreground text-center">
                  Complete your profile to enable document generation
                </div>
              )}
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
