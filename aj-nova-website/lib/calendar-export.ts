/**
 * Calendar Export Utility
 * Generate .ics files for consultation bookings
 * Compatible with Google Calendar, Apple Calendar, and Outlook
 */

interface ConsultationEvent {
  id: string
  title: string
  description?: string
  location?: string
  startTime: Date
  endTime: Date
  counsellorName?: string
  counsellorEmail?: string
  meetingLink?: string
  studentName?: string
  studentEmail?: string
}

/**
 * Format date to iCalendar format (YYYYMMDDTHHMMSSZ)
 */
function formatICSDate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

/**
 * Escape special characters for iCalendar format
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/**
 * Generate .ics file content
 */
function generateICSContent(event: ConsultationEvent): string {
  const now = new Date()
  const dtstamp = formatICSDate(now)
  const dtstart = formatICSDate(event.startTime)
  const dtend = formatICSDate(event.endTime)

  // Build description
  let description = event.description || `Consultation with ${event.counsellorName || 'AJ NOVA Counsellor'}`

  if (event.meetingLink) {
    description += `\\n\\nMeeting Link: ${event.meetingLink}`
  }

  description += '\\n\\nPrepared by: AJ NOVA - Your German Education Partner'

  // Build location
  const location = event.location || event.meetingLink || 'Online Meeting'

  // Build attendees
  const attendees: string[] = []
  if (event.counsellorEmail) {
    attendees.push(`ATTENDEE;CN=${escapeICSText(event.counsellorName || 'Counsellor')};ROLE=REQ-PARTICIPANT:mailto:${event.counsellorEmail}`)
  }
  if (event.studentEmail) {
    attendees.push(`ATTENDEE;CN=${escapeICSText(event.studentName || 'Student')};ROLE=REQ-PARTICIPANT:mailto:${event.studentEmail}`)
  }

  // Generate unique UID
  const uid = `consultation-${event.id}@ajnova.com`

  // Build ICS content
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AJ NOVA//Student Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    `LOCATION:${escapeICSText(location)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    ...attendees,
    // Add alarm 1 hour before
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${escapeICSText(event.title)} in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return icsLines.join('\r\n')
}

/**
 * Download .ics file
 */
function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * Export consultation to calendar (.ics file)
 */
export function exportConsultationToCalendar(event: ConsultationEvent) {
  const icsContent = generateICSContent(event)
  const filename = `AJNova_Consultation_${event.id}.ics`
  downloadICS(icsContent, filename)
}

/**
 * Create consultation event from consultation data
 */
export function createConsultationEvent(consultation: {
  id: string
  scheduled_date: string | Date
  duration_minutes: number
  consultation_type: string
  counsellor_name?: string
  counsellor_email?: string
  notes?: string
  meeting_link?: string
  student_name?: string
  student_email?: string
}): ConsultationEvent {
  const startTime = typeof consultation.scheduled_date === 'string'
    ? new Date(consultation.scheduled_date)
    : consultation.scheduled_date

  const endTime = new Date(startTime.getTime() + consultation.duration_minutes * 60000)

  const typeLabels: Record<string, string> = {
    INITIAL: 'Initial Consultation',
    FOLLOW_UP: 'Follow-up Session',
    SPECIALIZED: 'Specialized Consultation',
  }

  const title = `${typeLabels[consultation.consultation_type] || 'Consultation'} - AJ NOVA`

  return {
    id: consultation.id,
    title,
    description: consultation.notes,
    location: consultation.meeting_link || 'Online Meeting',
    startTime,
    endTime,
    counsellorName: consultation.counsellor_name,
    counsellorEmail: consultation.counsellor_email,
    meetingLink: consultation.meeting_link,
    studentName: consultation.student_name,
    studentEmail: consultation.student_email,
  }
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarURL(event: ConsultationEvent): string {
  const baseURL = 'https://calendar.google.com/calendar/render'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatICSDate(event.startTime)}/${formatICSDate(event.endTime)}`,
    details: event.description || '',
    location: event.location || event.meetingLink || 'Online Meeting',
  })

  return `${baseURL}?${params.toString()}`
}

/**
 * Open consultation in Google Calendar
 */
export function addToGoogleCalendar(event: ConsultationEvent) {
  const url = getGoogleCalendarURL(event)
  window.open(url, '_blank')
}
