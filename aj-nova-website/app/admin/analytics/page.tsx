'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Download,
  Loader2,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  MessageSquare,
  Target,
  UserCheck,
  TrendingDown
} from 'lucide-react'

interface Analytics {
  total_users: number
  total_students: number
  total_consultations: number
  document_stats: Record<string, number>
  document_by_type: Record<string, number>
  total_documents: number
  average_revisions_per_document: number
  application_stats: Record<string, number>
  total_applications: number
  aps_stats: {
    total: number
    verified: number
    pending: number
    draft: number
  }
  monthly_trends: Array<{
    month: string
    students: number
    applications: number
    consultations: number
  }>
  conversion_funnel: Array<{
    stage: string
    count: number
  }>
  conversion_rate: number
  profile_completion_rate: number
  total_messages: number
  student_messages: number
  counsellor_messages: number
  avg_response_time_hours: number
  top_countries: Array<{
    country: string
    count: number
  }>
  growth_rates: {
    students: number
    applications: number
    documents: number
    consultations: number
  }
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

interface CounsellorPerformance {
  counsellors: Array<{
    counsellor_id: string
    counsellor_name: string
    counsellor_email: string
    students_assigned: number
    aps_verified: number
    docs_approved: number
    docs_pending: number
    total_messages: number
    avg_response_time_hours: number
    workload_score: number
    student_rating: number
  }>
  total_counsellors: number
  summary: {
    total_students_assigned: number
    total_aps_verified: number
    total_docs_approved: number
    avg_workload: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [counsellorData, setCounsellorData] = useState<CounsellorPerformance | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')
  const [currentTab, setCurrentTab] = useState('overview')

  useEffect(() => {
    fetchAllData()
  }, [timeRange])

  async function fetchAllData() {
    setLoading(true)
    try {
      const { admin } = await import('@/lib/api-client')
      const days = parseInt(timeRange)
      const [analyticsData, counsellorPerfData] = await Promise.all([
        admin.getAnalytics(days),
        admin.getCounsellorPerformance()
      ])
      setAnalytics(analyticsData)
      setCounsellorData(counsellorPerfData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Export utility functions
  function convertToCSV(data: any[], headers: string[]): string {
    const rows = [headers.join(',')]
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] !== undefined ? row[header] : ''
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      })
      rows.push(values.join(','))
    })
    return rows.join('\n')
  }

  function downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function exportCurrentTab() {
    if (!analytics) return

    const timestamp = new Date().toISOString().split('T')[0]

    switch (currentTab) {
      case 'overview':
        exportOverviewData(timestamp)
        break
      case 'counsellor':
        exportCounsellorData(timestamp)
        break
      case 'progress':
        exportProgressData(timestamp)
        break
      case 'engagement':
        exportEngagementData(timestamp)
        break
    }
  }

  function exportOverviewData(timestamp: string) {
    if (!analytics) return

    const timeRangeLabel = timeRange === '7' ? '7days' : timeRange === '30' ? '30days' : timeRange === '90' ? '90days' : '1year'

    const data = [
      { metric: 'Time Range', value: `Last ${timeRange} days`, growth: '-' },
      { metric: 'Total Students', value: analytics.total_students, growth: `${analytics.growth_rates.students}%` },
      { metric: 'Total Documents', value: analytics.total_documents, growth: `${analytics.growth_rates.documents}%` },
      { metric: 'Total Applications', value: analytics.total_applications, growth: `${analytics.growth_rates.applications}%` },
      { metric: 'Total Consultations', value: analytics.total_consultations, growth: `${analytics.growth_rates.consultations}%` },
      { metric: 'Conversion Rate', value: `${analytics.conversion_rate}%`, growth: '-' },
      { metric: 'Profile Completion Rate', value: `${analytics.profile_completion_rate}%`, growth: '-' },
      { metric: 'APS Verified', value: analytics.aps_stats.verified, growth: '-' },
      { metric: 'APS Pending', value: analytics.aps_stats.pending, growth: '-' },
      { metric: 'APS Success Rate', value: `${((analytics.aps_stats.verified / analytics.aps_stats.total) * 100).toFixed(1)}%`, growth: '-' }
    ]

    const csv = convertToCSV(data, ['metric', 'value', 'growth'])
    downloadCSV(csv, `analytics-overview-${timeRangeLabel}-${timestamp}.csv`)
  }

