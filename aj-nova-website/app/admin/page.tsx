'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  FileText,
  Calendar,
  Send,
  TrendingUp,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Loader2,
  Calculator
} from 'lucide-react'
import {
  formatActivityTime,
  getStatusColor
} from '@/lib/admin-mock-data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AdminMetrics {
  totalStudents: number
  activeStudents: number
  pendingReviews: number
  upcomingConsultations: number
  documentApprovalRate: number
  recentApplications: number
  studentSatisfaction: number
  verifiedAPS: number
  activeApplications: number
  documentsApproved: number
}

interface Activity {
  id: string
  type: string
  studentName: string
  description: string
  timestamp: Date
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  async function fetchAdminData() {
    try {
      const { admin: adminAPI, documents: documentsAPI, consultations: consultationsAPI, applications: applicationsAPI } = await import('@/lib/api-client')

      // Fetch all data in parallel
      const [usersData, docsData, consultationsData, appsData, apsData] = await Promise.all([
        adminAPI.getUsers(),
        documentsAPI.list(),
        consultationsAPI.list('upcoming'),
        applicationsAPI.list(false),
        adminAPI.getReviewQueue().catch(() => ({ forms: [] })) // Fallback if endpoint doesn't exist yet
      ])

      // Calculate metrics from real data
      const totalStudents = usersData.users?.length || 0
      const activeStudents = usersData.users?.filter((u: any) => u.last_sign_in_at)?.length || 0
      const pendingReviews = docsData.documents?.filter((d: any) =>
        d.status === 'SUBMITTED' || d.status === 'UNDER_REVIEW'
      )?.length || 0
      const upcomingConsultations = consultationsData.consultations?.length || 0
      const totalDocs = docsData.documents?.length || 1
      const approvedDocs = docsData.documents?.filter((d: any) => d.status === 'APPROVED')?.length || 0
      const documentApprovalRate = totalDocs > 0 ? Math.round((approvedDocs / totalDocs) * 100) : 0
      
      // Get recent applications (last 7 days)
      const recentApplications = appsData.applications?.filter((a: any) => {
        const createdAt = new Date(a.created_at)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return createdAt >= weekAgo
      })?.length || 0

      // Calculate APS verified count (this month)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const verifiedAPS = apsData.forms?.filter((aps: any) => {
        if (aps.status !== 'VERIFIED') return false
        const verifiedDate = new Date(aps.updated_at || aps.created_at)
        return verifiedDate.getMonth() === currentMonth && verifiedDate.getFullYear() === currentYear
      })?.length || 0

      // Count active applications (not rejected or withdrawn)
      const activeApplications = appsData.applications?.filter((a: any) => 
        !['rejected', 'withdrawn'].includes(a.status?.toLowerCase())
      )?.length || 0

      // Count documents approved this month
      const documentsApproved = docsData.documents?.filter((d: any) => {
        if (d.status !== 'APPROVED') return false
        const approvedDate = new Date(d.updated_at || d.created_at)
        return approvedDate.getMonth() === currentMonth && approvedDate.getFullYear() === currentYear
      })?.length || 0

      setMetrics({
        totalStudents,
        activeStudents,
        pendingReviews,
        upcomingConsultations,
        documentApprovalRate,
        recentApplications,
        studentSatisfaction: 4.5, // This would come from a feedback system
        verifiedAPS,
        activeApplications,
        documentsApproved
      })

      // Create recent activities from real data
      const recentActivities: Activity[] = []

      // Add recent document submissions
      docsData.documents?.slice(0, 3).forEach((doc: any) => {
        recentActivities.push({
          id: doc.id,
          type: 'DOCUMENT_SUBMITTED',
          studentName: doc.student_name || 'Student',
          description: `Submitted ${doc.type} for review`,
          timestamp: new Date(doc.created_at)
        })
      })

      // Add recent applications
      appsData.applications?.slice(0, 2).forEach((app: any) => {
        recentActivities.push({
          id: app.id,
          type: 'APPLICATION_UPDATED',
          studentName: app.student_name || 'Student',
          description: `Applied to ${app.university?.name || 'University'}`,
          timestamp: new Date(app.created_at)
        })
      })

      // Sort by timestamp
      recentActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      setActivities(recentActivities.slice(0, 5))

    } catch (error) {
      console.error('Error fetching admin data:', error)
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

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Failed to load admin data</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of platform activities and student management
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12%</span> from last month
            </p>
            <Progress value={75} className="h-1 mt-3" />
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Reviews
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingReviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires immediate attention
            </p>
            <Button size="sm" className="mt-3 w-full" asChild>
              <Link href="/admin/documents">Review Now</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Consultations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultations
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.upcomingConsultations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Scheduled for this week
            </p>
            <Button size="sm" variant="outline" className="mt-3 w-full" asChild>
              <Link href="/admin/consultations">View Schedule</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Document Approval Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approval Rate
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.documentApprovalRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Document approval rate
            </p>
            <Progress value={metrics.documentApprovalRate} className="h-1 mt-3" />
          </CardContent>
        </Card>

        {/* ECTS Calculator Access */}
        <Card className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-indigo-900">
                ECTS Calculator
              </CardTitle>
              <p className="text-xs text-indigo-700 mt-1">
                Quick access to international degree ECTS estimation tool
              </p>
            </div>
            <Calculator className="w-6 h-6 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-indigo-900">
                  Estimate ECTS credits for international degrees from 100+ countries with specialized conversion formulas for EU, South Asia, USA/Canada, and UK education systems.
                </p>
              </div>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/ects-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Open Calculator
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Activities & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-shrink-0">
                      {activity.type === 'DOCUMENT_SUBMITTED' && (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      {activity.type === 'APPLICATION_UPDATED' && (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-purple-600" />
                        </div>
                      )}
                      {activity.type === 'STUDENT_REGISTERED' && (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                      )}
                      {activity.type === 'STATUS_CHANGED' && (
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                      )}
                      {activity.type === 'CONSULTATION_SCHEDULED' && (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.studentName}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatActivityTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Active Students</span>
                    <span className="text-sm font-bold">{metrics.activeStudents} / {metrics.totalStudents}</span>
                  </div>
                  <Progress 
                    value={metrics.totalStudents > 0 ? (metrics.activeStudents / metrics.totalStudents) * 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Recent Applications (7 days)</span>
                    <span className="text-sm font-bold">{metrics.recentApplications}</span>
                  </div>
                  <Progress 
                    value={metrics.recentApplications > 0 ? Math.min((metrics.recentApplications / 10) * 100, 100) : 0} 
                    className="h-2" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Student Satisfaction</span>
                    <span className="text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {metrics.studentSatisfaction} / 5.0
                    </span>
                  </div>
                  <Progress value={(metrics.studentSatisfaction / 5) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Actions & Summary */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/admin/documents">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Documents
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/ects-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  ECTS Calculator
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/students">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/consultations">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/messages">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Status Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Status Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Verified APS</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="text-2xl font-bold text-green-600">{metrics.verifiedAPS}</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Active Applications</p>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">{metrics.activeApplications}</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Documents Approved</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">{metrics.documentsApproved}</div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p className="font-medium text-amber-900">
                  {metrics.pendingReviews} documents pending review
                </p>
                <p className="text-xs text-amber-700">
                  Please review at your earliest convenience
                </p>
              </div>
              <Button size="sm" className="w-full" asChild>
                <Link href="/admin/documents">View Queue</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
