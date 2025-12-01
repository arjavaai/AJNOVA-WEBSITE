# Admin Dashboard - Complete Documentation

## Document Overview
This document provides comprehensive specifications for the Admin Dashboard, which serves as the central control panel for counsellors and administrators to manage students, review documents, track applications, and oversee platform operations.

---

## 1. Overview

### 1.1 Purpose
The Admin Dashboard enables counsellors and administrators to:
- Manage leads and student accounts
- Review and approve documents (APS, AI-generated documents)
- Track student progress and applications
- Schedule and manage consultations
- Update university application status
- Monitor service tracking (Blocked Account, Health Insurance, Loans, etc.)
- Access analytics and reporting
- Configure system settings

### 1.2 User Roles
**Counsellor:**
- View assigned students
- Review documents
- Verify APS submissions
- Schedule meetings
- Update application status
- Communicate with students

**Admin/Super Admin:**
- All counsellor permissions
- User management
- System settings
- Analytics access
- Lead assignment
- Service tracking
- University management

---

## 2. Dashboard Home

### 2.1 Overview Widgets
**Key Metrics:**
- Total Active Students
- Pending Reviews
- Upcoming Consultations
- Recent Applications
- Document Approval Rate
- Student Satisfaction Score

**Quick Actions:**
- Review Pending Documents
- Schedule Consultation
- Add New Student
- View Analytics

**Recent Activity Feed:**
- Latest student actions
- Document submissions
- Status changes
- System notifications

### 2.2 Navigation Menu
**Main Sections:**
- Dashboard (Home)
- Students
- Leads
- Documents (Review Queue)
- Applications
- Consultations
- Services
- Analytics
- Settings
- Messages

---

## 3. Student Management

### 3.1 Student List View
**Table Columns:**
- Student Name
- Email
- Phone
- Status (Active, Inactive, Pending)
- Profile Completion %
- APS Status
- Documents Status
- Assigned Counsellor
- Last Activity
- Actions

**Filters:**
- By Status
- By Counsellor
- By Intake
- By Country
- Search by name/email

**Actions:**
- View Profile
- Assign Counsellor
- Send Message
- View Documents
- View Applications
- Deactivate Account

### 3.2 Student Detail View
**Profile Information:**
- Complete student profile
- Contact details
- Academic background
- Language scores
- Work experience
- Uploaded documents

**Progress Tracking:**
- Eligibility status
- APS verification status
- Document completion
- Application status
- Overall progress

**Actions:**
- Edit Profile (if needed)
- Add Notes
- Assign to Counsellor
- Update Status
- Send Notification

### 3.3 Student Assignment
**Assignment Features:**
- Assign student to counsellor
- Reassign students
- View counsellor workload
- Balance assignments
- Assignment history

---

## 4. Lead Management

### 4.1 Lead List View
**Lead Sources:**
- Contact form submissions
- Consultation requests
- Eligibility checker users
- Referrals

**Lead Information:**
- Name
- Email
- Phone
- Source
- Status (New, Contacted, Qualified, Converted, Lost)
- Assigned To
- Created Date
- Last Contact

**Lead Actions:**
- Assign to Counsellor
- Convert to Student
- Add Notes
- Schedule Follow-up
- Mark as Lost

### 4.2 Lead Qualification
**Qualification Criteria:**
- Eligibility score
- Profile completeness
- Engagement level
- Consultation attendance

**Qualification Workflow:**
1. New lead created
2. Initial contact
3. Eligibility assessment
4. Qualification decision
5. Convert to student or mark as lost

---

## 5. Document Review System

### 5.1 Review Queue
**Pending Reviews:**
- APS Forms (pending verification)
- AI-Generated Documents (SOP, LOR, Resume, Cover Letter)
- Uploaded Documents (verification needed)

**Queue Display:**
- Document type
- Student name
- Submission date
- Priority level
- Estimated review time
- Actions

**Filters:**
- By document type
- By student
- By date
- By priority
- By counsellor

### 5.2 APS Verification
**Verification Process:**
1. View submitted APS form
2. Review uploaded documents
3. Verify information accuracy
4. Check document quality
5. Approve or request corrections
6. Add comments/notes
7. Update status

**Verification Checklist:**
- Personal information verified
- Academic documents verified
- Language certificates verified
- Documents readable and complete
- Information matches official records

**Actions:**
- Approve APS
- Request Corrections
- Add Comments
- View Document History
- Download Documents

### 5.3 AI Document Review
**Review Interface:**
- Display AI-generated document
- Side-by-side comparison (optional)
- Edit document (if needed)
- Add comments/feedback
- Approve or request revision

**Review Features:**
- Highlight sections
- Add inline comments
- Suggest improvements
- Track revision history
- Compare versions

**Approval Workflow:**
1. Review document content
2. Check formatting
3. Verify information accuracy
4. Add feedback (if needed)
5. Approve or request revision
6. Notify student

---

## 6. Application Management

### 6.1 Application List
**Application Information:**
- Student name
- University name
- Program name
- Application status
- Submission date
- Decision date
- Assigned counsellor

**Status Management:**
- Update application status
- Add status notes
- Set decision dates
- Track timeline

### 6.2 Application Detail View
**Application Information:**
- Complete application details
- Linked documents
- Status history
- Timeline
- Notes/comments

**Status Updates:**
- Change status
- Add notes
- Set reminders
- Notify student
- Update timeline

### 6.3 University Management
**University Information:**
- University name
- Programs offered
- Application deadlines
- Requirements
- Contact information

**University Updates:**
- Add new universities
- Update information
- Set deadlines
- Manage programs
- Track applications

---

## 7. Consultation Management