  function exportCounsellorData(timestamp: string) {
    if (!counsellorData) return

    const timeRangeLabel = timeRange === '7' ? '7days' : timeRange === '30' ? '30days' : timeRange === '90' ? '90days' : '1year'

    const data = counsellorData.counsellors.map(c => ({
      name: c.counsellor_name,
      email: c.counsellor_email,
      students_assigned: c.students_assigned,
      aps_verified: c.aps_verified,
      docs_approved: c.docs_approved,
      docs_pending: c.docs_pending,
      total_messages: c.total_messages,
      avg_response_hours: c.avg_response_time_hours,
      workload_score: c.workload_score
    }))

    const csv = convertToCSV(data, [
      'name', 'email', 'students_assigned', 'aps_verified', 'docs_approved',
      'docs_pending', 'total_messages', 'avg_response_hours', 'workload_score'
    ])
    downloadCSV(csv, `counsellor-performance-${timeRangeLabel}-${timestamp}.csv`)
  }

  function exportProgressData(timestamp: string) {
    if (!analytics) return

    const timeRangeLabel = timeRange === '7' ? '7days' : timeRange === '30' ? '30days' : timeRange === '90' ? '90days' : '1year'

    const funnelData = analytics.conversion_funnel.map(stage => ({
      stage: stage.stage,
      count: stage.count,
      percentage: ((stage.count / analytics.conversion_funnel[0].count) * 100).toFixed(1) + '%'
    }))

    const csv = convertToCSV(funnelData, ['stage', 'count', 'percentage'])
    downloadCSV(csv, `student-progress-${timeRangeLabel}-${timestamp}.csv`)
  }

  function exportEngagementData(timestamp: string) {
    if (!analytics) return

    const timeRangeLabel = timeRange === '7' ? '7days' : timeRange === '30' ? '30days' : timeRange === '90' ? '90days' : '1year'

    const data = [
      { metric: 'Time Range', value: `Last ${timeRange} days` },
      { metric: 'Total Messages', value: analytics.total_messages },
      { metric: 'Student Messages', value: analytics.student_messages },
      { metric: 'Counsellor Messages', value: analytics.counsellor_messages },
      { metric: 'Average Response Time (hours)', value: analytics.avg_response_time_hours },
      { metric: 'Total Consultations', value: analytics.total_consultations },
      { metric: 'Response Rate', value: `${((analytics.counsellor_messages / analytics.student_messages) * 100).toFixed(0)}%` }
    ]

    const csv = convertToCSV(data, ['metric', 'value'])
    downloadCSV(csv, `engagement-metrics-${timeRangeLabel}-${timestamp}.csv`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Failed to load analytics data</p>
      </div>
    )
  }

  // Prepare data for charts - ALL REAL DATA
  const studentGrowthData = analytics.monthly_trends || []

