# Student Dashboard - Consultation Scheduler

## Document Overview
This document details the Consultation Scheduler feature that allows students to book free consultations with counsellors.

---

## 1. Purpose

The Consultation Scheduler enables students to:
- Book free consultations with counsellors
- View scheduled meetings
- Reschedule or cancel appointments
- Receive meeting reminders
- Access meeting links (if online)
- View consultation history

---

## 2. Scheduling Interface

### 2.1 Consultation Booking Page
**Page Header:**
- "Book Your Free Consultation" title
- Description: "Schedule a one-on-one session with our expert counsellors"

**Booking Form:**
- **Preferred Date:** Date picker
- **Preferred Time:** Time slots dropdown
- **Duration:** 30 minutes / 60 minutes (default: 30)
- **Type:** Initial Consultation / Follow-up
- **Topic/Question:** Text area (optional)
- **Preferred Counsellor:** Dropdown (optional, or auto-assigned)

**Available Slots Display:**
- Calendar view showing available dates
- Time slots for selected date
- Counsellor availability
- Booked slots (grayed out)

**Action Button:**
- "Book Consultation" (primary)
- Confirmation required

### 2.2 Calendly Integration (Optional)
**Embedded Calendar:**
- Calendly widget embedded
- Shows available slots
- Direct booking
- Automatic confirmation

**Alternative:**
- Custom calendar implementation
- Real-time availability
- Counsellor calendar sync

---

## 3. Meeting Management

### 3.1 Scheduled Meetings View
**Meeting Card Display:**
- Date and time
- Counsellor name
- Meeting type
- Duration
- Status (Upcoming, Completed, Cancelled)
- Meeting link (if online)
- Actions

**Meeting Information:**
- Meeting ID/Reference
- Confirmation details
- Preparation notes
- Meeting agenda (if provided)

### 3.2 Meeting Actions
**Available Actions:**
- **View Details:** Full meeting information
- **Reschedule:** Change date/time
- **Cancel:** Cancel meeting
- **Join Meeting:** Access meeting link (if online)
- **Add to Calendar:** Download calendar file
- **Set Reminder:** Set personal reminder

### 3.3 Meeting Status
**Status Types:**
- **Scheduled:** Confirmed and upcoming
- **Completed:** Meeting finished
- **Cancelled:** Meeting cancelled
- **Rescheduled:** New time set
- **No Show:** Student didn't attend

---

## 4. Meeting Reminders

### 4.1 Reminder Types
**Email Reminders:**
- 24 hours before meeting
- 1 hour before meeting
- Custom reminder (optional)

**In-App Notifications:**
- Push notifications
- Dashboard notifications
- Notification badge

**SMS Reminders (Optional):**
- Text message reminder
- 2 hours before meeting

### 4.2 Reminder Content
**Reminder Information:**
- Meeting date and time
- Counsellor name
- Meeting link (if online)
- Preparation tips
- Reschedule/cancel options

---

## 5. Meeting Types

### 5.1 Initial Consultation
**Purpose:**
- First-time student meeting
- Eligibility discussion
- General guidance
- Service overview

**Duration:** 30-60 minutes
**Preparation:** Basic profile information

### 5.2 Follow-up Consultation
**Purpose:**
- Progress review
- Document discussion
- Application guidance
- Question answering

**Duration:** 30 minutes
**Preparation:** Review previous notes

### 5.3 Specialized Consultation
**Purpose:**
- Specific topic discussion
- Document review
- Application strategy
- Problem resolution

**Duration:** 30-60 minutes
**Preparation:** Topic-specific materials

---

## 6. Online Meeting Integration

### 6.1 Meeting Platforms
**Supported Platforms:**
- Zoom (primary)
- Google Meet (alternative)
- Microsoft Teams (optional)
- Custom video solution (optional)

### 6.2 Meeting Links
**Link Generation:**
- Automatic link creation
- Unique meeting ID
- Password protection (if required)
- Link sent via email

**Link Access:**
- Join button in dashboard
- Direct link in email
- Mobile-friendly access
- Browser compatibility

### 6.3 Meeting Features
**Video Conferencing:**
- Video and audio
- Screen sharing
- Chat functionality
- Recording (with consent)

**Meeting Room:**
- Waiting room
- Host controls
- Participant management
- Meeting notes

---

## 7. Consultation History

### 7.1 History View
**Past Consultations:**
- Date and time
- Counsellor name
- Meeting type
- Duration
- Notes/Summary
- Follow-up actions

**History Features:**
- Filter by date range
- Search by topic
- View meeting notes
- Download summary (if available)

### 7.2 Meeting Notes
**Notes Content:**
- Discussion points
- Decisions made
- Next steps
- Action items
- Counsellor recommendations

**Notes Access:**
- View in dashboard
- Download as PDF
- Share with student
- Add to profile

---

## 8. User Experience

### 8.1 Booking Flow
1. Student clicks "Schedule Consultation"
2. Views available slots
3. Selects date and time
4. Fills optional information
5. Confirms booking
6. Receives confirmation
7. Receives calendar invite
8. Gets reminders

### 8.2 Rescheduling Flow
1. Student views scheduled meeting
2. Clicks "Reschedule"
3. Views new available slots
4. Selects new date/time
5. Confirms reschedule
6. Receives updated confirmation
7. Original meeting cancelled

### 8.3 Cancellation Flow
1. Student views scheduled meeting
2. Clicks "Cancel"
3. Confirms cancellation
4. Receives cancellation confirmation
5. Slot becomes available
6. Counsellor notified

---

## 9. Integration Points

### 9.1 Dashboard Integration
- Display upcoming meetings on dashboard
- Quick access to scheduler
- Meeting reminders
- Status updates

### 9.2 Admin Dashboard Integration
- Counsellors view their schedule
- Manage availability
- View student bookings
- Add meeting notes

### 9.3 Email Integration
- Confirmation emails
- Reminder emails
- Cancellation emails
- Calendar invites

---

## 10. Mobile Responsiveness

### 10.1 Mobile Layout
- Simplified calendar view
- Touch-friendly date picker
- Easy booking process
- Mobile-optimized meeting access

### 10.2 Tablet Layout
- Full calendar functionality
- Optimized spacing
- Maintained features

---

## 11. Technical Requirements

### 11.1 Calendar Integration
- Google Calendar sync (optional)
- Outlook Calendar sync (optional)
- iCal format support
- Timezone handling

### 11.2 Availability Management
- Real-time availability
- Counsellor calendar sync
- Blocked time slots
- Buffer time between meetings

### 11.3 Notification System
- Email notifications
- In-app notifications
- SMS (optional)
- Push notifications (mobile)

---

## 12. Analytics

### 12.1 Booking Metrics
- Total consultations booked
- Cancellation rate
- Rescheduling rate
- Average booking lead time
- Peak booking times

### 12.2 Meeting Metrics
- Completion rate
- No-show rate
- Average meeting duration
- Student satisfaction
- Counsellor utilization

---

**End of Consultation Scheduler Documentation**

