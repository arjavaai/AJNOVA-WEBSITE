# Consultation Scheduler Implementation - Complete Guide

## Overview
This document describes the complete implementation of the Consultation Scheduler feature for AJ NOVA's student dashboard. The scheduler allows students to book free consultations with counsellors, manage appointments, and track consultation history.

## Features Implemented

### 1. Complete Consultation Booking System
- ✅ **Interactive Calendar** with available slot visualization
- ✅ **Time Slot Selection** with real-time availability
- ✅ **Consultation Types:**
  - Initial Consultation (first-time meeting)
  - Follow-up Consultation (progress review)
  - Specialized Consultation (specific topics)
- ✅ **Duration Options:** 30 or 60 minutes
- ✅ **Optional Topic/Question** field
- ✅ **Automatic Counsellor Assignment** or manual selection

### 2. Advanced Calendar Component
- **Month navigation** (previous/next month)
- **Visual indicators:**
  - Available dates (green highlight)
  - Today's date (blue ring)
  - Selected date (blue background)
  - Slot count display per day
  - Past dates (grayed out)
  - Weekends excluded
- **Responsive grid layout** (7-day week view)
- **Time slot grid** for selected date
- **Counsellor name** shown per time slot

### 3. Consultation Management
- **Upcoming Consultations List:**
  - Date and time display
  - Counsellor information
  - Meeting type and duration
  - Meeting link (for online meetings)
  - Status badges
  - Action buttons (Join, Reschedule, Cancel)
- **Consultation History:**
  - Past meetings with notes
  - Completion status
  - Counsellor recommendations
  - Meeting summaries

### 4. Meeting Features
- **Online Meeting Integration:**
  - Zoom, Google Meet, Microsoft Teams support
  - Automatic meeting link generation
  - Meeting ID and password
  - One-click join functionality
- **Calendar Integration:**
  - Download .ICS file
  - Add to Calendar button
  - Compatible with Google Calendar, Outlook, iCal
  - Timezone handling

### 5. Status Management
- **Status Types:**
  - SCHEDULED - Confirmed and upcoming
  - COMPLETED - Meeting finished
  - CANCELLED - Meeting cancelled
  - RESCHEDULED - New time set
  - NO_SHOW - Student didn't attend
- **Color-coded badges** for quick identification
- **Status-specific actions** and UI

### 6. Dashboard Integration
- **Upcoming Consultations Card:**
  - Shows next 2 consultations
  - Quick view of date/time
  - Direct link to full scheduler
  - Empty state with booking CTA
- **Quick Actions:**
  - "Book Consultation" button in main dashboard
  - Easy access from anywhere

## File Structure

```
aj-nova-website/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Dashboard with consultations widget
│   │   └── consultations/
│   │       └── page.tsx                # Main consultations page
│   └── api/
│       └── consultations/
│           ├── route.ts                # GET/POST endpoints
│           └── [id]/
│               └── route.ts            # GET/PATCH/DELETE by ID
├── components/
│   ├── consultation-calendar.tsx       # Interactive calendar component
│   └── consultation-list.tsx           # Consultations list component
└── lib/
    ├── consultation-types.ts           # TypeScript types
    └── consultation-mock-data.ts       # Mock data & utilities
```

## Components

### 1. ConsultationCalendar Component
**Location:** `components/consultation-calendar.tsx`

**Features:**
- Interactive month calendar
- Day selection with visual feedback
- Time slot grid for selected date
- Available/unavailable slot indicators
- Counsellor assignment per slot
- Month navigation
- Responsive design

**Props:**
```typescript
interface ConsultationCalendarProps {
  availableSlots: AvailableSlot[]
  counsellors: Counsellor[]
  onSelectSlot: (date: Date, time: string, counsellorId: string) => void
  selectedDate?: Date
  selectedTime?: string
}
```

**Usage:**
```tsx
<ConsultationCalendar
  availableSlots={availableSlots}
  counsellors={counsellors}
  onSelectSlot={(date, time, counsellorId) => {
    // Handle slot selection
  }}
  selectedDate={selectedDate}
  selectedTime={selectedTime}
/>
```

### 2. ConsultationList Component
**Location:** `components/consultation-list.tsx`

**Features:**
- List of consultations (upcoming or history)
- Consultation details dialog
- Cancel confirmation dialog
- Action buttons (Join, Reschedule, Cancel)
- Status and type badges
- Meeting notes display
- Calendar file download
- Empty state handling

**Props:**
```typescript
interface ConsultationListProps {
  consultations: Consultation[]
  onReschedule?: (consultationId: string) => void
  onCancel?: (consultationId: string, reason: string) => void
  showHistory?: boolean
}
```

**Usage:**
```tsx
<ConsultationList
  consultations={upcomingConsultations}
  onCancel={handleCancel}
  onReschedule={handleReschedule}
/>
```

## API Endpoints

### GET /api/consultations
**Description:** Fetch consultations for a student

**Query Parameters:**
- `studentId` (required): Student ID
- `type` (optional): Filter type
  - `all` - All consultations
  - `upcoming` - Upcoming only
  - `history` - Past consultations only
  - `stats` - Statistics
  - `counsellors` - Get counsellor list
  - `slots` - Get available slots

