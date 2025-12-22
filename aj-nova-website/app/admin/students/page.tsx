'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  Send,
  FileText,
  MoreVertical,
  Loader2,
  RefreshCw,
  Clock,
  UserCog,
  Ban
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getStatusColor, formatActivityTime } from '@/lib/admin-mock-data'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Student {
  id: string
  name: string
  email: string
  status: string
  created_at: string
  last_sign_in_at?: string
  profile?: {
    mobile_number?: string
    preferred_intake?: string
    completion_percentage?: number
    counsellor_id?: string
  }
}

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [counsellorFilter, setCounsellorFilter] = useState<string>('ALL')

  useEffect(() => {
    fetchStudents()

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStudents(true)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  async function fetchStudents(silent = false) {
    try {
      if (!silent) {
        setRefreshing(true)
      }

      const { admin } = await import('@/lib/api-client')
      const data = await admin.getStudents()
      setStudents(data.students || [])
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
      setLastUpdated(new Date())
    }
  }

  function handleManualRefresh() {
    fetchStudents()
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || student.status?.toUpperCase() === statusFilter
    // TODO: Add counsellor filter when counsellor data is available
    const matchesCounsellor = counsellorFilter === 'ALL' || true

    return matchesSearch && matchesStatus && matchesCounsellor
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Management</h1>
            <div className="text-muted-foreground">
              Manage and track all student accounts
              <Badge variant="secondary" className="ml-2">
                Auto-refreshes every 30s
              </Badge>
            </div>
            {lastUpdated && (
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Updated {formatActivityTime(lastUpdated)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/admin/students/new">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Counsellor Filter */}
              <Select value={counsellorFilter} onValueChange={setCounsellorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by counsellor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Counsellors</SelectItem>
                  <SelectItem value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</SelectItem>
                  <SelectItem value="John Anderson">John Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {students.filter(s => s.last_sign_in_at).length}
            </div>
            <p className="text-sm text-muted-foreground">Recently Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {students.length > 0
                ? Math.round(students.reduce((sum, s) => sum + (s.profile?.completion_percentage || 0), 0) / students.length)
                : 0}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Profile Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead>APS Status</TableHead>
                  <TableHead>Counsellor</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name || 'N/A'}</div>
                          <div className="text-xs text-muted-foreground">
                            {student.profile?.preferred_intake || 'Not specified'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.email}</div>
                          <div className="text-muted-foreground">
                            {student.profile?.mobile_number || 'N/A'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status?.toUpperCase())}>
                          {student.status?.toUpperCase() || 'UNKNOWN'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {student.profile?.completion_percentage || 0}%
                          </div>
                          <Progress
                            value={student.profile?.completion_percentage || 0}
                            className="h-1 w-20"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          Not Available
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {student.profile?.counsellor_id ? 'Assigned' : 'Unassigned'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {student.last_sign_in_at
                            ? new Date(student.last_sign_in_at).toLocaleDateString()
                            : new Date(student.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild title="View Details">
                            <Link href={`/admin/students/${student.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Send Message"
                            onClick={() => window.location.href = `/admin/messages?student=${student.id}`}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" title="More Actions">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/students/${student.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => window.location.href = `/admin/messages?student=${student.id}`}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/documents?student=${student.id}`}>
                                  <FileText className="w-4 h-4 mr-2" />
                                  View Documents
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <UserCog className="w-4 h-4 mr-2" />
                                Assign Counsellor
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="w-4 h-4 mr-2" />
                                Deactivate Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
