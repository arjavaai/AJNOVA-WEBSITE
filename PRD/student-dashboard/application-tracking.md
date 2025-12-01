# Student Dashboard - Application Tracking

## Document Overview
This document details the Application Tracking feature that allows students to monitor their university application status in real-time.

---

## 1. Purpose

The Application Tracking module enables students to:
- View all university applications in one place
- Track application status for each university
- Monitor document submission status
- Receive real-time status updates
- View application decisions
- Access application timeline

---

## 2. Application Status Types

### 2.1 Status Definitions

**Applied:**
- Application submitted to university
- Initial submission confirmed
- Date recorded

**Documents Sent:**
- Required documents uploaded and sent
- Document checklist complete
- Verification pending

**Under Review:**
- University reviewing application
- Documents verified
- Awaiting decision

**Waiting for Decision:**
- Review process complete
- Decision pending
- Expected decision date (if available)

**Accepted:**
- Application approved
- Offer received
- Congratulations message displayed

**Rejected:**
- Application not approved
- Reason provided (if available)
- Alternative options suggested

**Withdrawn:**
- Student withdrew application
- Date recorded
- Reason (optional)

### 2.2 Status Flow
```
Applied → Documents Sent → Under Review → Waiting for Decision → Accepted/Rejected
```

---

## 3. UI Layout

### 3.1 Application List View

**Page Header:**
- "My University Applications" title
- Application count badge
- "Add Application" button (if admin creates)
- Filter/Sort options

**Application Cards:**
Each card displays:

**University Information:**
- University logo/name
- Program name
- Application ID/Reference number
- Application date

**Status Display:**
- Status badge (color-coded)
- Status text
- Last updated date/time
- Progress indicator

**Quick Actions:**
- "View Details" button
- "View Documents" link
- "Contact Counsellor" button

**Visual Indicators:**
- Green: Accepted
- Blue: In Progress
- Yellow: Waiting
- Red: Rejected
- Gray: Withdrawn

### 3.2 Application Detail View

**Header Section:**
- University name and logo
- Program name
- Application reference number
- Current status badge

**Timeline View:**
Visual timeline showing:
- Application submitted (date)
- Documents sent (date)
- Under review (date)
- Decision received (date)
- Each stage with icon and description

**Status Details:**
- Current status
- Status history
- Next steps
- Expected dates

**Document Checklist:**
- Required documents list
- Submission status for each:
  - ✅ Submitted
  - ⏳ Pending
  - ⚠ Missing
- Document upload links
- View submitted documents

**Application Information:**
- Application date
- Intake term
- Application channel (Direct/UniAssist)
- Counsellor assigned
- Notes/comments

**Actions:**
- Upload documents
- Contact counsellor
- View application PDF
- Download documents
- Withdraw application (if applicable)

### 3.3 Empty State
**When No Applications:**
- Illustration/image
- Message: "No applications yet"
- Description: "Complete your documents to start applying"
- "Generate Documents" button
- "Contact Counsellor" button

---

## 4. Application Management

### 4.1 Application Creation
**Note:** Applications are typically created by admin/counsellor, not students directly.

**Admin Creates Application:**
- Select student
- Choose university
- Select program
- Set application date
- Assign to counsellor
- Student receives notification

**Student View:**
- Application appears in dashboard
- Notification received
- Can view and track

### 4.2 Status Updates
**Update Sources:**
- Admin/counsellor manual updates
- Automated updates (if integrated)
- Document submission triggers
- Decision notifications

**Update Process:**
1. Status changes in admin panel
2. Student receives notification
3. Dashboard updates automatically
4. Timeline updated
5. Email notification sent (optional)

### 4.3 Document Submission
**Student Actions:**
- View required documents list
- Upload missing documents
- View submitted documents
- Track submission status

**Document Status:**
- Required: Document needed
- Uploaded: Student uploaded
- Verified: Counsellor verified
- Sent: Sent to university
- Accepted: University accepted

---

## 5. Timeline Visualization

### 5.1 Timeline Display
**Visual Timeline:**
- Horizontal or vertical timeline
- Milestone markers
- Date labels
- Status icons
- Connecting lines

**Timeline Stages:**
1. Application Submitted
   - Date
   - Icon
   - Description

2. Documents Sent
   - Date
   - Icon
   - Document list

