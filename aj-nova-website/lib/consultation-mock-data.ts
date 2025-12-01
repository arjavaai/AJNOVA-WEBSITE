import { 
  Consultation, 
  ConsultationStatus, 
  Counsellor, 
  AvailableSlot,
  ConsultationStats,
  CalendarDay,
  BookingRequest,
  RescheduleRequest,
  CancellationRequest
} from './consultation-types'

// Mock Counsellors
export const mockCounsellors: Counsellor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@ajnova.com',
    expertise: ['Germany Study Abroad', 'Engineering Programs', 'Visa Guidance'],
    avatar: undefined,
    availability: []
  },
  {
    id: '2',
    name: 'John Anderson',
    email: 'john.anderson@ajnova.com',
    expertise: ['Business Programs', 'Application Strategy', 'Document Preparation'],
    avatar: undefined,
    availability: []
  },
  {
    id: '3',
    name: 'Maria Schmidt',
    email: 'maria.schmidt@ajnova.com',
    expertise: ['Language Requirements', 'Scholarship Guidance', 'University Selection'],
    avatar: undefined,
    availability: []
  }
]

// Mock Consultations
export const mockConsultations: Consultation[] = [
  {
    id: '1',
    studentId: '1',
    counsellorId: '1',
    counsellorName: 'Dr. Sarah Mitchell',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: '10:00',
    duration: 30,
    type: 'INITIAL',
    status: 'SCHEDULED',
    topic: 'Initial consultation for Masters in Computer Science',
    platform: 'ZOOM',
    meetingLink: 'https://zoom.us/j/123456789',
    meetingId: '123 456 789',
    meetingPassword: 'ajnova123',
    remindersSent: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentId: '1',
    counsellorId: '2',
    counsellorName: 'John Anderson',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    time: '14:00',
    duration: 60,
    type: 'FOLLOW_UP',
    status: 'COMPLETED',
    topic: 'Document review and application strategy',
    platform: 'ZOOM',
    notes: 'Reviewed SOP and LOR. Student needs to update introduction paragraph. Next steps: finalize university list.',
    remindersSent: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    studentId: '1',
    counsellorId: '3',
    counsellorName: 'Maria Schmidt',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    time: '11:00',
    duration: 30,
    type: 'SPECIALIZED',
    status: 'CANCELLED',
    topic: 'German language test preparation guidance',
    platform: 'GOOGLE_MEET',
    remindersSent: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    cancelledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    rescheduleReason: 'Student schedule conflict'
  }
]

// Generate available slots for the next 30 days
export function generateAvailableSlots(): AvailableSlot[] {
  const slots: AvailableSlot[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Time slots for each day
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]
  
  // Generate slots for next 30 days
  for (let day = 1; day < 30; day++) {
    const date = new Date(today)
    date.setDate(date.getDate() + day)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    // Add time slots for this day
    timeSlots.forEach(time => {
      // Randomly make some slots unavailable (booked)
      const available = Math.random() > 0.3
      
      // Assign to random counsellor
      const counsellorId = mockCounsellors[Math.floor(Math.random() * mockCounsellors.length)].id
      
      slots.push({
        date,
        time,
        counsellorId,
        available
      })
    })
  }
  
  return slots
}

// Generate calendar days for calendar view
export function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Add days from previous month to fill first week
  const firstDayOfWeek = firstDay.getDay()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(firstDay)
    date.setDate(date.getDate() - i - 1)
    days.push({
      date,
      hasAvailableSlots: false,
      slotsCount: 0,
      isToday: false,
      isPast: date < today
    })
  }
  
  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isPast = date < today
    const hasSlots = !isWeekend && !isPast
    
    days.push({
      date,
      hasAvailableSlots: hasSlots,
      slotsCount: hasSlots ? Math.floor(Math.random() * 10) + 3 : 0,
      isToday: date.getTime() === today.getTime(),
      isPast
    })
  }
  
  // Add days from next month to fill last week
  const remainingDays = 7 - (days.length % 7)
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay)
      date.setDate(date.getDate() + i)
      days.push({
        date,
        hasAvailableSlots: false,
        slotsCount: 0,
        isToday: false,
        isPast: false
      })
    }
  }
  
  return days
}

// In-memory store
let consultationsStore: Consultation[] = [...mockConsultations]
let availableSlotsStore: AvailableSlot[] = generateAvailableSlots()

export function getConsultations(studentId: string): Consultation[] {
  return consultationsStore.filter(c => c.studentId === studentId)
}