### 7.1 Consultation Calendar
**Calendar View:**
- Monthly/weekly/daily views
- Scheduled consultations
- Available slots
- Counsellor assignments
- Student information

**Consultation Information:**
- Student name
- Date and time
- Duration
- Type (Initial, Follow-up)
- Status (Scheduled, Completed, Cancelled)
- Meeting link (if online)

**Actions:**
- Schedule consultation
- Reschedule
- Cancel
- Add notes
- Mark as completed
- Send reminders

### 7.2 Consultation Scheduling
**Scheduling Features:**
- Select student
- Choose date/time
- Assign counsellor
- Set duration
- Add notes
- Send confirmation

**Integration:**
- Calendly integration (optional)
- Google Calendar sync
- Email notifications
- Reminder system

### 7.3 Consultation History
**History View:**
- Past consultations
- Notes and outcomes
- Follow-up actions
- Student feedback
- Performance metrics

---

## 8. Service Tracking

### 8.1 Service Types
**Services Tracked:**
- Blocked Account
- Health Insurance
- Course Selection
- On-Arrival Services:
  - Airport Pickup
  - Bank Account Opening
  - SIM Cards
  - Accommodation
- Loans
- Flight Bookings
- APS Verification
- Visa Application

### 8.2 Service Management
**Service Tracking:**
- Service type
- Student name
- Status (Not Started, In Progress, Completed)
- Start date
- Completion date
- Notes
- Documents

**Service Actions:**
- Add service
- Update status
- Add notes
- Upload documents
- Mark as completed
- Generate reports

### 8.3 Service Dashboard
**Overview:**
- Active services count
- Completion rate
- Pending services
- Service performance
- Revenue tracking (if applicable)

---

## 9. Analytics & Reporting

### 9.1 Analytics Dashboard
**Key Metrics:**
- Total Students
- Active Applications
- Document Approval Rate
- APS Verification Rate
- Consultation Rate
- Conversion Rate
- Student Satisfaction

**Visualizations:**
- Charts and graphs
- Trend analysis
- Performance indicators
- Comparative data

### 9.2 Reports
**Report Types:**
- Student Progress Report
- Document Review Report
- Application Status Report
- Counsellor Performance Report
- Service Utilization Report
- Financial Report (if applicable)

**Report Features:**
- Date range selection
- Filter options
- Export (PDF, CSV, Excel)
- Scheduled reports
- Email delivery

### 9.3 Performance Metrics
**Counsellor Metrics:**
- Students assigned
- Documents reviewed
- Average review time
- Approval rate
- Student satisfaction

**Platform Metrics:**
- User growth
- Engagement rates
- Feature usage
- System performance
- Error rates

---

## 10. Messaging & Communication

### 10.1 Inbox
**Message List:**
- Unread messages
- All messages
- By student
- By counsellor
- Search functionality

**Message Features:**
- Send message
- Reply to message
- Attach files
- Mark as read/unread
- Archive messages
- Delete messages

### 10.2 Student Communication
**Communication Channels:**
- In-app messaging
- Email notifications
- SMS (optional)
- WhatsApp (optional)

**Message Templates:**
- Welcome message
- Document approval
- Status updates
- Reminders
- Custom templates

---

## 11. System Settings

### 11.1 General Settings
**Configuration:**
- Organization name
- Logo
- Contact information
- Timezone
- Language settings
- Date/time formats

### 11.2 User Management
**User Administration:**
- Add users (counsellors, admins)
- Edit user information
- Assign roles
- Deactivate users
- Reset passwords
- Manage permissions

### 11.3 Automation Settings
**Automation Configuration:**
- Email notifications
- Reminder settings
- Auto-assignment rules
- Status update triggers
- Report scheduling

### 11.4 Security Settings
**Security Configuration:**
- Password policies
- Session timeout
- Two-factor authentication
- Access logs
- Audit trails

---

## 12. UI/UX Design

### 12.1 Layout Principles
- Clean, professional design
- Intuitive navigation
- Clear information hierarchy
- Efficient workflows
- Responsive design

### 12.2 Color Coding
- Green: Approved/Completed
- Yellow: Pending/In Progress
- Red: Rejected/Urgent
- Blue: Information/Active
- Gray: Inactive/Cancelled

### 12.3 Responsive Design
- Desktop: Full functionality
- Tablet: Optimized layout
- Mobile: Essential features

---

## 13. Technical Requirements

### 13.1 Performance
- Fast page loads
- Efficient data queries
- Real-time updates
- Smooth interactions

### 13.2 Security
- Role-based access control
- Secure authentication
- Encrypted data
- Audit logging

### 13.3 Integration
- Student dashboard integration
- Email service integration
- Calendar integration
- Analytics integration

---

## 14. Workflow Examples

### 14.1 New Student Onboarding
1. Lead converts to student
2. Student creates profile
3. Counsellor reviews profile
4. Student checks eligibility
5. Student submits APS form
6. Counsellor verifies APS
7. Student generates documents
8. Counsellor reviews documents
9. Application process begins

### 14.2 Document Review Workflow
1. Student submits document
2. Document appears in review queue
3. Counsellor assigned (if not auto-assigned)
4. Counsellor reviews document
5. Counsellor approves or requests revision
6. Student notified
7. If revision needed: Student updates and resubmits
8. Process repeats until approved

### 14.3 Application Management Workflow
1. Student completes documents
2. Counsellor creates application
3. Application status: Applied
4. Documents sent to university
5. Status: Documents Sent
6. University reviews
7. Status: Under Review
8. Decision received
9. Status: Accepted/Rejected
10. Student notified

---

**End of Admin Dashboard Documentation**

