'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, CheckCircle, Clock, Building2, FileCheck, Loader2, Calendar as CalendarIcon, Download } from 'lucide-react'
import Link from 'next/link'
import { APSForm } from '@/lib/aps-types'
import { Consultation } from '@/lib/consultation-types'
import { ProgressTracker } from '@/components/progress-tracker'
import { RecentActivity, NotificationsPanel } from '@/components/recent-activity'
import { QuickStats, ProfileSummaryCard, EligibilityCard, UpcomingEvents } from '@/components/dashboard-widgets'
import { createConsultationEvent, exportConsultationToCalendar, addToGoogleCalendar } from '@/lib/calendar-export'

export default function DashboardPage() {
  const [apsForm, setApsForm] = useState<APSForm | null>(null)
  const [loadingAPS, setLoadingAPS] = useState(true)
  const [upcomingConsultations, setUpcomingConsultations] = useState<Consultation[]>([])
  const [loadingConsultations, setLoadingConsultations] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    try {
      await Promise.all([
        fetchAPSStatus(),
        fetchUpcomingConsultations(),
        fetchProfile(),
        fetchStats()
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchProfile() {
    try {
      const { profiles } = await import('@/lib/api-client')
      const data = await profiles.getMyProfile()
      setProfile(data.profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  async function fetchStats() {
    try {
      const { applications, documents } = await import('@/lib/api-client')
      const [appsData, docsData] = await Promise.all([
        applications.list(true),
        documents.list()
      ])

      setStats({
        applicationsSubmitted: appsData.stats?.total || 0,
        documentsUploaded: docsData.documents?.length || 0,
        documentsApproved: docsData.documents?.filter((d: any) => d.status === 'APPROVED').length || 0,
        apsStatus: apsForm?.status || 'Not Started',
        profileCompletion: profile?.completion_percentage || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  async function fetchAPSStatus() {
    try {
      const { aps } = await import('@/lib/api-client')
      const data = await aps.get()
      setApsForm(data.form)
    } catch (error) {
      console.error('Error fetching APS status:', error)
    } finally {
      setLoadingAPS(false)
    }
  }

  async function fetchUpcomingConsultations() {
    try {
      const { consultations } = await import('@/lib/api-client')
      const data = await consultations.list('upcoming')
      setUpcomingConsultations((data.consultations || []).map((c: any) => ({
        ...c,
        date: new Date(c.scheduled_date || c.date)
      })))
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoadingConsultations(false)
    }
  }
  
  function getAPSStatusBadge(status: string) {
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

  function handleExportConsultation(consultation: Consultation) {
    const startDate = new Date(consultation.date)
    const [hours, minutes] = consultation.time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))

    const event = createConsultationEvent({
      id: consultation.id,
      scheduled_date: startDate,
      duration_minutes: consultation.duration || 30,
      consultation_type: consultation.type,
      counsellor_name: consultation.counsellorName,
      notes: consultation.topic,
      meeting_link: consultation.meetingLink,
    })

    exportConsultationToCalendar(event)
  }

  function handleAddToGoogleCalendar(consultation: Consultation) {
    const startDate = new Date(consultation.date)
    const [hours, minutes] = consultation.time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))

    const event = createConsultationEvent({
      id: consultation.id,
      scheduled_date: startDate,
      duration_minutes: consultation.duration || 30,
      consultation_type: consultation.type,
      counsellor_name: consultation.counsellorName,
      notes: consultation.topic,
      meeting_link: consultation.meetingLink,
    })

    addToGoogleCalendar(event)
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const studentName = profile?.first_name || profile?.last_name
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    : 'Student'

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {studentName}!</h1>
        <p className="text-muted-foreground">
          Your application progress is automatically saved. Continue from where you left off.
        </p>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.applicationsSubmitted}</div>
              <p className="text-xs text-muted-foreground">
                University applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.documentsUploaded}</div>
              <p className="text-xs text-muted-foreground">
                Uploaded documents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.documentsApproved}</div>
              <p className="text-xs text-muted-foreground">
                Documents approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.profileCompletion}%</div>
              <p className="text-xs text-muted-foreground">
                Profile completion
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Old Stats Cards - Kept for backward compatibility */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 hidden">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              University applications
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              SOP, LOR, Resume, Cover Letter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Applications & documents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground">
              Congratulations!
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Consultations */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Consultations</CardTitle>
              <CardDescription>Your scheduled meetings with counsellors</CardDescription>
            </div>
            <Link href="/dashboard/consultations">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loadingConsultations ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : upcomingConsultations.length > 0 ? (
            <div className="space-y-3">
              {upcomingConsultations.slice(0, 2).map((consultation) => (
                <div 
                  key={consultation.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{consultation.counsellorName}</p>
                      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                        {new Date(consultation.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })} at {consultation.time}
                      </p>
                      {consultation.topic && (
                        <p className="text-xs text-muted-foreground mt-1">{consultation.topic}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExportConsultation(consultation)}
                      title="Download .ics file"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Link href="/dashboard/consultations">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
              <p className="text-sm text-muted-foreground mb-3">No upcoming consultations</p>
              <Link href="/dashboard/consultations">
                <Button size="sm">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* APS Verification Status */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>APS Verification</CardTitle>
              <CardDescription>Track your APS application status</CardDescription>
            </div>
            {!loadingAPS && apsForm && getAPSStatusBadge(apsForm.status)}
          </div>
        </CardHeader>
        <CardContent>
          {loadingAPS ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : apsForm ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Form Completion</p>
                    <p className="text-sm text-muted-foreground">
                      {apsForm.completionPercentage}% complete
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/aps-form">
                  <Button>
                    {apsForm.status === 'NOT_STARTED' || apsForm.status === 'DRAFT' 
                      ? 'Continue Form' 
                      : 'View Form'}
                  </Button>
                </Link>
              </div>
              
              {apsForm.status === 'NEEDS_CORRECTION' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-900 mb-1">Action Required</p>
                  <p className="text-sm text-amber-800">
                    Your APS form requires corrections. Please review counsellor comments and update your submission.
                  </p>
                </div>
              )}
              
              {apsForm.status === 'VERIFIED' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-1">Verified Successfully!</p>
                  <p className="text-sm text-green-800">
                    Your APS documents have been verified. You can now proceed with university applications.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Unable to load APS status</p>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Continue your application journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/aps-form" className="block">
              <Button className="w-full h-auto py-4 flex-col gap-2" size="lg">
                <FileCheck className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Continue APS Form</div>
                  <div className="text-xs opacity-90">{stats?.apsStatus || 'Not Started'}</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/consultations" className="block">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" size="lg">
                <CalendarIcon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Book Consultation</div>
                  <div className="text-xs opacity-70">Free expert guidance</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/documents" className="block">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" size="lg">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Generate Documents</div>
                  <div className="text-xs opacity-70">AI-powered SOP, LOR</div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/applications" className="block">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" size="lg">
                <Building2 className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">View Applications</div>
                  <div className="text-xs opacity-70">{stats?.applicationsSubmitted || 0} submitted</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