export function getUpcomingConsultations(studentId: string): Consultation[] {
  const now = new Date()
  return consultationsStore
    .filter(c => 
      c.studentId === studentId && 
      c.status === 'SCHEDULED' &&
      c.date >= now
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getConsultationHistory(studentId: string): Consultation[] {
  return consultationsStore
    .filter(c => 
      c.studentId === studentId && 
      (c.status === 'COMPLETED' || c.status === 'CANCELLED')
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function getConsultationById(id: string): Consultation | null {
  return consultationsStore.find(c => c.id === id) || null
}

export function getAvailableSlots(date: Date, counsellorId?: string): AvailableSlot[] {
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  
  return availableSlotsStore.filter(slot => {
    const slotDate = new Date(slot.date)
    slotDate.setHours(0, 0, 0, 0)
    
    const dateMatch = slotDate.getTime() === targetDate.getTime()
    const counsellorMatch = !counsellorId || slot.counsellorId === counsellorId
    
    return dateMatch && counsellorMatch && slot.available
  })
}

export function bookConsultation(request: BookingRequest): Consultation {
  const counsellor = request.counsellorId 
    ? mockCounsellors.find(c => c.id === request.counsellorId)
    : mockCounsellors[0]
  
  if (!counsellor) {
    throw new Error('Counsellor not found')
  }
  
  // Create new consultation
  const consultation: Consultation = {
    id: Math.random().toString(36).substr(2, 9),
    studentId: request.studentId,
    counsellorId: counsellor.id,
    counsellorName: counsellor.name,
    date: request.preferredDate,
    time: request.preferredTime,
    duration: request.duration,
    type: request.type,
    status: 'SCHEDULED',
    topic: request.topic,
    platform: 'ZOOM',
    meetingLink: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
    meetingId: `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
    meetingPassword: `ajnova${Math.floor(Math.random() * 1000)}`,
    remindersSent: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  consultationsStore.push(consultation)
  
  // Mark slot as unavailable
  const slot = availableSlotsStore.find(s => 
    s.date.getTime() === request.preferredDate.getTime() &&
    s.time === request.preferredTime &&
    s.counsellorId === counsellor.id
  )
  if (slot) {
    slot.available = false
  }
  
  return consultation
}

export function rescheduleConsultation(request: RescheduleRequest): Consultation {
  const consultation = consultationsStore.find(c => c.id === request.consultationId)
  if (!consultation) {
    throw new Error('Consultation not found')
  }
  
  // Mark old slot as available
  const oldSlot = availableSlotsStore.find(s => 
    s.date.getTime() === consultation.date.getTime() &&
    s.time === consultation.time &&
    s.counsellorId === consultation.counsellorId
  )
  if (oldSlot) {
    oldSlot.available = true
  }
  
  // Update consultation
  consultation.date = request.newDate
  consultation.time = request.newTime
  consultation.status = 'RESCHEDULED'
  consultation.rescheduleReason = request.reason
  consultation.updatedAt = new Date()
  
  // Mark new slot as unavailable
  const newSlot = availableSlotsStore.find(s => 
    s.date.getTime() === request.newDate.getTime() &&
    s.time === request.newTime &&
    s.counsellorId === consultation.counsellorId
  )
  if (newSlot) {
    newSlot.available = false
  }
  
  // Change status back to scheduled
  setTimeout(() => {
    consultation.status = 'SCHEDULED'
  }, 0)
  
  return consultation
}

export function cancelConsultation(request: CancellationRequest): Consultation {
  const consultation = consultationsStore.find(c => c.id === request.consultationId)
  if (!consultation) {
    throw new Error('Consultation not found')
  }
  
  // Mark slot as available
  const slot = availableSlotsStore.find(s => 
    s.date.getTime() === consultation.date.getTime() &&
    s.time === consultation.time &&
    s.counsellorId === consultation.counsellorId
  )
  if (slot) {
    slot.available = true
  }
  
  // Update consultation
  consultation.status = 'CANCELLED'
  consultation.rescheduleReason = request.reason
  consultation.cancelledAt = new Date()
  consultation.updatedAt = new Date()
  
  return consultation
}

export function getConsultationStats(studentId: string): ConsultationStats {
  const consultations = consultationsStore.filter(c => c.studentId === studentId)
  const completed = consultations.filter(c => c.status === 'COMPLETED')
  const cancelled = consultations.filter(c => c.status === 'CANCELLED')
  const upcoming = consultations.filter(c => c.status === 'SCHEDULED' && c.date >= new Date())
  
  const totalBooked = consultations.length
  const completionRate = totalBooked > 0 ? (completed.length / totalBooked) * 100 : 0
  const averageDuration = completed.length > 0
    ? completed.reduce((sum, c) => sum + c.duration, 0) / completed.length
    : 0
  
  return {
    totalBooked,
    totalCompleted: completed.length,
    totalCancelled: cancelled.length,
    upcomingCount: upcoming.length,
    completionRate,
    averageDuration
  }
}

export function getCounsellors(): Counsellor[] {
  return mockCounsellors
}
