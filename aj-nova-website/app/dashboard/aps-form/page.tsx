'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, Save } from 'lucide-react'
import { APSForm } from '@/lib/aps-types'
import { useRouter } from 'next/navigation'

function getStatusBadge(status: string) {
  const config: Record<string, { variant: any; label: string }> = {
    NOT_STARTED: { variant: 'outline', label: 'Not Started' },
    DRAFT: { variant: 'secondary', label: 'Draft' },
    SUBMITTED: { variant: 'default', label: 'Submitted' },
    UNDER_REVIEW: { variant: 'warning', label: 'Under Review' },
    VERIFIED: { variant: 'success', label: 'Verified' },
    NEEDS_CORRECTION: { variant: 'destructive', label: 'Needs Correction' },
    REJECTED: { variant: 'destructive', label: 'Rejected' },
  }
  
  return <Badge variant={config[status]?.variant}>{config[status]?.label}</Badge>
}

export default function APSFormPage() {
  const router = useRouter()
  const [form, setForm] = useState<APSForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    fetchForm()
  }, [])
  
  async function fetchForm() {
    try {
      const response = await fetch('/api/aps?studentId=1')
      const data = await response.json()
      setForm(data.form)
    } catch (error) {
      console.error('Error fetching APS form:', error)
    } finally {
      setLoading(false)
    }
  }
  
  async function handleSave() {
    if (!form) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/aps?studentId=1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'DRAFT' })
      })
      
      const data = await response.json()
      setForm(data.form)
      alert('Progress saved!')
    } catch (error) {
      console.error('Error saving form:', error)
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }
  
  async function handleSubmit() {
    if (!form || !form.declarationAccepted) {
      alert('Please complete all required fields and accept the declaration')
      return
    }
    
    setSubmitting(true)
    try {
      const response = await fetch('/api/aps?studentId=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      const data = await response.json()
      setForm(data.form)
      alert('APS form submitted successfully! Our team will review your information.')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }
  
  function updateForm(updates: Partial<APSForm>) {
    if (!form) return
    setForm({ ...form, ...updates })
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  if (!form) {
    return <div>Form not found</div>
  }
  
  const isSubmitted = ['SUBMITTED', 'UNDER_REVIEW', 'VERIFIED'].includes(form.status)
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">APS Verification Form</h1>
            <p className="text-muted-foreground">
              This form helps AJ NOVA gather all information needed for APS verification
            </p>
          </div>
          {getStatusBadge(form.status)}
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <a 
            href="https://aps-india.de" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Visit Official APS Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This form is for data collection only and does not replace the official APS submission process. 
              Our team will review your information and guide you through the official submission.
            </p>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Form Completion</span>
            <span className="text-sm text-muted-foreground">{form.completionPercentage}%</span>
          </div>
          <Progress value={form.completionPercentage} />
        </div>
      </div>
      
      {/* Form Sections */}
      <Accordion type="multiple" defaultValue={['personal']} className="space-y-4">
        {/* Section 1: Personal Details */}
        <AccordionItem value="personal">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              1. Personal & Identification Details
              {form.personalDetails.fullName && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as in passport) *</Label>
                <Input
                  id="fullName"
                  value={form.personalDetails.fullName}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, fullName: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={form.personalDetails.dateOfBirth ? new Date(form.personalDetails.dateOfBirth).toISOString().split('T')[0] : ''}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, dateOfBirth: new Date(e.target.value) }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={form.personalDetails.gender}
                  onValueChange={(value: any) => updateForm({ 
                    personalDetails: { ...form.personalDetails, gender: value }
                  })}
                  disabled={isSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={form.personalDetails.nationality}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, nationality: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  value={form.personalDetails.passportNumber}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, passportNumber: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Passport Expiry Date *</Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={form.personalDetails.passportExpiryDate ? new Date(form.personalDetails.passportExpiryDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, passportExpiryDate: new Date(e.target.value) }
                  })}
                  disabled={isSubmitted}
                />
                {form.personalDetails.passportExpiryDate && 
                 new Date(form.personalDetails.passportExpiryDate) < new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Passport expires in less than 6 months
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.personalDetails.email}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, email: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={form.personalDetails.mobileNumber}
                  onChange={(e) => updateForm({ 
                    personalDetails: { ...form.personalDetails, mobileNumber: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 2: Secondary Education */}
        <AccordionItem value="secondary">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              2. Secondary & Higher Secondary Education
              {form.secondaryEducation.grade10SchoolName && form.secondaryEducation.grade12SchoolName && 
                <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-4">
              <div>
                <h4 className="font-semibold mb-4">10th Grade Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School Name *</Label>
                    <Input
                      value={form.secondaryEducation.grade10SchoolName}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade10SchoolName: e.target.value }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Year of Completion *</Label>
                    <Input
                      type="number"
                      value={form.secondaryEducation.grade10Year}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade10Year: parseInt(e.target.value) }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Marks / Percentage *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={form.secondaryEducation.grade10Marks}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade10Marks: parseFloat(e.target.value) }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Board (Optional)</Label>
                    <Input
                      value={form.secondaryEducation.grade10Board || ''}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade10Board: e.target.value }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">12th Grade Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School Name *</Label>
                    <Input
                      value={form.secondaryEducation.grade12SchoolName}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade12SchoolName: e.target.value }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Year of Completion *</Label>
                    <Input
                      type="number"
                      value={form.secondaryEducation.grade12Year}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade12Year: parseInt(e.target.value) }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Marks / Percentage *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={form.secondaryEducation.grade12Marks}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade12Marks: parseFloat(e.target.value) }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Board (Optional)</Label>
                    <Input
                      value={form.secondaryEducation.grade12Board || ''}
                      onChange={(e) => updateForm({ 
                        secondaryEducation: { ...form.secondaryEducation, grade12Board: e.target.value }
                      })}
                      disabled={isSubmitted}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 3: Higher Education */}
        <AccordionItem value="higher">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              3. Higher Education (Bachelor/Master)
              {form.higherEducation.degreeAwarded && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label>Degree Awarded *</Label>
                <Input
                  placeholder="e.g., B.Tech, BBA, M.Sc."
                  value={form.higherEducation.degreeAwarded}
                  onChange={(e) => updateForm({ 
                    higherEducation: { ...form.higherEducation, degreeAwarded: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>University / Institution Name *</Label>
                <Input
                  value={form.higherEducation.universityName}
                  onChange={(e) => updateForm({ 
                    higherEducation: { ...form.higherEducation, universityName: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Country of Education *</Label>
                <Input
                  value={form.higherEducation.countryOfEducation}
                  onChange={(e) => updateForm({ 
                    higherEducation: { ...form.higherEducation, countryOfEducation: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Final Grade / Percentage *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.higherEducation.finalGrade}
                  onChange={(e) => updateForm({ 
                    higherEducation: { ...form.higherEducation, finalGrade: parseFloat(e.target.value) }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Medium of Instruction *</Label>
                <Select
                  value={form.higherEducation.mediumOfInstruction}
                  onValueChange={(value: any) => updateForm({ 
                    higherEducation: { ...form.higherEducation, mediumOfInstruction: value }
                  })}
                  disabled={isSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="GERMAN">German</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Backlogs (Optional)</Label>
                <Input
                  type="number"
                  value={form.higherEducation.backlogs || 0}
                  onChange={(e) => updateForm({ 
                    higherEducation: { ...form.higherEducation, backlogs: parseInt(e.target.value) }
                  })}
                  disabled={isSubmitted}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 4: Language Scores */}
        <AccordionItem value="language">
          <AccordionTrigger className="text-lg font-semibold">
            4. Language & Test Scores
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label>English Test</Label>
                <Select
                  value={form.languageTestScores.englishTest || 'NONE'}
                  onValueChange={(value: any) => updateForm({ 
                    languageTestScores: { ...form.languageTestScores, englishTest: value }
                  })}
                  disabled={isSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">None</SelectItem>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                    <SelectItem value="TOEFL">TOEFL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {form.languageTestScores.englishTest && form.languageTestScores.englishTest !== 'NONE' && (
                <div className="space-y-2">
                  <Label>English Score</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={form.languageTestScores.englishScore || ''}
                    onChange={(e) => updateForm({ 
                      languageTestScores: { ...form.languageTestScores, englishScore: parseFloat(e.target.value) }
                    })}
                    disabled={isSubmitted}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>German Language Level *</Label>
                <Select
                  value={form.languageTestScores.germanLevel}
                  onValueChange={(value: any) => updateForm({ 
                    languageTestScores: { ...form.languageTestScores, germanLevel: value }
                  })}
                  disabled={isSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">None</SelectItem>
                    <SelectItem value="A1">A1</SelectItem>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                    <SelectItem value="C1">C1</SelectItem>
                    <SelectItem value="C2">C2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 5: University Preferences */}
        <AccordionItem value="preferences">
          <AccordionTrigger className="text-lg font-semibold">
            5. University Preferences & Intake
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4 pt-4">
              <div className="space-y-2">
                <Label>Preferred University 1 (Optional)</Label>
                <Input
                  value={form.universityPreferences.preferredUniversity1 || ''}
                  onChange={(e) => updateForm({ 
                    universityPreferences: { ...form.universityPreferences, preferredUniversity1: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Preferred University 2 (Optional)</Label>
                <Input
                  value={form.universityPreferences.preferredUniversity2 || ''}
                  onChange={(e) => updateForm({ 
                    universityPreferences: { ...form.universityPreferences, preferredUniversity2: e.target.value }
                  })}
                  disabled={isSubmitted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Intake *</Label>
                <Select
                  value={form.universityPreferences.preferredIntake}
                  onValueChange={(value) => updateForm({ 
                    universityPreferences: { ...form.universityPreferences, preferredIntake: value }
                  })}
                  disabled={isSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WINTER_2025">Winter 2025</SelectItem>
                    <SelectItem value="SUMMER_2026">Summer 2026</SelectItem>
                    <SelectItem value="WINTER_2026">Winter 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 6: Declaration */}
        <AccordionItem value="declaration">
          <AccordionTrigger className="text-lg font-semibold">
            6. Declaration
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="declaration"
                  checked={form.declarationAccepted}
                  onCheckedChange={(checked) => updateForm({ declarationAccepted: checked as boolean })}
                  disabled={isSubmitted}
                />
                <Label htmlFor="declaration" className="text-sm leading-relaxed cursor-pointer">
                  I confirm that the information provided is true and that AJ NOVA may use these details 
                  to assist with my APS verification process.
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Action Buttons */}
      {!isSubmitted && (
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="outline"
            className="flex-1"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={submitting || !form.declarationAccepted}
            className="flex-1"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit APS Details'
            )}
          </Button>
        </div>
      )}
      
      {isSubmitted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Form Submitted Successfully!</h3>
                <p className="text-sm text-green-800">
                  Thank you! Your APS details have been submitted. Our verification team will contact you soon.
                </p>
                {form.submittedAt && (
                  <p className="text-xs text-green-700 mt-2">
                    Submitted on: {new Date(form.submittedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
