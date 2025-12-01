'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Save,
  CheckCircle2,
  ArrowRight,
  Download,
  Upload,
  Plus,
  Trash2,
  Calendar as CalendarIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockProfile, getProfileSections, calculateProfileCompletion } from '@/lib/profile-mock-data'
import { StudentProfile, COUNTRIES, FIELDS_OF_STUDY } from '@/lib/profile-types'
import Link from 'next/link'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<StudentProfile>>(mockProfile)
  const [activeSection, setActiveSection] = useState<string>('personal')
  const sections = getProfileSections(profile)
  const completion = calculateProfileCompletion(profile)

  function handleSave() {
    // Save profile to backend
    console.log('Saving profile:', profile)
    alert('Profile saved successfully!')
  }

  function addEducation() {
    const newEducation = {
      id: Math.random().toString(36).substr(2, 9),
      level: null,
      fieldOfStudy: '',
      institution: '',
      country: '',
      graduationYear: null,
      scoreType: 'CGPA' as const,
      score: null,
      mediumOfInstruction: '',
      isPrimary: false
    }
    setProfile({
      ...profile,
      education: [...(profile.education || []), newEducation]
    })
  }

  function removeEducation(id: string) {
    setProfile({
      ...profile,
      education: profile.education?.filter(e => e.id !== id)
    })
  }

  function addWorkExperience() {
    const newWork = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      startDate: null,
      endDate: null,
      isCurrent: false,
      description: ''
    }
    setProfile({
      ...profile,
      workExperience: [...(profile.workExperience || []), newWork]
    })
  }

  function removeWorkExperience(id: string) {
    setProfile({
      ...profile,
      workExperience: profile.workExperience?.filter(w => w.id !== id)
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>

        {/* Completion Indicator */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold">Profile Completion</h3>
                <p className="text-sm text-muted-foreground">
                  {completion < 80 ? 'Complete your profile to unlock all features' : 
                   completion < 100 ? 'Almost there! Just a few more fields' :
                   'Your profile is complete! 🎉'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completion}%</div>
              </div>
            </div>
            <Progress value={completion} className="h-3" />
            
            {/* Section Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {sections.map((section) => (
                <div key={section.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground">{section.title}</span>
                    {section.completionPercentage === 100 ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">{section.completionPercentage}%</span>
                    )}
                  </div>
                  <Progress value={section.completionPercentage} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Sections */}
      <Accordion type="single" collapsible value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        {/* Personal Information */}
        <AccordionItem value="personal">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>Personal Information</CardTitle>
                <Badge variant={sections[0].completionPercentage === 100 ? "default" : "secondary"}>
                  {sections[0].completionPercentage}%
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={profile.personalInfo?.firstName || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={profile.personalInfo?.middleName || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, middleName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profile.personalInfo?.lastName || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, lastName: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select
                      value={profile.personalInfo?.gender || undefined}
                      onValueChange={(value: any) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, gender: value }
                      })}
                    >
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

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profile.personalInfo?.dateOfBirth?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, dateOfBirth: new Date(e.target.value) }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nationality *</Label>
                    <Select
                      value={profile.personalInfo?.nationality || undefined}
                      onValueChange={(value) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, nationality: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Country of Residence *</Label>
                    <Select
                      value={profile.personalInfo?.countryOfResidence || undefined}
                      onValueChange={(value) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, countryOfResidence: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passport">Passport Number *</Label>
                    <Input
                      id="passport"
                      value={profile.personalInfo?.passportNumber || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, passportNumber: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportExpiry">Passport Expiry *</Label>
                    <Input
                      id="passportExpiry"
                      type="date"
                      value={profile.personalInfo?.passportExpiry?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo!, passportExpiry: new Date(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Academic Background */}
        <AccordionItem value="education">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>Academic Background</CardTitle>
                <Badge variant={sections[1].completionPercentage === 100 ? "default" : "secondary"}>
                  {sections[1].completionPercentage}%
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-6">
                {profile.education?.map((edu, index) => (
                  <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{edu.isPrimary ? 'Primary Education' : `Additional Education ${index}`}</h4>
                      {!edu.isPrimary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Qualification Level *</Label>
                        <Select
                          value={edu.level || undefined}
                          onValueChange={(value: any) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, level: value } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                            <SelectItem value="DIPLOMA">Diploma</SelectItem>
                            <SelectItem value="BACHELORS">Bachelor's</SelectItem>
                            <SelectItem value="MASTERS">Master's</SelectItem>
                            <SelectItem value="PHD">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Field of Study *</Label>
                        <Input
                          value={edu.fieldOfStudy}
                          onChange={(e) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, fieldOfStudy: e.target.value } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Institution Name *</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, institution: e.target.value } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Country *</Label>
                        <Select
                          value={edu.country || undefined}
                          onValueChange={(value) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, country: value } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map(country => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Graduation Year *</Label>
                        <Input
                          type="number"
                          value={edu.graduationYear || ''}
                          onChange={(e) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, graduationYear: parseInt(e.target.value) } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                          placeholder="2020"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Score Type *</Label>
                        <RadioGroup
                          value={edu.scoreType}
                          onValueChange={(value: any) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, scoreType: value } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                        >
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="CGPA" id={`cgpa-${edu.id}`} />
                              <Label htmlFor={`cgpa-${edu.id}`}>CGPA</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="PERCENTAGE" id={`percentage-${edu.id}`} />
                              <Label htmlFor={`percentage-${edu.id}`}>Percentage</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Score *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={edu.score || ''}
                          onChange={(e) => {
                            const updated = profile.education?.map(e =>
                              e.id === edu.id ? { ...e, score: parseFloat(e.target.value) } : e
                            )
                            setProfile({ ...profile, education: updated })
                          }}
                          placeholder={edu.scoreType === 'CGPA' ? '7.5' : '75'}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={addEducation} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Degree
                </Button>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Contact & Preferences */}
        <AccordionItem value="contact">
          <Card>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <CardTitle>Contact & Preferences</CardTitle>
                <Badge variant={sections[5].completionPercentage === 100 ? "default" : "secondary"}>
                  {sections[5].completionPercentage}%
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.contactPreferences?.email || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        contactPreferences: { ...profile.contactPreferences!, email: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={profile.contactPreferences?.mobileNumber || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        contactPreferences: { ...profile.contactPreferences!, mobileNumber: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Intake *</Label>
                    <Select
                      value={profile.contactPreferences?.preferredIntake || undefined}
                      onValueChange={(value: any) => setProfile({
                        ...profile,
                        contactPreferences: { ...profile.contactPreferences!, preferredIntake: value }
                      })}
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
                      value={profile.contactPreferences?.studyLevel || undefined}
                      onValueChange={(value: any) => setProfile({
                        ...profile,
                        contactPreferences: { ...profile.contactPreferences!, studyLevel: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BACHELORS">Bachelor's</SelectItem>
                        <SelectItem value="MASTERS">Master's</SelectItem>
                        <SelectItem value="PHD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Preferred Program</Label>
                    <Input
                      id="program"
                      value={profile.contactPreferences?.preferredProgram || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        contactPreferences: { ...profile.contactPreferences!, preferredProgram: e.target.value }
                      })}
                      placeholder="e.g., Data Science"
                    />
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button onClick={handleSave} size="lg" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
        {completion >= 80 && (
          <Button size="lg" className="flex-1" asChild>
            <Link href="/dashboard/aps-form">
              Continue to APS Form
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
