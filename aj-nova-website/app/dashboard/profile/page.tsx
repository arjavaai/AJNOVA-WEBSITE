'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Save,
  CheckCircle2,
  ArrowRight,
  Upload,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Simple profile state matching the spec
interface ProfileData {
  // A. Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  nationality: string
  countryOfResidence: string

  // B. Academic Background
  highestQualification: string
  fieldOfStudy: string
  institutionName: string
  graduationYear: string
  cgpaPercentage: string
  cgpaType: string

  // C. Language & Tests
  englishTestType: string
  englishScore: string
  germanLevel: string
  otherTests: string

  // D. Contact & Preferences
  email: string
  mobileNumber: string
  preferredIntake: string
  studyLevel: string
  preferredProgram: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    countryOfResidence: '',
    highestQualification: '',
    fieldOfStudy: '',
    institutionName: '',
    graduationYear: '',
    cgpaPercentage: '',
    cgpaType: 'CGPA',
    englishTestType: '',
    englishScore: '',
    germanLevel: '',
    otherTests: '',
    email: '',
    mobileNumber: '',
    preferredIntake: '',
    studyLevel: '',
    preferredProgram: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [completion, setCompletion] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('personal')
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
    }
  }, [isAuthenticated])

  useEffect(() => {
    calculateCompletion()
  }, [profile])

  async function checkAuth() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      // Not authenticated, redirect to login
      router.push('/login?redirect=/dashboard/profile')
      return
    }

    setIsAuthenticated(true)
  }

  async function fetchProfile() {
    try {
      const { profiles } = await import('@/lib/api-client')
      const data = await profiles.getMyProfile()

      if (data) {
        setProfile({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          dateOfBirth: data.date_of_birth || '',
          gender: data.gender || '',
          nationality: data.nationality || '',
          countryOfResidence: data.country_of_residence || '',
          highestQualification: data.highest_qualification || '',
          fieldOfStudy: data.field_of_study || '',
          institutionName: data.institution_name || '',
          graduationYear: data.graduation_year?.toString() || '',
          cgpaPercentage: data.cgpa_percentage?.toString() || '',
          cgpaType: data.cgpa_type || 'CGPA',
          englishTestType: data.english_test_type || '',
          englishScore: data.english_score?.toString() || '',
          germanLevel: data.german_level || '',
          otherTests: data.other_tests || '',
          email: data.email || data.phone || '',
          mobileNumber: data.mobile_number || data.phone || '',
          preferredIntake: data.preferred_intake || '',
          studyLevel: data.study_level || '',
          preferredProgram: data.preferred_program || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  function calculateCompletion() {
    const requiredFields = [
      // Personal (6)
      'firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality', 'countryOfResidence',
      // Academic (5)
      'highestQualification', 'fieldOfStudy', 'institutionName', 'graduationYear', 'cgpaPercentage',
      // Language (2)
      'englishTestType', 'germanLevel',
      // Contact (5)
      'email', 'mobileNumber', 'preferredIntake', 'studyLevel', 'preferredProgram'
    ]

    const filled = requiredFields.filter(field => {
      const value = profile[field as keyof ProfileData]
      return value && value.toString().trim() !== ''
    }).length

    setCompletion(Math.round((filled / requiredFields.length) * 100))
  }

  async function handleSave() {
    setSaving(true)
    setSaveMessage(null)

    try {
      const { profiles } = await import('@/lib/api-client')

      const updates = {
        first_name: profile.firstName || null,
        last_name: profile.lastName || null,
        date_of_birth: profile.dateOfBirth || null,
        gender: profile.gender || null,
        nationality: profile.nationality || null,
        country_of_residence: profile.countryOfResidence || null,
        highest_qualification: profile.highestQualification || null,
        field_of_study: profile.fieldOfStudy || null,
        institution_name: profile.institutionName || null,
        graduation_year: profile.graduationYear ? parseInt(profile.graduationYear) : null,
        cgpa_percentage: profile.cgpaPercentage ? parseFloat(profile.cgpaPercentage) : null,
        cgpa_type: profile.cgpaType || null,
        english_test_type: profile.englishTestType || null,
        english_score: profile.englishScore ? parseFloat(profile.englishScore) : null,
        german_level: profile.germanLevel || null,
        other_tests: profile.otherTests || null,
        email: profile.email || null,
        phone: profile.mobileNumber || null,
        mobile_number: profile.mobileNumber || null,
        preferred_intake: profile.preferredIntake || null,
        study_level: profile.studyLevel || null,
        preferred_program: profile.preferredProgram || null
      }

      await profiles.updateMyProfile(updates)
      setSaveMessage({ type: 'success', text: 'Your profile has been successfully saved. You can edit it anytime from your dashboard.' })
      await fetchProfile()
    } catch (error) {
      console.error('Error saving profile:', error)
      setSaveMessage({ type: 'error', text: 'Failed to save profile. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create Your Student Profile</h1>
        <p className="text-muted-foreground">
          This helps us personalize your admissions process and document preparation.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          You can update your details later anytime through your dashboard.
        </p>
      </div>

      {/* Completion Indicator */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold">Profile Completion</h3>
              <p className="text-sm text-muted-foreground">
                {completion < 80
                  ? 'Complete your profile to unlock all features'
                  : completion >= 80 && completion < 100
                  ? 'Your profile is ready for document creation!'
                  : 'Your profile is complete!'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completion}%</div>
            </div>
          </div>
          <Progress value={completion} className="h-3" />

          {completion >= 80 && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your profile is ready for document creation and APS verification!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Save Message */}
      {saveMessage && (
        <Alert className={`mb-6 ${saveMessage.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {saveMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={saveMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {saveMessage.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Form - 4 Accordion Sections */}
      <Accordion type="single" collapsible value={activeSection} onValueChange={setActiveSection} className="space-y-4">

        {/* A. Personal Information */}
        <AccordionItem value="personal">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>A. Personal Information</CardTitle>
                <Badge variant="secondary">Required</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Full Name (First) *</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Full Name (Last) *</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={profile.nationality}
                      onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                      placeholder="e.g., Indian"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="countryOfResidence">Country of Residence *</Label>
                    <Input
                      id="countryOfResidence"
                      value={profile.countryOfResidence}
                      onChange={(e) => setProfile({ ...profile, countryOfResidence: e.target.value })}
                      placeholder="e.g., India"
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* B. Academic Background */}
        <AccordionItem value="academic">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>B. Academic Background</CardTitle>
                <Badge variant="secondary">Required</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Highest Qualification Completed *</Label>
                    <Select
                      value={profile.highestQualification}
                      onValueChange={(value) => setProfile({ ...profile, highestQualification: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH_SCHOOL">High School (12th)</SelectItem>
                        <SelectItem value="DIPLOMA">Diploma</SelectItem>
                        <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                        <SelectItem value="MASTERS">Master's Degree</SelectItem>
                        <SelectItem value="PHD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                    <Input
                      id="fieldOfStudy"
                      value={profile.fieldOfStudy}
                      onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value })}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name *</Label>
                    <Input
                      id="institutionName"
                      value={profile.institutionName}
                      onChange={(e) => setProfile({ ...profile, institutionName: e.target.value })}
                      placeholder="e.g., University of XYZ"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      value={profile.graduationYear}
                      onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                      placeholder="2023"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Score Type *</Label>
                    <Select
                      value={profile.cgpaType}
                      onValueChange={(value) => setProfile({ ...profile, cgpaType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CGPA">CGPA</SelectItem>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpaPercentage">
                      {profile.cgpaType === 'CGPA' ? 'CGPA *' : 'Percentage *'}
                    </Label>
                    <Input
                      id="cgpaPercentage"
                      type="number"
                      step="0.01"
                      value={profile.cgpaPercentage}
                      onChange={(e) => setProfile({ ...profile, cgpaPercentage: e.target.value })}
                      placeholder={profile.cgpaType === 'CGPA' ? '7.5' : '75'}
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* C. Language & Tests */}
        <AccordionItem value="language">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>C. Language & Tests</CardTitle>
                <Badge variant="secondary">Required</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>English Proficiency *</Label>
                    <Select
                      value={profile.englishTestType}
                      onValueChange={(value) => setProfile({ ...profile, englishTestType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IELTS">IELTS</SelectItem>
                        <SelectItem value="TOEFL">TOEFL</SelectItem>
                        <SelectItem value="DUOLINGO">Duolingo</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="NONE">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {profile.englishTestType && profile.englishTestType !== 'NONE' && profile.englishTestType !== 'PENDING' && (
                    <div className="space-y-2">
                      <Label htmlFor="englishScore">
                        {profile.englishTestType} Score
                      </Label>
                      <Input
                        id="englishScore"
                        type="number"
                        step="0.5"
                        value={profile.englishScore}
                        onChange={(e) => setProfile({ ...profile, englishScore: e.target.value })}
                        placeholder={profile.englishTestType === 'IELTS' ? '7.0' : '100'}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>German Language Level *</Label>
                    <Select
                      value={profile.germanLevel}
                      onValueChange={(value) => setProfile({ ...profile, germanLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select German level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="A1">A1 (Beginner)</SelectItem>
                        <SelectItem value="A2">A2 (Elementary)</SelectItem>
                        <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                        <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                        <SelectItem value="C1">C1 (Advanced)</SelectItem>
                        <SelectItem value="C2">C2 (Proficient)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherTests">Other Relevant Exams (Optional)</Label>
                    <Input
                      id="otherTests"
                      value={profile.otherTests}
                      onChange={(e) => setProfile({ ...profile, otherTests: e.target.value })}
                      placeholder="e.g., GRE, GMAT"
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* D. Contact & Preferences */}
        <AccordionItem value="contact">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>D. Contact & Preferences</CardTitle>
                <Badge variant="secondary">Required</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={profile.mobileNumber}
                      onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Intake *</Label>
                    <Select
                      value={profile.preferredIntake}
                      onValueChange={(value) => setProfile({ ...profile, preferredIntake: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WINTER_2025">Winter 2025</SelectItem>
                        <SelectItem value="SUMMER_2026">Summer 2026</SelectItem>
                        <SelectItem value="WINTER_2026">Winter 2026</SelectItem>
                        <SelectItem value="SUMMER_2027">Summer 2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Study Level *</Label>
                    <Select
                      value={profile.studyLevel}
                      onValueChange={(value) => setProfile({ ...profile, studyLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select study level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BACHELORS">Bachelor's</SelectItem>
                        <SelectItem value="MASTERS">Master's</SelectItem>
                        <SelectItem value="PHD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredProgram">Preferred Program *</Label>
                  <Input
                    id="preferredProgram"
                    value={profile.preferredProgram}
                    onChange={(e) => setProfile({ ...profile, preferredProgram: e.target.value })}
                    placeholder="e.g., Data Science, Mechanical Engineering"
                  />
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Upload Documents (Optional) */}
        <AccordionItem value="documents">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>Upload Documents (Optional)</CardTitle>
                <Badge variant="outline">Optional</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  You can upload these documents now or later from your dashboard.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label>Passport (PDF or JPG)</Label>
                      <p className="text-xs text-muted-foreground">No file chosen</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label>Academic Transcripts (PDF)</Label>
                      <p className="text-xs text-muted-foreground">No file chosen</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label>Language Certificates (PDF)</Label>
                      <p className="text-xs text-muted-foreground">No file chosen</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB per file)
                </p>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSave}
          size="lg"
          className="flex-1"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          )}
        </Button>

        {completion >= 80 && (
          <Button size="lg" className="flex-1" variant="default" asChild>
            <Link href="/dashboard/aps-form">
              Continue to APS Form
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>

      {completion < 80 && (
        <p className="text-sm text-center text-muted-foreground mt-4">
          Complete at least 80% of your profile to proceed to the next step.
        </p>
      )}
    </div>
  )
}
