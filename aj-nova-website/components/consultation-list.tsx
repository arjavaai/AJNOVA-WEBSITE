'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  ExternalLink, 
  CalendarClock,
  XCircle,
  FileText,
  Download
} from 'lucide-react'
import { Consultation, ConsultationStatus } from '@/lib/consultation-types'
import { cn } from '@/lib/utils'

interface ConsultationListProps {
  consultations: Consultation[]
  onReschedule?: (consultationId: string) => void
  onCancel?: (consultationId: string, reason: string) => void
  showHistory?: boolean
}

export function ConsultationList({ 
  consultations, 
  onReschedule,
  onCancel,
  showHistory = false
}: ConsultationListProps) {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [consultationToCancel, setConsultationToCancel] = useState<string | null>(null)

  function getStatusBadge(status: ConsultationStatus) {
    const config: Record<ConsultationStatus, { variant: any; label: string }> = {
      SCHEDULED: { variant: 'default', label: 'Scheduled' },
      COMPLETED: { variant: 'secondary', label: 'Completed' },
      CANCELLED: { variant: 'destructive', label: 'Cancelled' },
      RESCHEDULED: { variant: 'warning', label: 'Rescheduled' },
      NO_SHOW: { variant: 'destructive', label: 'No Show' }
    }
    
    return <Badge variant={config[status].variant}>{config[status].label}</Badge>
  }

  function getTypeBadge(type: string) {
    const config: Record<string, { className: string; label: string }> = {
      INITIAL: { className: 'bg-blue-100 text-blue-800', label: 'Initial' },
      FOLLOW_UP: { className: 'bg-green-100 text-green-800', label: 'Follow-up' },
      SPECIALIZED: { className: 'bg-purple-100 text-purple-800', label: 'Specialized' }
    }
    
    const typeConfig = config[type] || config.INITIAL
    return (
      <Badge variant="outline" className={typeConfig.className}>
        {typeConfig.label}
      </Badge>
    )
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  function formatTime(time: string): string {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  function handleCancelClick(consultation: Consultation) {
    setConsultationToCancel(consultation.id)
    setCancelDialogOpen(true)
  }

  function handleCancelConfirm() {
    if (consultationToCancel && onCancel) {
      onCancel(consultationToCancel, cancelReason)
      setCancelDialogOpen(false)
      setCancelReason('')
      setConsultationToCancel(null)
    }
  }

  function downloadICS(consultation: Consultation) {
    // Generate ICS file content
    const startDate = new Date(consultation.date)
    const [hours, minutes] = consultation.time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))
    
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + consultation.duration)
    
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AJ NOVA//Consultation Scheduler//EN
BEGIN:VEVENT
UID:${consultation.id}@ajnova.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:Consultation with ${consultation.counsellorName}
DESCRIPTION:${consultation.topic || 'Consultation meeting'}${consultation.meetingLink ? `\\n\\nJoin: ${consultation.meetingLink}` : ''}
LOCATION:${consultation.platform === 'IN_PERSON' ? 'AJ NOVA Office' : 'Online'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
    
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `consultation-${consultation.id}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (consultations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-2">
              {showHistory ? 'No Past Consultations' : 'No Upcoming Consultations'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {showHistory 
                ? 'Your consultation history will appear here' 
                : 'Schedule your first consultation to get started'}
            </p>
            {!showHistory && (
              <Button>Schedule Consultation</Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {consultations.map((consultation) => {
          const isPast = new Date(consultation.date) < new Date()
          const isScheduled = consultation.status === 'SCHEDULED'
          
          return (
            <Card key={consultation.id} className={cn(
              "transition-shadow hover:shadow-md",
              isScheduled && !isPast && "border-l-4 border-l-primary"
            )}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {consultation.counsellorName}
                      </CardTitle>
                      {getStatusBadge(consultation.status)}
                      {getTypeBadge(consultation.type)}
                    </div>
                    {consultation.topic && (
                      <CardDescription>{consultation.topic}</CardDescription>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConsultation(consultation)}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{formatDate(consultation.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{formatTime(consultation.time)} ({consultation.duration} min)</span>
                  </div>
                  {consultation.meetingLink && (
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-muted-foreground" />
                      <span>{consultation.platform.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
                
                {isScheduled && !isPast && (
                  <div className="flex gap-2 flex-wrap">
                    {consultation.meetingLink && (
                      <Button size="sm" asChild>
                        <a 
                          href={consultation.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Meeting
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadICS(consultation)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                    {onReschedule && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onReschedule(consultation.id)}
                      >
                        <CalendarClock className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                    )}
                    {onCancel && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCancelClick(consultation)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                  </div>
                )}
                
                {consultation.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Meeting Notes:</p>
                    <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Consultation Details Dialog */}
      {selectedConsultation && (
        <Dialog open={!!selectedConsultation} onOpenChange={() => setSelectedConsultation(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Consultation Details</DialogTitle>
              <DialogDescription>
                Reference ID: {selectedConsultation.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Counsellor</Label>
                  <p className="font-medium">{selectedConsultation.counsellorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedConsultation.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Date</Label>
                  <p className="font-medium">{formatDate(selectedConsultation.date)}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Time</Label>
                  <p className="font-medium">
                    {formatTime(selectedConsultation.time)} ({selectedConsultation.duration} minutes)
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <div className="mt-1">
                    {getTypeBadge(selectedConsultation.type)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Platform</Label>
                  <p className="font-medium">{selectedConsultation.platform.replace('_', ' ')}</p>
                </div>
              </div>
              
              {selectedConsultation.topic && (
                <div>
                  <Label className="text-sm text-muted-foreground">Topic</Label>
                  <p className="font-medium">{selectedConsultation.topic}</p>
                </div>
              )}
              
              {selectedConsultation.meetingLink && (
                <div>
                  <Label className="text-sm text-muted-foreground">Meeting Link</Label>
                  <a 
                    href={selectedConsultation.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    {selectedConsultation.meetingLink}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {selectedConsultation.meetingId && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Meeting ID: {selectedConsultation.meetingId}
                      {selectedConsultation.meetingPassword && ` | Password: ${selectedConsultation.meetingPassword}`}
                    </p>
                  )}
                </div>
              )}
              
              {selectedConsultation.notes && (
                <div>
                  <Label className="text-sm text-muted-foreground">Notes</Label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{selectedConsultation.notes}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedConsultation(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Consultation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this consultation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="cancel-reason">Reason for cancellation (optional)</Label>
            <Textarea
              id="cancel-reason"
              placeholder="Let us know why you're cancelling..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Consultation</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm}>
              Cancel Consultation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
