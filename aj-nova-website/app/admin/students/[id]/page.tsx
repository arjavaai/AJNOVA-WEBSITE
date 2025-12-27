'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  MessageSquare,
  Loader2,
  User,
  BookOpen,
  Briefcase,
  Globe,
  Award
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  phone?: string
  status: string
  created_at: string
  last_sign_in_at?: string
  profile?: {
    first_name?: string
    last_name?: string
    date_of_birth?: string
    nationality?: string
    mobile_number?: string
    country?: string
    city?: string
    address?: string
    highest_qualification?: string
    field_of_study?: string
    institution_name?: string
    graduation_year?: number
    cgpa_percentage?: number
    cgpa_type?: string
    english_test_type?: string
    english_score?: number
    german_level?: string
    work_experience?: any[]
    completion_percentage?: number
    preferred_intake?: string
    study_level?: string
    preferred_program?: string
  }
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudentDetails()
  }, [params.id])

  async function fetchStudentDetails() {
    try {
      setLoading(true)
      const { admin } = await import('@/lib/api-client')
      const data = await admin.getStudents()
      
      const foundStudent = data.students?.find((s: Student) => s.id === params.id)
      
      if (!foundStudent) {
        setError('Student not found')
        return
      }
      
      setStudent(foundStudent)
    } catch (err) {
      console.error('Error fetching student:', err)
      setError('Failed to load student details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{error || 'Student not found'}</h2>
          <Button onClick={() => router.push('/admin/students')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Button>
        </div>
      </div>
    )
  }

  const profile = student.profile || {}

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push('/admin/students')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {profile.first_name && profile.last_name 
                ? `${profile.first_name} ${profile.last_name}`
                : student.name || 'Student Profile'}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {student.email}
              </span>
              {profile.mobile_number && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {profile.mobile_number}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/messages?student=${student.id}`}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Link>
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              View Documents
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <Badge className={student.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
              {student.status?.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Profile Completion</div>
            <div className="flex items-center gap-2">
              <Progress value={profile.completion_percentage || 0} className="flex-1" />
              <span className="text-sm font-medium">{profile.completion_percentage || 0}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Joined</div>
            <div className="font-medium">
              {new Date(student.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Last Active</div>
            <div className="font-medium">
              {student.last_sign_in_at
                ? new Date(student.last_sign_in_at).toLocaleDateString()
                : 'Never'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="academic">
            <GraduationCap className="w-4 h-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="w-4 h-4 mr-2" />
            Language Tests
          </TabsTrigger>
          <TabsTrigger value="experience">
            <Briefcase className="w-4 h-4 mr-2" />
            Experience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Student's personal and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <div className="mt-1">
                    {profile.first_name || profile.last_name
                      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
                      : student.name || 'Not provided'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <div className="mt-1">
                    {profile.date_of_birth
                      ? new Date(profile.date_of_birth).toLocaleDateString()
                      : 'Not provided'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="mt-1">{student.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="mt-1">{profile.mobile_number || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                  <div className="mt-1">{profile.nationality || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <div className="mt-1">{profile.country || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <div className="mt-1">{profile.city || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <div className="mt-1">{profile.address || 'Not provided'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Background</CardTitle>
              <CardDescription>Educational qualifications and academic records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Highest Qualification</label>
                  <div className="mt-1">{profile.highest_qualification || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Field of Study</label>
                  <div className="mt-1">{profile.field_of_study || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Institution</label>
                  <div className="mt-1">{profile.institution_name || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                  <div className="mt-1">{profile.graduation_year || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CGPA/Percentage</label>
                  <div className="mt-1">
                    {profile.cgpa_percentage
                      ? `${profile.cgpa_percentage}${profile.cgpa_type ? ` (${profile.cgpa_type})` : ''}`
                      : 'Not provided'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Preferred Study Level</label>
                  <div className="mt-1">{profile.study_level || 'Not provided'}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Preferred Program</label>
                  <div className="mt-1">{profile.preferred_program || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Preferred Intake</label>
                  <div className="mt-1">{profile.preferred_intake || 'Not provided'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language Proficiency</CardTitle>
              <CardDescription>English and German test scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">English Test Type</label>
                  <div className="mt-1">{profile.english_test_type || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">English Score</label>
                  <div className="mt-1">{profile.english_score || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">German Level</label>
                  <div className="mt-1">{profile.german_level || 'Not provided'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Professional work history</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.work_experience && Array.isArray(profile.work_experience) && profile.work_experience.length > 0 ? (
                <div className="space-y-4">
                  {profile.work_experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="font-medium">{exp.position || 'Position'}</h4>
                      <div className="text-sm text-muted-foreground">
                        {exp.company || 'Company'} • {exp.duration || 'Duration'}
                      </div>
                      {exp.description && (
                        <p className="text-sm mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No work experience added yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}





