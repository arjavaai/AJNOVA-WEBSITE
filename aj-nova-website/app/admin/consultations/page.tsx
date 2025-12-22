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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  UserPlus,
  Loader2,
  CalendarPlus
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Consultation {
  id: string
  student_id: string
  student_name: string
  counsellor_id: string
  counsellor_name: string
  scheduled_at: string
  duration_minutes: number
  type: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  meeting_link: string
  notes: string
  created_at: string
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-800',
}

export default function ConsultationsManagementPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newConsultation, setNewConsultation] = useState({
    student_id: '',
    counsellor_id: '',
    scheduled_at: '',
    duration_minutes: 30,
    type: 'initial',
    notes: ''
  })

  useEffect(() => {
    fetchConsultations()
  }, [])

  async function fetchConsultations() {
    try {
      const { consultations: consultationsAPI } = await import('@/lib/api-client')
      const data = await consultationsAPI.list()
      setConsultations(data.consultations || [])
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddConsultation() {
    try {
      // TODO: Implement create consultation API
      console.log('Creating consultation:', newConsultation)
      setIsAddDialogOpen(false)
      await fetchConsultations()
    } catch (error) {
      console.error('Error creating consultation:', error)
    }
  }

  async function handleUpdateStatus(id: string, status: string) {
    try {
      // TODO: Implement update consultation API
      console.log('Updating consultation status:', id, status)
      await fetchConsultations()
    } catch (error) {
      console.error('Error updating consultation:', error)
    }
  }

  async function handleCancel(id: string) {
    try {
      const { consultations: consultationsAPI } = await import('@/lib/api-client')
      await consultationsAPI.cancel(id)
      await fetchConsultations()
    } catch (error) {
      console.error('Error cancelling consultation:', error)
    }
  }

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch =
      consultation.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.counsellor_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || consultation.status === statusFilter
    const matchesType = typeFilter === 'ALL' || consultation.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: consultations.length,
    scheduled: consultations.filter(c => c.status === 'scheduled').length,
    completed: consultations.filter(c => c.status === 'completed').length,
    cancelled: consultations.filter(c => c.status === 'cancelled').length,
  }

  // Get upcoming consultations (today and future)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcomingConsultations = consultations.filter(c => {
    const consultationDate = new Date(c.scheduled_at)
    return consultationDate >= today && c.status === 'scheduled'
  }).sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())

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
            <h1 className="text-3xl font-bold mb-2">Consultations</h1>
            <p className="text-muted-foreground">
              Schedule and manage student consultations
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Consultation</DialogTitle>
                <DialogDescription>
                  Book a consultation session with a student
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select
                    value={newConsultation.student_id}
                    onValueChange={(value) =>
                      setNewConsultation({ ...newConsultation, student_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student1">John Doe</SelectItem>
                      <SelectItem value="student2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date & Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !selectedDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newConsultation.scheduled_at}
                    onChange={(e) =>
                      setNewConsultation({ ...newConsultation, scheduled_at: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select
                    value={newConsultation.duration_minutes.toString()}
                    onValueChange={(value) =>
                      setNewConsultation({ ...newConsultation, duration_minutes: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Consultation Type</Label>
                  <Select
                    value={newConsultation.type}
                    onValueChange={(value) =>
                      setNewConsultation({ ...newConsultation, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">Initial Consultation</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="document_review">Document Review</SelectItem>
                      <SelectItem value="visa_prep">Visa Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newConsultation.notes}
                    onChange={(e) =>
                      setNewConsultation({ ...newConsultation, notes: e.target.value })
                    }
                    placeholder="Add any notes or agenda items"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddConsultation}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.scheduled}</div>
                <p className="text-sm text-blue-700">Scheduled</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
                <p className="text-sm text-green-700">Completed</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-900">{stats.cancelled}</div>
                <p className="text-sm text-red-700">Cancelled</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Upcoming Consultations */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingConsultations.slice(0, 5).map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{consultation.student_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {consultation.type}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {consultation.duration_minutes}m
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(consultation.scheduled_at), 'h:mm a')}
                    </div>
                    {consultation.meeting_link && (
                      <Button size="sm" variant="link" className="p-0 h-auto mt-2" asChild>
                        <a href={consultation.meeting_link} target="_blank" rel="noopener noreferrer">
                          <Video className="w-3 h-3 mr-1" />
                          Join Meeting
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
                {upcomingConsultations.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming consultations
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: All Consultations Table */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student or counsellor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="initial">Initial</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="document_review">Document Review</SelectItem>
                    <SelectItem value="visa_prep">Visa Prep</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Consultations Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Consultations ({filteredConsultations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConsultations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No consultations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredConsultations.map((consultation) => (
                        <TableRow key={consultation.id}>
                          <TableCell>
                            <div className="font-medium">{consultation.student_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {consultation.counsellor_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {format(new Date(consultation.scheduled_at), 'PPP')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(consultation.scheduled_at), 'h:mm a')} ({consultation.duration_minutes}m)
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{consultation.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[consultation.status]}>
                              {consultation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {consultation.meeting_link && consultation.status === 'scheduled' && (
                                <Button variant="ghost" size="sm" asChild>
                                  <a
                                    href={consultation.meeting_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Video className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {consultation.status === 'scheduled' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCancel(consultation.id)}
                                >
                                  <XCircle className="w-4 h-4 text-red-600" />
                                </Button>
                              )}
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
      </div>
    </div>
  )
}
