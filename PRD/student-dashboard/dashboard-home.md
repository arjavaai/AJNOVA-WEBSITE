# Student Dashboard - Home Page

## Document Overview
This document details the specifications for the Student Dashboard home page, which serves as the main landing area after login.

---

## 1. Purpose

The Dashboard Home page provides students with:
- A welcoming overview of their application status
- Quick access to key features
- Progress visualization
- Recent activity and notifications
- Next-step guidance

---

## 2. Page Layout

### 2.1 Header Section
**Components:**
- **Logo:** AJ NOVA logo (left)
- **Navigation Menu:**
  - Dashboard (active)
  - Profile
  - Documents
  - Applications
  - Messages
  - Settings
- **User Profile:** 
  - Profile picture/avatar
  - Dropdown menu:
    - View Profile
    - Account Settings
    - Logout
- **Notifications Icon:** Bell icon with badge count

**Design:**
- Sticky header
- Consistent with overall platform design
- Mobile: Collapsible menu

### 2.2 Welcome Section
**Content:**
- **Greeting:** "Welcome back, [First Name]!"
- **Subtext:** "Your application progress is automatically saved. Continue from where you left off."
- **Date/Time:** Current date display (optional)

**Design:**
- Personal and friendly tone
- Prominent but not overwhelming
- Optional motivational quote

### 2.3 Progress Overview Bar
**Visual Tracker:**
Display all stages in a horizontal progress bar:

```
[Consultation] → [Eligibility] → [APS] → [AI Docs] → [Review] → [Submission]
```

**Features:**
- Each stage lights up when complete (green checkmark)
- Current stage highlighted (blue/active color)
- Upcoming stages grayed out
- Clickable stages (navigate to relevant section)
- Percentage completion shown

**Status Indicators:**
- ✅ Completed
- 🔄 In Progress
- ⏳ Pending
- ❌ Needs Action

### 2.4 Quick Action Buttons
**Primary Actions:**
1. **Continue My Application**
   - Leads to next incomplete step
   - Dynamic based on progress
   - Prominent button

2. **View My Documents**
   - Direct link to Document Center
   - Shows count of documents

3. **Schedule a Consultation**
   - Opens consultation scheduler
   - Shows next available slots

4. **Chat with Counsellor**
   - Opens messaging interface
   - Shows unread message count

**Design:**
- Grid layout (2x2 on desktop)
- Large, touch-friendly buttons
- Icons + text labels
- Mobile: Stacked layout

### 2.5 Profile Summary Card
**Content:**
- **Profile Completion:** Percentage indicator (e.g., "Profile 85% Complete")
- **Status Badge:** 
  - Active (green)
  - Under Review (yellow)
  - Verified (green with checkmark)
- **Actions:**
  - "Edit Profile" button
  - "Download My Profile (PDF)" button

**Additional Info:**
- "Complete your profile to unlock next steps like document generation."
- Missing fields indicator (if < 100%)

**Design:**
- Card layout with subtle border
- Progress bar visualization
- Clear action buttons

### 2.6 Eligibility Results Card
**Content:**
- **Title:** "Your Eligibility Result"
- **Badge Display:**
  - ✅ Public University Eligible (green)
  - ⚠ Private Eligible (amber/yellow)
  - ❌ Needs Improvement (red)
- **Readiness Score:** XX% with visual meter
- **Explanation:** Brief text based on results

**Actions:**
- "Book a Free Consultation" button
- "Improve My Profile" button (redirects to profile editor)

**Design:**
- Prominent card
- Color-coded badges
- Visual score meter

### 2.7 APS Form Summary Card
**Content:**
- **Section Title:** "APS Verification"
- **Current Status:**
  - Not Started
  - Submitted
  - Under Review
  - Verified ✅
  - Needs Correction ⚠

**Document Status Table:**
| Document Uploaded | Status |
|-------------------|--------|
| Degree Certificate | ✅ Reviewed |
| Transcripts | ✅ Verified |
| Passport | ⚠ Needs Correction |

**Actions:**
- "Upload New File" button
- "View APS Form" button
- "View Details" link

**Success Message (when verified):**
"Your APS documents are verified. Great job — you're ready for the next step!"

**Design:**
- Card with status indicators
- Table for document list
- Clear action buttons

### 2.8 AI Document Generation Section
**Content:**
- **Heading:** "Create Your Admission Documents"
- **Document Tiles:** Four tiles for:
  1. Statement of Purpose (SOP)
  2. Letter of Recommendation (LOR)
  3. Resume/CV
  4. Cover Letter

