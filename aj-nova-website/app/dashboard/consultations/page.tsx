'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Calendar, CheckCircle2, Clock } from 'lucide-react'
import { ConsultationCalendar } from '@/components/consultation-calendar'
import { ConsultationList } from '@/components/consultation-list'
import { Consultation, AvailableSlot, Counsellor, ConsultationType, ConsultationDuration } from '@/lib/consultation-types'
import { useRouter } from 'next/navigation'

export default function ConsultationsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [upcomingConsultations, setUpcomingConsultations] = useState<Consultation[]>([])
  const [pastConsultations, setPastConsultations] = useState<Consultation[]>([])
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [counsellors, setCounsellors] = useState<Counsellor[]>([])
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedCounsellorId, setSelectedCounsellorId] = useState<string>('')
  const [duration, setDuration] = useState<ConsultationDuration>(30)
  const [consultationType, setConsultationType] = useState<ConsultationType>('INITIAL')
  const [topic, setTopic] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [upcomingRes, historyRes, slotsRes, counsellorsRes] = await Promise.all([
        fetch('/api/consultations?studentId=1&type=upcoming'),
        fetch('/api/consultations?studentId=1&type=history'),
        fetch('/api/consultations?type=slots'),
        fetch('/api/consultations?type=counsellors')
      ])

      const upcomingData = await upcomingRes.json()
      const historyData = await historyRes.json()
      const slotsData = await slotsRes.json()
      const counsellorsData = await counsellorsRes.json()

      setUpcomingConsultations(upcomingData.consultations || [])
      setPastConsultations(historyData.consultations || [])
      setAvailableSlots(slotsData.slots.map((slot: any) => ({
        ...slot,
        date: new Date(slot.date)
      })) || [])
      setCounsellors(counsellorsData.counsellors || [])
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleSelectSlot(date: Date, time: string, counsellorId: string) {
    setSelectedDate(date)
    setSelectedTime(time)
    setSelectedCounsellorId(counsellorId)
  }

  async function handleBookConsultation() {
    if (!selectedDate || !selectedTime || !selectedCounsellorId) {
      alert('Please select a date and time')
      return
    }

    setBooking(true)
    try {
      const response = await fetch('/api/consultations?studentId=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredDate: selectedDate.toISOString(),
          preferredTime: selectedTime,
          duration,
          type: consultationType,
          topic: topic || undefined,
          counsellorId: selectedCounsellorId
        })
      })

      const data = await response.json()

      if (response.ok) {
        setBookingSuccess(true)
        setTimeout(() => {
          setBookingSuccess(false)
          resetForm()
          fetchData()
        }, 3000)
      } else {
        alert(data.error || 'Failed to book consultation')
      }
    } catch (error) {
      console.error('Error booking consultation:', error)
      alert('Failed to book consultation')
    } finally {
      setBooking(false)
    }
  }

  function resetForm() {
    setSelectedDate(null)
    setSelectedTime('')
    setSelectedCounsellorId('')
    setDuration(30)
    setConsultationType('INITIAL')
    setTopic('')
  }

  async function handleCancel(consultationId: string, reason: string) {
    try {
      const response = await fetch(`/api/consultations/${consultationId}?reason=${encodeURIComponent(reason)}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Consultation cancelled successfully')
        fetchData()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to cancel consultation')
      }
    } catch (error) {
      console.error('Error cancelling consultation:', error)
      alert('Failed to cancel consultation')
    }
  }

  function handleReschedule(consultationId: string) {
    // For now, show alert - in production, would open reschedule modal
    alert('Rescheduling functionality will open a new date/time selector')
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Consultations</h1>
        <p className="text-muted-foreground">
          Schedule and manage your consultations with our expert counsellors
        </p>
      </div>

      <Tabs defaultValue="book" className="space-y-6">
        <TabsList>
          <TabsTrigger value="book">
            <Calendar className="w-4 h-4 mr-2" />
            Book Consultation
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <Clock className="w-4 h-4 mr-2" />
            Upcoming ({upcomingConsultations.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            History ({pastConsultations.length})
          </TabsTrigger>
        </TabsList>

        {/* Book Consultation Tab */}
        <TabsContent value="book" className="space-y-6">
          {bookingSuccess ? (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Consultation Booked Successfully!</h3>
                    <p className="text-sm text-green-800">
                      You'll receive a confirmation email with meeting details shortly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <ConsultationCalendar
                    availableSlots={availableSlots}
                    counsellors={counsellors}
                    onSelectSlot={handleSelectSlot}
                    selectedDate={selectedDate || undefined}
                    selectedTime={selectedTime}
                  />
                </div>

                {/* Booking Form */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Consultation Details</CardTitle>
                      <CardDescription>Complete your booking information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Consultation Type *</Label>
                        <Select
                          value={consultationType}
                          onValueChange={(value: ConsultationType) => setConsultationType(value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INITIAL">Initial Consultation</SelectItem>
                            <SelectItem value="FOLLOW_UP">Follow-up</SelectItem>
                            <SelectItem value="SPECIALIZED">Specialized</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Duration *</Label>
                        <Select
                          value={duration.toString()}
                          onValueChange={(value) => setDuration(parseInt(value) as ConsultationDuration)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Topic / Question (Optional)</Label>
                        <Textarea
                          placeholder="What would you like to discuss?"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {selectedDate && selectedTime && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">Selected Slot:</p>
                          <p className="text-sm text-blue-800">
                            {selectedDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })} at {selectedTime}
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            {counsellors.find(c => c.id === selectedCounsellorId)?.name}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={handleBookConsultation}
                        disabled={booking || !selectedDate || !selectedTime}
                        className="w-full"
                      >
                        {booking ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Upcoming Consultations Tab */}
        <TabsContent value="upcoming">
          <ConsultationList
            consultations={upcomingConsultations}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <ConsultationList
            consultations={pastConsultations}
            showHistory
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