**Response Examples:**

**Upcoming Consultations:**
```json
{
  "consultations": [
    {
      "id": "1",
      "studentId": "1",
      "counsellorId": "1",
      "counsellorName": "Dr. Sarah Mitchell",
      "date": "2025-12-03T00:00:00.000Z",
      "time": "10:00",
      "duration": 30,
      "type": "INITIAL",
      "status": "SCHEDULED",
      "topic": "Initial consultation for Masters",
      "platform": "ZOOM",
      "meetingLink": "https://zoom.us/j/123456789",
      "meetingId": "123 456 789",
      "meetingPassword": "ajnova123",
      "remindersSent": false,
      "createdAt": "2025-12-01T...",
      "updatedAt": "2025-12-01T..."
    }
  ]
}
```

**Available Slots:**
```json
{
  "slots": [
    {
      "date": "2025-12-02T00:00:00.000Z",
      "time": "09:00",
      "counsellorId": "1",
      "available": true
    }
  ]
}
```

**Counsellors:**
```json
{
  "counsellors": [
    {
      "id": "1",
      "name": "Dr. Sarah Mitchell",
      "email": "sarah.mitchell@ajnova.com",
      "expertise": ["Germany Study Abroad", "Engineering Programs"],
      "availability": []
    }
  ]
}
```

### POST /api/consultations
**Description:** Book a new consultation

**Query Parameters:**
- `studentId` (required): Student ID

**Body:**
```json
{
  "preferredDate": "2025-12-05T00:00:00.000Z",
  "preferredTime": "10:00",
  "duration": 30,
  "type": "INITIAL",
  "topic": "Masters in Computer Science guidance",
  "counsellorId": "1"
}
```

**Response:**
```json
{
  "consultation": { ... },
  "message": "Consultation booked successfully"
}
```

### GET /api/consultations/[id]
**Description:** Get specific consultation details

**Response:**
```json
{
  "consultation": { ... }
}
```

### PATCH /api/consultations/[id]
**Description:** Reschedule a consultation

**Body:**
```json
{
  "action": "reschedule",
  "newDate": "2025-12-06T00:00:00.000Z",
  "newTime": "14:00",
  "reason": "Schedule conflict"
}
```

**Response:**
```json
{
  "consultation": { ... },
  "message": "Consultation rescheduled successfully"
}
```

### DELETE /api/consultations/[id]
**Description:** Cancel a consultation

**Query Parameters:**
- `reason` (optional): Cancellation reason

**Response:**
```json
{
  "consultation": { ... },
  "message": "Consultation cancelled successfully"
}
```

## Data Types

### Consultation
```typescript
interface Consultation {
  id: string
  studentId: string
  counsellorId: string
  counsellorName: string
  date: Date
  time: string // HH:MM format
  duration: 30 | 60
  type: 'INITIAL' | 'FOLLOW_UP' | 'SPECIALIZED'
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED' | 'NO_SHOW'
  topic?: string
  platform: 'ZOOM' | 'GOOGLE_MEET' | 'MICROSOFT_TEAMS' | 'IN_PERSON'
  meetingLink?: string
  meetingId?: string
  meetingPassword?: string
  notes?: string
  remindersSent: boolean
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
  completedAt?: Date
  rescheduleReason?: string
}
```

### AvailableSlot
```typescript
interface AvailableSlot {
  date: Date
  time: string // HH:MM format
  counsellorId: string
  available: boolean
}
```

### Counsellor
```typescript
interface Counsellor {
  id: string
  name: string
  email: string
  expertise: string[]
  avatar?: string
  availability: TimeSlot[]
}
```

## User Flows

### 1. Booking Flow
1. Student navigates to Consultations page
2. Views calendar with available dates
3. Selects a date
4. Views available time slots for that date
5. Selects a time slot
6. Fills consultation details:
   - Type (Initial/Follow-up/Specialized)
   - Duration (30/60 minutes)
   - Topic (optional)
7. Reviews selected slot information
8. Clicks "Confirm Booking"
9. Receives confirmation
10. Consultation appears in "Upcoming" tab
11. Receives email confirmation (simulated)

### 2. View/Manage Flow
1. Student views "Upcoming" tab
2. Sees list of scheduled consultations
3. Can perform actions:
   - **Join Meeting:** Opens meeting link
   - **Add to Calendar:** Downloads .ICS file
   - **Reschedule:** Opens reschedule dialog (placeholder)
   - **Cancel:** Opens cancel confirmation
4. If cancelling:
   - Confirms cancellation
   - Optionally provides reason
   - Slot becomes available again

### 3. History Review Flow
1. Student views "History" tab
2. Sees past consultations
3. Can view meeting notes
4. Reviews counsellor recommendations
5. Checks follow-up actions

## UI/UX Features

### Visual Design
- **Color-coded status badges:**
  - Scheduled: Blue
  - Completed: Gray
  - Cancelled/No Show: Red
  - Rescheduled: Amber
- **Type badges:**
  - Initial: Light blue
  - Follow-up: Light green
  - Specialized: Light purple
