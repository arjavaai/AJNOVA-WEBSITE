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
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  FileText,
  Filter,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { getStatusColor, formatActivityTime } from '@/lib/admin-mock-data'
import { cn } from '@/lib/utils'

interface Document {
  id: string
  type: string
  title?: string
  status: string
  student_id: string
  created_at: string
  updated_at: string
}

export default function DocumentReviewPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    fetchDocuments()

    const interval = setInterval(() => {
      fetchDocuments(true)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  async function fetchDocuments(silent = false) {
    try {
      if (!silent) {
        setRefreshing(true)
      }

      const { documents: documentsAPI } = await import('@/lib/api-client')
      const data = await documentsAPI.list()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
      setLastUpdated(new Date())
    }
  }

  function handleManualRefresh() {
    fetchDocuments()
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.title?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'ALL' || doc.type?.toUpperCase() === typeFilter.toUpperCase()
    const matchesStatus = statusFilter === 'ALL' || doc.status?.toUpperCase() === statusFilter.toUpperCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const pendingCount = documents.filter(d => d.status === 'submitted').length
  const inReviewCount = documents.filter(d => d.status === 'under_review').length
  const approvedCount = documents.filter(d => d.status === 'approved').length

  async function handleApprove(id: string) {
    try {
      const { documents: documentsAPI } = await import('@/lib/api-client')
      await documentsAPI.approve(id)
      await fetchDocuments()
    } catch (error) {
      console.error('Error approving document:', error)
    }
  }

  async function handleReject(id: string) {
    try {
      const { documents: documentsAPI } = await import('@/lib/api-client')
      await documentsAPI.reject(id, 'Rejected by admin')
      await fetchDocuments()
    } catch (error) {
      console.error('Error rejecting document:', error)
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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Document Review Queue</h1>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated {formatActivityTime(lastUpdated)}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>
        <div className="text-muted-foreground">
          Review and approve student documents
          <Badge variant="secondary" className="ml-2">
            Auto-refreshes every 30s
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-900">{pendingCount}</div>
                <p className="text-sm text-yellow-700">Pending Review</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{inReviewCount}</div>
                <p className="text-sm text-blue-700">In Review</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{approvedCount}</div>
                <p className="text-sm text-green-700">Approved</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{documents.length}</div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="APS_FORM">APS Form</SelectItem>
                <SelectItem value="SOP">SOP</SelectItem>
                <SelectItem value="LOR">LOR</SelectItem>
                <SelectItem value="RESUME">Resume</SelectItem>
                <SelectItem value="COVER_LETTER">Cover Letter</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_REVIEW">In Review</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Review Queue ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="font-medium">
                            {doc.type?.replace('_', ' ').toUpperCase() || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{doc.title || doc.student_id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {formatActivityTime(new Date(doc.created_at))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          NORMAL
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status?.toUpperCase())}>
                          {doc.status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          Admin
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {(doc.status === 'submitted' || doc.status === 'under_review') ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(doc.id)}
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(doc.id)}
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                              </Button>
                            </>
                          ) : null}
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
