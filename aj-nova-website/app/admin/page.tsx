'use client'

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
  BarChart3
} from 'lucide-react'
import {
  mockAdminMetrics,
  mockRecentActivities,
  formatActivityTime,
  getStatusColor
} from '@/lib/admin-mock-data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
  const metrics = mockAdminMetrics
  const activities = mockRecentActivities

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
                  <Progress value={(metrics.activeStudents / metrics.totalStudents) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Recent Applications</span>
                    <span className="text-sm font-bold">{metrics.recentApplications}</span>
                  </div>
                  <Progress value={70} className="h-2" />
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
                <div className="text-2xl font-bold text-green-600">27</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Active Applications</p>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">58</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Documents Approved</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">89</div>
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