- **Icons** for quick recognition:
  - Calendar, Clock, Video, User icons
  - Clear visual hierarchy

### Responsive Design
- **Mobile:** Single column, touch-friendly
- **Tablet:** Optimized 2-column layout
- **Desktop:** Full 3-column layout (calendar + slots + form)

### Interactive Elements
- **Hover states** on calendar days and time slots
- **Loading states** during API calls
- **Success/error messages** with animations
- **Disabled states** for unavailable slots
- **Empty states** with CTAs

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## Mock Data

### Automatic Slot Generation
- **30 days** of available slots generated
- **Weekdays only** (Monday-Friday)
- **Time slots:**
  - Morning: 09:00 - 11:30 (30-min intervals)
  - Afternoon: 14:00 - 17:00 (30-min intervals)
- **Random availability** (70% available)
- **Random counsellor assignment**

### Sample Consultations
- 1 upcoming consultation (2 days from now)
- 1 completed consultation (7 days ago)
- 1 cancelled consultation (14 days ago)

### Counsellors
- Dr. Sarah Mitchell (Germany/Engineering)
- John Anderson (Business/Applications)
- Maria Schmidt (Languages/Scholarships)

## Testing Guide

### Manual Testing Checklist

#### Calendar Functionality
- [ ] Month navigation works (previous/next)
- [ ] Today's date highlighted correctly
- [ ] Available dates show green
- [ ] Slot count displays correctly
- [ ] Past dates are disabled
- [ ] Weekends are excluded/disabled
- [ ] Selected date highlighted

#### Time Slot Selection
- [ ] Clicking date shows time slots
- [ ] Time slots display with counsellor names
- [ ] Selected slot highlighted
- [ ] Only available slots selectable

#### Booking Process
- [ ] Form pre-fills with selection
- [ ] All form fields work correctly
- [ ] Type dropdown functions
- [ ] Duration dropdown functions
- [ ] Topic textarea works
- [ ] Confirm button disabled without selection
- [ ] Booking success message shows
- [ ] New consultation appears in "Upcoming"

#### Consultation Management
- [ ] Upcoming consultations list correctly
- [ ] Past consultations in "History" tab
- [ ] Status badges display correctly
- [ ] Meeting links clickable (external)
- [ ] "Add to Calendar" downloads .ICS file
- [ ] Cancel dialog works
- [ ] Cancellation reason captured
- [ ] Cancelled consultation updates status

#### Dashboard Integration
- [ ] Consultations widget shows on dashboard
- [ ] Correct count in widget
- [ ] "View All" link works
- [ ] "Book Consultation" button works
- [ ] Empty state displays when no consultations

## Advanced Features

### Calendar Export (.ICS Files)
- **Format:** iCalendar standard
- **Contents:**
  - Event title, description
  - Start and end times
  - Location (online/office)
  - Meeting link in description
  - Status: CONFIRMED
- **Compatibility:**
  - Google Calendar
  - Outlook/Office 365
  - Apple Calendar
  - Any iCal-compatible app

### Meeting Platform Integration (Ready)
- **Zoom:** Link, ID, password generated
- **Google Meet:** Link format ready
- **Microsoft Teams:** Link format ready
- **In-person:** Office location support

## Future Enhancements

### Phase 2
- [ ] Real-time reminders (24h, 1h before)
- [ ] Email notifications system
- [ ] SMS reminders (optional)
- [ ] Push notifications (mobile)
- [ ] Video call integration (embedded)
- [ ] In-app chat during meeting
- [ ] Screen sharing capability
- [ ] Meeting recording (with consent)

### Phase 3
- [ ] Recurring consultations
- [ ] Group consultations
- [ ] Waitlist for fully booked slots
- [ ] Automatic rescheduling suggestions
- [ ] AI-powered meeting summaries
- [ ] Calendar sync (Google/Outlook)
- [ ] Counsellor rating system
- [ ] Consultation feedback forms

## Performance Optimization

- Lazy loading of calendar days
- Debounced slot filtering
- Optimized re-renders
- Efficient date calculations
- Cached counsellor data
- Minimal API calls

## Security Considerations

- User authentication required
- API endpoints protected
- Meeting links secure
- Personal data encrypted
- No sensitive data in logs
- Access control per student

## Troubleshooting

### Common Issues

#### Calendar not loading
- Check API endpoint is running
- Verify mock data generation
- Check browser console for errors

#### Slots not showing
- Ensure date is not in the past
- Check if it's a weekend
- Verify slot generation logic

#### Booking fails
- Ensure all required fields filled
- Check slot is still available
- Verify studentId is correct

#### ICS download not working
- Check blob creation
- Verify ICS format
- Test in different browsers

## Conclusion

The Consultation Scheduler implementation provides a complete, user-friendly solution for students to book and manage consultations with counsellors. With an interactive calendar, real-time availability, meeting integration, and comprehensive management features, it streamlines the consultation booking process for both students and counsellors.

---

**Last Updated:** December 1, 2025  
**Version:** 1.0.0  
**Maintained By:** AJ NOVA Development Team