3. Under Review
   - Start date
   - Duration
   - Expected completion

4. Decision Received
   - Date
   - Result (Accepted/Rejected)
   - Details

### 5.2 Timeline Features
- Interactive timeline
- Click to view details
- Hover for more info
- Expandable sections
- Print timeline (optional)

---

## 6. Notifications & Updates

### 6.1 Notification Types
**Status Change Notifications:**
- "Your application to [University] is now under review"
- "Decision received for [University]"
- "Documents verified for [University]"

**Reminder Notifications:**
- "Upload missing documents for [University]"
- "Decision expected soon for [University]"
- "Application deadline approaching"

**Action Required:**
- "Action needed: [Task]"
- "Counsellor message about [University]"
- "Document correction required"

### 6.2 Notification Display
**In Dashboard:**
- Notification badge count
- Recent notifications list
- Click to view application

**In Application:**
- Status change alerts
- Document reminders
- Counsellor messages

**Email Notifications:**
- Status change emails
- Important updates
- Decision notifications
- Reminder emails

---

## 7. Filters & Sorting

### 7.1 Filter Options
**By Status:**
- All Applications
- In Progress
- Accepted
- Rejected
- Waiting for Decision

**By Intake:**
- Winter 2025
- Summer 2026
- All Intakes

**By University:**
- Filter by university name
- Search functionality

### 7.2 Sort Options
- By Date (Newest First)
- By Date (Oldest First)
- By Status
- By University Name
- By Program Name

---

## 8. Integration Points

### 8.1 Document Center Integration
- Link to uploaded documents
- Show document status
- Upload from application page
- View document history

### 8.2 AI Documents Integration
- Link generated documents
- Show document approval status
- Use documents for application
- Track document usage

### 8.3 Messaging Integration
- Contact counsellor from application
- View application-related messages
- Receive updates via messages

### 8.4 Admin Dashboard Integration
- Counsellors update status
- Track application progress
- Manage multiple applications
- Generate reports

---

## 9. Decision Management

### 9.1 Accepted Applications
**Display:**
- Congratulations message
- Offer details
- Next steps:
  - Accept offer
  - Decline offer
  - Request extension
- Important dates
- Required actions

**Actions:**
- Download acceptance letter
- View offer details
- Contact counsellor
- Access post-acceptance services

### 9.2 Rejected Applications
**Display:**
- Supportive message
- Rejection reason (if provided)
- Alternative options:
  - Other universities
  - Improve profile
  - Reapply next intake
- Counsellor support offer

**Actions:**
- View feedback
- Contact counsellor
- Explore alternatives
- Request appeal (if applicable)

### 9.3 Multiple Acceptances
**Display:**
- All accepted applications
- Comparison feature (optional)
- Decision deadline
- Helpful guidance

**Actions:**
- Compare programs
- Accept one offer
- Decline others
- Request guidance

---

## 10. Analytics & Insights

### 10.1 Student View
**Personal Stats:**
- Total applications
- Accepted count
- Rejected count
- Acceptance rate
- Average decision time

**Visualizations:**
- Status distribution chart
- Timeline overview
- Success rate indicator

### 10.2 Admin View
- Aggregate statistics
- University performance
- Application trends
- Success rates

---

## 11. Mobile Responsiveness

### 11.1 Mobile Layout
- Card-based list view
- Swipe actions
- Simplified detail view
- Touch-friendly buttons
- Collapsible sections

### 11.2 Tablet Layout
- Two-column layout (optional)
- Maintained functionality
- Optimized spacing

---

## 12. User Experience

### 12.1 Clarity
- Clear status indicators
- Easy-to-understand timeline
- Obvious next steps
- Helpful guidance

### 12.2 Transparency
- Real-time updates
- Complete status history
- Document tracking
- Open communication

### 12.3 Support
- Easy counsellor contact
- Helpful resources
- FAQ section
- Guidance at each step

---

## 13. Technical Requirements

### 13.1 Real-Time Updates
- WebSocket connection (optional)
- Polling mechanism
- Push notifications
- Background sync

### 13.2 Data Management
- Store application data
- Status history
- Document links
- Timeline data

### 13.3 Performance
- Fast page loads
- Smooth interactions
- Efficient data fetching
- Optimized queries

---

**End of Application Tracking Documentation**

