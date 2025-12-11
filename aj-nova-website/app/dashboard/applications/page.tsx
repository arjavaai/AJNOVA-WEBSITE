'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Calendar, FileText, Loader2, Search, TrendingUp } from 'lucide-react'
import { Application, ApplicationStatus } from '@/lib/application-types'
import { useRouter } from 'next/navigation'

function getStatusBadge(status: ApplicationStatus) {
  const variants: Record<ApplicationStatus, { variant: any; label: string; color: string }> = {
    APPLIED: { variant: 'secondary', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
    DOCUMENTS_SENT: { variant: 'default', label: 'Documents Sent', color: 'bg-purple-100 text-purple-800' },
    UNDER_REVIEW: { variant: 'warning', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
    WAITING_FOR_DECISION: { variant: 'warning', label: 'Waiting for Decision', color: 'bg-orange-100 text-orange-800' },
    ACCEPTED: { variant: 'success', label: 'Accepted', color: 'bg-green-100 text-green-800' },
    REJECTED: { variant: 'destructive', label: 'Rejected', color: 'bg-red-100 text-red-800' },
    WITHDRAWN: { variant: 'outline', label: 'Withdrawn', color: 'bg-gray-100 text-gray-800' },
  }
  
  const config = variants[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  )
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  useEffect(() => {
    fetchApplications()
    fetchStats()
  }, [])
  
  async function fetchApplications() {
    try {
      const { applications: applicationsAPI } = await import('@/lib/api-client')
      const data = await applicationsAPI.list(false)
      setApplications(data.applications || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  async function fetchStats() {
    try {
      const { applications: applicationsAPI } = await import('@/lib/api-client')
      const data = await applicationsAPI.list(true)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.university.name.toLowerCase().includes(search.toLowerCase()) ||
                         app.program.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My University Applications</h1>
            <p className="text-muted-foreground">
              Track your application status and manage submissions
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {applications.length} Applications
          </Badge>
        </div>
      </div>
      
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Loader2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.acceptanceRate}%</div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities or programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="APPLIED">Applied</SelectItem>
            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground mb-4">
              {search || statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Complete your documents to start applying'}
            </p>
            {!search && statusFilter === 'all' && (
              <div className="flex gap-2 justify-center">
                <Button onClick={() => router.push('/dashboard/documents')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Documents
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map(app => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/dashboard/applications/${app.id}`)}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{app.university.name}</CardTitle>
                    <CardDescription>{app.program.name}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Applied: {new Date(app.applicationDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4 mr-2" />
                  Intake: {app.intake.replace('_', ' ')}
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-1">Documents: {app.documents.filter(d => ['SENT', 'ACCEPTED'].includes(d.status)).length}/{app.documents.length}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(app.documents.filter(d => ['SENT', 'ACCEPTED'].includes(d.status)).length / app.documents.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/dashboard/applications/${app.id}`)
                }}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