**Each Tile Displays:**
- Document name
- Status (Not Started / Draft / Approved)
- Last updated date
- Action button:
  - "Generate" (if not started)
  - "View Draft" (if exists)
  - "Edit" (if draft exists)
  - "Download" (if approved)

**Guidance Note:**
"Edit freely — AI gives you structure, but your story makes it shine."

**Design:**
- Grid layout (2x2)
- Card-based design
- Status indicators
- Hover effects

### 2.9 Application Status Section
**Content:**
- **Title:** "My University Applications"
- **Application Cards:** One card per university application

**Each Application Card Shows:**
- University name
- Program name
- Application status:
  - Applied
  - Documents Sent
  - Under Review
  - Waiting for Decision
  - Accepted ✅
  - Rejected ❌
- Application date
- Last update date
- "View Details" link

**Empty State:**
"No applications yet. Complete your documents to start applying."

**Design:**
- List or card layout
- Status badges
- Chronological order

### 2.10 Notifications Panel
**Content:**
- **Title:** "Recent Notifications"
- **Notification List:** Last 5-10 notifications
- **Each Notification Shows:**
  - Icon (type-based)
  - Title/Message
  - Timestamp
  - Read/Unread indicator
  - Link to related section

**Notification Types:**
- Document approved
- APS verified
- Counsellor message
- Application update
- Meeting reminder
- System announcement

**Actions:**
- "View All Notifications" link
- Mark as read
- Delete notification

**Design:**
- Side panel or dropdown
- Unread badge count
- Clickable items

### 2.11 Recent Activity Feed
**Content:**
- **Title:** "Recent Activity"
- **Activity Items:**
  - "You uploaded APS documents"
  - "Your SOP was approved"
  - "Counsellor sent a message"
  - "Application status updated"
- **Timestamps:** Relative time (e.g., "2 hours ago")

**Design:**
- Timeline or list layout
- Icons for activity types
- Chronological order

### 2.12 Upcoming Events/Reminders
**Content:**
- **Title:** "Upcoming Events"
- **Items:**
  - Scheduled consultations
  - Document deadlines
  - Application deadlines
  - Meeting reminders

**Design:**
- Calendar widget or list
- Date highlighting
- Action buttons (Reschedule, etc.)

### 2.13 Quick Stats Widget (Optional)
**Content:**
- Documents uploaded: X
- Documents approved: Y
- Applications submitted: Z
- Days until next deadline: N

**Design:**
- Small stat cards
- Visual indicators
- Compact layout

### 2.14 Footer
**Content:**
- Quick links (Privacy Policy, Terms, Support)
- Language selector (English, German, Hindi)
- Copyright notice

---

## 3. Responsive Design

### 3.1 Desktop Layout
- Multi-column grid
- Sidebar navigation (optional)
- All sections visible
- Hover effects

### 3.2 Tablet Layout
- Adjusted grid (2 columns)
- Collapsible sections
- Touch-friendly buttons
- Maintained functionality

### 3.3 Mobile Layout
- Single column stack
- Hamburger menu
- Collapsible cards
- Bottom navigation (optional)
- Swipe gestures

---

## 4. User Interactions

### 4.1 Click Actions
- Cards are clickable (navigate to detail pages)
- Buttons trigger specific actions
- Links open relevant sections
- Status indicators show tooltips

### 4.2 Hover Effects
- Card elevation
- Button highlight
- Link underline
- Tooltip display

### 4.3 Loading States
- Skeleton screens during data load
- Progress indicators
- Smooth transitions

### 4.4 Empty States
- Helpful messages
- Guidance text
- Action buttons
- Illustrations (optional)

---

## 5. Data Requirements

### 5.1 Student Data
- Profile information
- Progress status
- Document counts
- Application data

### 5.2 Real-Time Updates
- WebSocket connection (optional)
- Polling for updates
- Push notifications

### 5.3 Caching
- Cache dashboard data
- Refresh on login
- Background sync

---

## 6. Performance Considerations

### 6.1 Load Time
- Lazy load images
- Paginate long lists
- Optimize API calls
- Cache static content

### 6.2 Updates
- Incremental updates
- Debounce API calls
- Optimistic UI updates

---

## 7. Accessibility

### 7.1 Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate
- Arrow keys for lists

### 7.2 Screen Readers
- ARIA labels
- Semantic HTML
- Alt text for icons
- Status announcements

### 7.3 Visual
- High contrast
- Large touch targets
- Clear focus indicators

---

**End of Dashboard Home Documentation**