  const documentStatusData = Object.entries(analytics.document_stats || {}).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' '),
    value: count
  }))

  const applicationStatusData = Object.entries(analytics.application_stats || {}).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' '),
    value: count
  }))

  const consultationData = analytics.monthly_trends?.map(m => ({
    month: m.month,
    consultations: m.consultations
  })) || []

  const conversionFunnelData = analytics.conversion_funnel || []

  const documentTypeData = Object.entries(analytics.document_by_type || {}).map(([type, count]) => ({
    name: type.toUpperCase(),
    value: count
  }))

  const topCountriesData = analytics.top_countries?.map(c => ({
    name: c.country,
    value: c.count
  })) || []

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Platform insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportCurrentTab} disabled={!analytics}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Admissions Overview
          </TabsTrigger>
          <TabsTrigger value="counsellor" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Counsellor Efficiency
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Student Progress
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Engagement & Communication
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: ADMISSIONS OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <div className="text-2xl font-bold">{analytics.total_students}</div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className={`flex items-center text-sm ${analytics.growth_rates.students >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${analytics.growth_rates.students < 0 ? 'rotate-180' : ''}`} />
              {analytics.growth_rates.students >= 0 ? '+' : ''}{analytics.growth_rates.students}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <div className="text-2xl font-bold">
                  {analytics.total_documents}
                </div>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <div className={`flex items-center text-sm ${analytics.growth_rates.documents >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${analytics.growth_rates.documents < 0 ? 'rotate-180' : ''}`} />
              {analytics.growth_rates.documents >= 0 ? '+' : ''}{analytics.growth_rates.documents}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <div className="text-2xl font-bold">
                  {analytics.total_applications}
                </div>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <div className={`flex items-center text-sm ${analytics.growth_rates.applications >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${analytics.growth_rates.applications < 0 ? 'rotate-180' : ''}`} />
              {analytics.growth_rates.applications >= 0 ? '+' : ''}{analytics.growth_rates.applications}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Consultations</p>
                <div className="text-2xl font-bold">{analytics.total_consultations}</div>
              </div>
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <div className={`flex items-center text-sm ${analytics.growth_rates.consultations >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${analytics.growth_rates.consultations < 0 ? 'rotate-180' : ''}`} />
              {analytics.growth_rates.consultations >= 0 ? '+' : ''}{analytics.growth_rates.consultations}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Student Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Student Growth
            </CardTitle>
            <CardDescription>Monthly student and application trends (Real Data - Last 6 Months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studentGrowthData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                  name="Students"
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                  name="Applications"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Document Status
            </CardTitle>
            <CardDescription>Distribution of document statuses (Real Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Application Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Application Status
            </CardTitle>
            <CardDescription>Current application pipeline (Real Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8b5cf6" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* APS Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              APS Submissions Overview
            </CardTitle>
            <CardDescription>APS verification statistics (Real Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Total Submissions</p>
                <div className="text-2xl font-bold text-blue-600">{analytics.aps_stats.total}</div>
              </div>
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                <p className="text-sm text-muted-foreground mb-2">Verified</p>
                <div className="text-2xl font-bold text-green-600">{analytics.aps_stats.verified}</div>
              </div>
              <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950">
                <p className="text-sm text-muted-foreground mb-2">Pending</p>
                <div className="text-2xl font-bold text-amber-600">{analytics.aps_stats.pending}</div>
              </div>
            </div>
            <div className="mt-4 p-4 border rounded-lg bg-muted">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-2xl font-bold text-green-600">
                  {analytics.aps_stats.total > 0
                    ? ((analytics.aps_stats.verified / analytics.aps_stats.total) * 100).toFixed(1)
                    : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary - REAL DATA */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
              <div className="text-3xl font-bold text-green-600">{analytics.conversion_rate}%</div>
              <p className="text-xs text-muted-foreground mt-2">Student to enrollment</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Avg Response Time</p>
              <div className="text-3xl font-bold text-blue-600">
                {analytics.avg_response_time_hours > 0 ? `${analytics.avg_response_time_hours.toFixed(1)}h` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground mt-2">For student queries</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
              <div className="text-3xl font-bold text-purple-600">{analytics.profile_completion_rate}%</div>
              <p className="text-xs text-muted-foreground mt-2">Students with complete profiles</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">APS Verified</p>
              <div className="text-3xl font-bold text-amber-600">{analytics.aps_stats.verified}</div>
              <p className="text-xs text-muted-foreground mt-2">Out of {analytics.aps_stats.total} submissions</p>
            </div>
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        {/* TAB 2: COUNSELLOR EFFICIENCY */}
        <TabsContent value="counsellor" className="space-y-6">
          {counsellorData ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Total Counsellors</p>
                      <div className="text-3xl font-bold text-blue-600">{counsellorData.total_counsellors}</div>
                      <p className="text-xs text-muted-foreground mt-2">Active counsellors & admins</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Students Assigned</p>
                      <div className="text-3xl font-bold text-green-600">{counsellorData.summary.total_students_assigned}</div>
                      <p className="text-xs text-muted-foreground mt-2">Total across all counsellors</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">APS Verified</p>
                      <div className="text-3xl font-bold text-purple-600">{counsellorData.summary.total_aps_verified}</div>
                      <p className="text-xs text-muted-foreground mt-2">Total verifications</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Docs Approved</p>
                      <div className="text-3xl font-bold text-amber-600">{counsellorData.summary.total_docs_approved}</div>
                      <p className="text-xs text-muted-foreground mt-2">Total approvals</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Counsellor Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Counsellor Performance Metrics
                  </CardTitle>
                  <CardDescription>Individual counsellor workload and performance (Real Data)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Counsellor</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Students Assigned</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">APS Verified</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Docs Approved</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Docs Pending</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Messages</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Avg Response</th>
                          <th className="text-center p-3 text-sm font-medium text-muted-foreground">Workload Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {counsellorData.counsellors.map((counsellor, index) => (
                          <tr key={counsellor.counsellor_id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium">{counsellor.counsellor_name}</div>
                                <div className="text-sm text-muted-foreground">{counsellor.counsellor_email}</div>
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold">
                                {counsellor.students_assigned}
                              </span>
                            </td>
                            <td className="text-center p-3">
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 font-semibold">
                                {counsellor.aps_verified}
                              </span>
                            </td>
                            <td className="text-center p-3">
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-semibold">
                                {counsellor.docs_approved}
                              </span>
                            </td>
                            <td className="text-center p-3">
                              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                                counsellor.docs_pending > 5 ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400'
                              } font-semibold`}>
                                {counsellor.docs_pending}
                              </span>
                            </td>
                            <td className="text-center p-3 text-sm">{counsellor.total_messages}</td>
                            <td className="text-center p-3 text-sm">
                              {counsellor.avg_response_time_hours > 0 ? `${counsellor.avg_response_time_hours.toFixed(1)}h` : 'N/A'}
                            </td>
                            <td className="text-center p-3">
                              <div className="flex items-center justify-center gap-2">
                                <span className="font-semibold">{counsellor.workload_score}</span>
                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-600"
                                    style={{
                                      width: `${Math.min((counsellor.workload_score / counsellorData.summary.avg_workload) * 50, 100)}%`
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {counsellorData.counsellors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No counsellor data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Workload Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Workload Distribution
                  </CardTitle>
                  <CardDescription>Compare counsellor workloads (Real Data)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={counsellorData.counsellors}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="counsellor_name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students_assigned" fill="#3b82f6" name="Students Assigned" />
                      <Bar dataKey="docs_pending" fill="#f59e0b" name="Docs Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p>Loading counsellor performance data...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* TAB 3: STUDENT PROGRESS METRICS */}
        <TabsContent value="progress" className="space-y-6">
          {/* Progress Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Student Journey Progress Funnel
              </CardTitle>
              <CardDescription>Track student progression through each stage (Real Data)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversionFunnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={180} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6">
                    {conversionFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Progress Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Profile Completion Rate</p>
                  <div className="text-3xl font-bold text-blue-600">{analytics.profile_completion_rate}%</div>
                  <p className="text-xs text-muted-foreground mt-2">Students with complete profiles</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Average Revisions</p>
                  <div className="text-3xl font-bold text-purple-600">{analytics.average_revisions_per_document}</div>
                  <p className="text-xs text-muted-foreground mt-2">Per document submitted</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Drop-off Rate</p>
                  <div className="text-3xl font-bold text-red-600">
                    {conversionFunnelData.length > 1
                      ? ((1 - (conversionFunnelData[conversionFunnelData.length - 1].count / conversionFunnelData[0].count)) * 100).toFixed(1)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Students not completing journey</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents by Type
              </CardTitle>
              <CardDescription>AI-generated document distribution (Real Data)</CardDescription>
            </CardHeader>
            <CardContent>
              {documentTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={documentTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10b981" name="Documents" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No document type data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: ENGAGEMENT & COMMUNICATION */}
        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Messages</p>
                  <div className="text-3xl font-bold text-blue-600">{analytics.total_messages}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Student: {analytics.student_messages} | Counsellor: {analytics.counsellor_messages}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Avg Response Time</p>
                  <div className="text-3xl font-bold text-purple-600">
                    {analytics.avg_response_time_hours > 0 ? `${analytics.avg_response_time_hours.toFixed(1)}h` : 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">For student queries</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Consultations</p>
                  <div className="text-3xl font-bold text-green-600">{analytics.total_consultations}</div>
                  <p className="text-xs text-muted-foreground mt-2">Scheduled consultations</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Response Rate</p>
                  <div className="text-3xl font-bold text-amber-600">
                    {analytics.total_messages > 0
                      ? ((analytics.counsellor_messages / analytics.student_messages) * 100).toFixed(0)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Counsellor response coverage</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Consultation Trends
              </CardTitle>
              <CardDescription>Monthly consultation volume (Real Data - Last 6 Months)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consultations"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Consultations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Message Volume Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communication Volume
              </CardTitle>
              <CardDescription>Message activity breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Student Messages</p>
                    <p className="text-2xl font-bold text-blue-600">{analytics.student_messages}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {analytics.total_messages > 0
                        ? ((analytics.student_messages / analytics.total_messages) * 100).toFixed(1)
                        : 0}% of total
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Counsellor Messages</p>
                    <p className="text-2xl font-bold text-purple-600">{analytics.counsellor_messages}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {analytics.total_messages > 0
                        ? ((analytics.counsellor_messages / analytics.total_messages) * 100).toFixed(1)
                        : 0}% of total
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5" />
                Student Demographics - Top Countries
              </CardTitle>
              <CardDescription>Student distribution by country (Real Data)</CardDescription>
            </CardHeader>
            <CardContent>
              {topCountriesData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topCountriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topCountriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No country data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
