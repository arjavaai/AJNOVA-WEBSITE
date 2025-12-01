# AJ NOVA - Project Architecture & Flow Documentation

## Document Overview
This comprehensive document covers the complete project architecture, system flow, user journeys, and technical implementation details for the AJ NOVA platform.

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Project Flow - Complete Journey](#4-project-flow---complete-journey)
5. [Student Dashboard Flow](#5-student-dashboard-flow)
6. [Admin Dashboard Flow](#6-admin-dashboard-flow)
7. [Data Flow Architecture](#7-data-flow-architecture)
8. [Integration Architecture](#8-integration-architecture)
9. [Database Schema Overview](#9-database-schema-overview)
10. [API Architecture](#10-api-architecture)
11. [Authentication Flow](#11-authentication-flow)
12. [Document Processing Flow](#12-document-processing-flow)
13. [AI Integration Flow](#13-ai-integration-flow)
14. [Notification System Flow](#14-notification-system-flow)

---

## 1. Project Overview

### 1.1 Platform Purpose
AJ NOVA is a comprehensive digital admissions platform that streamlines the entire German university application process for international students. The platform combines AI-powered document generation, automated workflows, and personalized counselling to provide a seamless experience from initial consultation to university acceptance.

### 1.2 Core Components
- **Public Website:** Landing page, Services page, Contact page
- **Student Dashboard:** Personal workspace for applicants
- **Admin Dashboard:** Management system for counsellors and administrators
- **AI Document Generation:** Automated SOP, LOR, Resume, Cover Letter creation
- **Application Tracking:** Real-time status monitoring
- **Communication System:** Messaging and consultation scheduling

### 1.3 Key Users
- **Students:** International applicants seeking German university admission
- **Counsellors:** Assigned advisors who guide students
- **Admins:** Platform administrators managing operations

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Web Browser (React/Next.js)                                │
│  - Landing Pages                                             │
│  - Student Dashboard                                          │
│  - Admin Dashboard                                            │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/TLS 1.3
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  Backend API (Node.js/Python)                                │
│  - RESTful API Endpoints                                     │
│  - Authentication Service                                    │
│  - Document Processing Service                               │
│  - AI Integration Service                                    │
│  - Notification Service                                      │
│  - File Upload Service                                       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  Database (Firebase/Supabase)                               │
│  - User Data                                                 │
│  - Application Data                                          │
│  - Document Metadata                                         │
│  - Analytics Data                                            │
│                                                              │
│  File Storage (Firebase Storage/Supabase Storage)           │
│  - Uploaded Documents                                       │
│  - Generated Documents                                       │
│  - Profile Images                                            │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────┤
│  - Google OAuth (Authentication)                            │
│  - Google Gemini API (AI Document Generation)                │
│  - Email Service (SendGrid/AWS SES)                         │
│  - Calendly (Consultation Scheduling)                       │
│  - Analytics (Google Analytics)                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Component Architecture

**Frontend Components:**
- Public Pages (Landing, Services, Contact)
- Student Dashboard (Profile, Documents, Applications, Messages)
- Admin Dashboard (Students, Reviews, Analytics, Settings)
- Shared Components (Navigation, Forms, Modals)

**Backend Services:**
- Authentication Service
- User Management Service
- Document Management Service
- AI Processing Service
- Notification Service
- Analytics Service
- File Storage Service

**Database Collections/Tables:**
- Users (Students, Counsellors, Admins)
- Profiles (Student profiles)
- Applications (University applications)
- Documents (Document metadata)
- Messages (Conversations)
- Consultations (Meetings)
- Leads (Lead management)
- Analytics (Metrics and reports)

---

## 3. Technology Stack

### 3.1 Frontend
- **Framework:** Vite React or Next.js
- **State Management:** React Context API or Redux
- **UI Library:** Material-UI, Ant Design, or Custom Components
- **Styling:** Tailwind CSS or CSS Modules
- **Routing:** React Router (React) or Next.js Router
- **Forms:** React Hook Form or Formik
- **HTTP Client:** Axios or Fetch API

### 3.2 Backend
- **Runtime:** Node.js or Python
- **Framework:** Express.js (Node.js) or FastAPI/Django (Python)
- **API:** RESTful API
- **Authentication:** JWT or Session-based
- **File Upload:** Multer (Node.js) or equivalent

### 3.3 Database
- **Primary:** Firebase Firestore or Supabase PostgreSQL
- **File Storage:** Firebase Storage or Supabase Storage
- **Real-time:** Firebase Realtime Database or Supabase Realtime

### 3.4 External Integrations
- **Authentication:** Google OAuth 2.0
- **AI/LLM:** Google Gemini API
- **Email:** SendGrid, AWS SES, or similar
- **Scheduling:** Calendly API (optional)
- **Analytics:** Google Analytics

### 3.5 Hosting & Deployment
- **Frontend:** Vercel (with SSL)
- **Backend:** Vercel, AWS, or similar
- **Database:** Managed by Firebase/Supabase
- **CDN:** Vercel Edge Network or CloudFront

---

## 4. Project Flow - Complete Journey

### 4.1 Overall User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                              │
│  - Visitor arrives                                           │
│  - Views services and value proposition                     │
│  - Options:                                                 │
│    • Check Eligibility                                       │
│    • Book Consultation                                       │
│    • Contact Form                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ELIGIBILITY CHECKER (Optional)                 │
│  - Quick assessment                                          │
│  - Readiness score                                           │
│  - Recommendations                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              CONSULTATION REQUEST                           │
│  - Fill consultation form                                    │
│  - Select date/time                                          │
│  - Receive confirmation                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              FREE CONSULTATION                              │
│  - Meet with counsellor                                     │
│  - Discuss goals and options                                 │
│  - Get initial guidance                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              REGISTRATION & LOGIN                           │
│  - Google OAuth login                                        │
│  - Account created automatically                             │
│  - Redirected to Student Dashboard                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              PROFILE CREATION                               │
│  - Complete personal information                             │
│  - Add academic background                                   │
│  - Upload documents                                          │
│  - Track completion %                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ELIGIBILITY CHECKER                            │
│  - Complete eligibility form                                │
│  - Get readiness score                                       │
│  - View recommendations                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              APS FORM SUBMISSION                           │
│  - Fill APS verification form                               │
│  - Upload required documents                                │
│  - Submit for review                                         │
│  - Track verification status                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              AI DOCUMENT GENERATION                        │
│  - Generate SOP                                              │
│  - Generate LOR                                              │
│  - Generate Resume                                           │
│  - Generate Cover Letter                                     │
│  - Edit and customize                                        │
│  - Submit for counsellor review                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              DOCUMENT REVIEW & APPROVAL                    │
│  - Counsellor reviews documents                             │
│  - Approves or requests revision                           │
│  - Student receives feedback                                │
│  - Final documents approved                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              UNIVERSITY APPLICATION                         │
│  - Admin creates application                                │
│  - Documents linked                                          │
│  - Application submitted                                     │
│  - Status tracked                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              APPLICATION DECISION                           │
│  - University reviews                                        │
│  - Decision received                                         │
│  - Status updated                                            │
│  - Student notified                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              POST-ACCEPTANCE SERVICES                      │
│  - Blocked Account setup                                     │
│  - Health Insurance                                          │
│  - Visa application                                          │
│  - Pre-departure orientation                                 │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Detailed Stage Breakdown

#### Stage 1: Initial Engagement
**Flow:**
1. Visitor lands on landing page
2. Views services and value proposition
3. Options:
   - Check eligibility (leads to eligibility checker)
   - Book consultation (leads to consultation form)
   - Contact form (creates lead)
4. Lead created in CRM (if contact form submitted)

**Data Flow:**
- Contact form → Backend API → Database (Leads collection)
- Email notification sent to admin
- Lead appears in admin dashboard

#### Stage 2: Consultation & Assessment
**Flow:**
1. Student books consultation via form or Calendly
2. Consultation scheduled
3. Meeting conducted (online or offline)
4. Eligibility assessment completed
5. Student decides to proceed

**Data Flow:**
- Consultation request → Database (Consultations collection)
- Calendar integration (Calendly or custom)
- Email confirmations sent
- Counsellor notified

#### Stage 3: Registration & Profile Creation
**Flow:**
1. Student clicks "Get Started" or "Login"
2. Google OAuth authentication
3. Account created automatically
4. Redirected to Student Dashboard
5. Profile creation initiated
6. Student completes profile sections:
   - Personal Information
   - Academic Background
   - Language Scores
   - Work Experience
   - Document Uploads

**Data Flow:**
- Google OAuth → Backend → User account created
- Profile data → Database (Users & Profiles collections)
- File uploads → Storage (Firebase Storage/Supabase Storage)
- Profile completion % calculated

#### Stage 4: Eligibility & APS
**Flow:**
1. Student completes eligibility checker
2. Receives readiness score and recommendations
3. Student submits APS form
4. Uploads required documents
5. Form submitted for counsellor review
6. Counsellor verifies APS submission
7. Status updated to "Verified"

**Data Flow:**
- Eligibility data → Database (Eligibility results)
- APS form data → Database (APS submissions)
- Documents → Storage
- Notification → Counsellor
- Verification status → Database → Student Dashboard

#### Stage 5: Document Generation
**Flow:**
1. Student profile reaches 80% completion
2. Student selects document type (SOP, LOR, Resume, Cover Letter)
3. Provides additional inputs (university, program, etc.)
4. Clicks "Generate Document"
5. AI processes request (Gemini API)
6. Document generated and displayed
7. Student edits if needed
8. Student submits for review
9. Counsellor reviews and approves/rejects
10. Final document ready

**Data Flow:**
- Document request → Backend → Gemini API
- AI response → Backend → Database (Documents collection)
- Document stored → Storage
- Review workflow → Database
- Approval status → Student Dashboard

#### Stage 6: Application Processing
**Flow:**
1. Documents approved
2. Admin creates university application
3. Links documents to application
4. Application submitted to university
5. Status tracked: Applied → Documents Sent → Under Review → Decision
6. Student receives updates
7. Decision received and updated

**Data Flow:**
- Application creation → Database (Applications collection)
- Document linking → Database
- Status updates → Database → Student Dashboard
- Notifications → Email & In-app

---

## 5. Student Dashboard Flow

### 5.1 Dashboard Entry Flow

```
┌─────────────────────────────────────────────────────────────┐
│              STUDENT LOGS IN                                │
│  - Google OAuth                                              │
│  - Session created                                           │
│  - Redirected to Dashboard Home                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              DASHBOARD HOME                                │
│  - Welcome message                                           │
│  - Progress overview bar                                      │
│  - Quick action buttons                                      │
│  - Recent activity                                           │
│  - Notifications                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌──────────────────┴──────────────────┐
        ↓                                      ↓
┌──────────────────────┐          ┌──────────────────────┐
│  PROFILE INCOMPLETE  │          │  PROFILE COMPLETE    │
│  → Profile Creation  │          │  → Continue Journey  │
└──────────────────────┘          └──────────────────────┘
```

### 5.2 Complete Student Dashboard Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD HOME                          │
│  Components:                                                 │
│  - Progress Tracker                                          │
│  - Quick Actions                                             │
│  - Profile Summary                                           │
│  - Eligibility Results                                       │
│  - APS Status                                                │
│  - AI Documents Status                                       │
│  - Application Status                                        │
│  - Notifications                                             │
└─────────────────────────────────────────────────────────────┘
        │
        ├──────────────────────────────────────────────────────┐
        │                                                      │
        ↓                                                      ↓
┌──────────────────────┐                        ┌──────────────────────┐
│   PROFILE SECTION   │                        │  ELIGIBILITY CHECKER │
│  - View/Edit Profile │                        │  - Check Eligibility │
│  - Upload Documents  │                        │  - View Results      │
│  - Track Completion  │                        │  - Get Recommendations│
└──────────────────────┘                        └──────────────────────┘
        │                                                      │
        ↓                                                      ↓
┌──────────────────────┐                        ┌──────────────────────┐
│     APS FORM         │                        │  AI DOCUMENTS        │
│  - Fill APS Form     │                        │  - Generate SOP       │
│  - Upload Documents  │                        │  - Generate LOR       │
│  - Track Status       │                        │  - Generate Resume    │
│  - View Verification  │                        │  - Generate Cover Ltr │
└──────────────────────┘                        │  - Edit Documents     │
        │                                      │  - Submit for Review  │
        ↓                                      └──────────────────────┘
┌──────────────────────┐                                  │
│  DOCUMENT CENTER     │                                  │
│  - View All Docs     │                                  │
│  - Upload Docs       │                                  │
│  - Download Docs     │                                  │
│  - Track Status      │                                  │
└──────────────────────┘                                  │
        │                                                  │
        ↓                                                  ↓
┌─────────────────────────────────────────────────────────────┐
│              APPLICATION TRACKING                          │
│  - View Applications                                        │
│  - Track Status                                             │
│  - View Timeline                                            │
│  - Receive Updates                                          │
└─────────────────────────────────────────────────────────────┘
        │
        ├──────────────────────────────────────────────────────┐
        │                                                      │
        ↓                                                      ↓
┌──────────────────────┐                        ┌──────────────────────┐
│  CONSULTATION        │                        │  MESSAGING          │
│  - Book Meeting      │                        │  - Send Messages     │
│  - View Schedule      │                        │  - View History      │
│  - Reschedule/Cancel  │                        │  - Attach Files      │
└──────────────────────┘                        └──────────────────────┘
```

### 5.3 Feature-Specific Flows

#### Profile Creation Flow
```
Login → Dashboard → Profile Section
  ↓
View Profile Completion %
  ↓
Click "Edit Profile"
  ↓
Fill Sections:
  - Personal Information
  - Academic Background
  - Language Scores
  - Work Experience
  - Document Uploads
  ↓
Save Profile
  ↓
Profile Completion % Updated
  ↓
If 80%+ → Can Generate AI Documents
```

#### APS Form Flow
```
Dashboard → APS Form Section
  ↓
View APS Status
  ↓
If Not Started → Click "Start APS Form"
  ↓
Fill Form Sections:
  - Personal Details
  - Education Details
  - Language Scores
  - Document Uploads
  ↓
Submit Form
  ↓
Status: Submitted → Under Review
  ↓
Counsellor Reviews
  ↓
Status: Verified or Needs Correction
  ↓
If Verified → Can Proceed to Next Step
```

#### AI Document Generation Flow
```
Dashboard → AI Documents Section
  ↓
Select Document Type (SOP/LOR/Resume/Cover Letter)
  ↓
View Requirements
  ↓
Provide Additional Inputs (University, Program, etc.)
  ↓
Click "Generate Document"
  ↓
Loading... (20-30 seconds)
  ↓
Document Generated and Displayed
  ↓
Edit Document (if needed)
  ↓
Save Draft or Submit for Review
  ↓
Counsellor Reviews
  ↓
Approved or Revision Requested
  ↓
If Approved → Download Document
```

#### Application Tracking Flow
```
Dashboard → Applications Section
  ↓
View Application List
  ↓
Click on Application
  ↓
View Application Details:
  - Status
  - Timeline
  - Documents
  - Notes
  ↓
Receive Status Updates
  ↓
View Decision (Accepted/Rejected)
```

---

## 6. Admin Dashboard Flow

### 6.1 Admin Dashboard Entry Flow

```
┌─────────────────────────────────────────────────────────────┐
│              ADMIN LOGS IN                                 │
│  - Email/Password                                           │
│  - MFA (if enabled)                                         │
│  - Session created                                          │
│  - Redirected to Admin Dashboard                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD HOME                         │
│  - Key Metrics                                              │
│  - Pending Reviews                                          │
│  - Recent Activity                                           │
│  - Quick Actions                                            │
└─────────────────────────────────────────────────────────────┘
        │
        ├──────────┬──────────┬──────────┬──────────┬──────────┐
        ↓          ↓          ↓          ↓          ↓          ↓
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ STUDENTS │ │  LEADS   │ │ DOCUMENTS│ │APPLICATIONS│CONSULTATIONS│
│          │ │          │ │          │ │           │ │          │
│ - View   │ │ - View   │ │ - Review │ │ - Manage │ │ - Schedule│
│ - Assign │ │ - Qualify│ │ - Approve│ │ - Update │ │ - Manage │
│ - Manage │ │ - Convert│ │ - Reject │ │ - Track  │ │ - Track  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
        │
        └──────────────────────────────────────────────────────┐
                                                               ↓
                                                    ┌──────────────────┐
                                                    │    ANALYTICS    │
                                                    │  - View Reports  │
                                                    │  - Export Data   │
                                                    │  - Track Metrics │
                                                    └──────────────────┘
```

### 6.2 Document Review Flow

```
Admin Dashboard → Documents → Review Queue
  ↓
View Pending Reviews:
  - APS Forms
  - AI Documents
  ↓
Click on Document
  ↓
Review Document:
  - View Content
  - Check Quality
  - Verify Information
  ↓
Decision:
  ├─ Approve → Status Updated → Student Notified
  └─ Request Revision → Add Comments → Student Notified
  ↓
Student Receives Notification
  ↓
If Revision → Student Edits → Resubmits → Review Again
```

### 6.3 Application Management Flow

```
Admin Dashboard → Applications
  ↓
View Application List
  ↓
Create New Application:
  - Select Student
  - Choose University
  - Select Program
  - Link Documents
  ↓
Application Created
  ↓
Update Status:
  - Applied
  - Documents Sent
  - Under Review
  - Decision Received
  ↓
Student Receives Updates
```

---

## 7. Data Flow Architecture

### 7.1 User Registration Flow

```
Frontend (Login Button)
  ↓
Google OAuth Redirect
  ↓
Google Authentication
  ↓
Authorization Code Returned
  ↓
Backend API (/auth/google/callback)
  ↓
Exchange Code for Token
  ↓
Get User Info from Google
  ↓
Check if User Exists in Database
  ├─ Yes → Login → Create Session → Redirect to Dashboard
  └─ No → Create User Account → Create Profile → Redirect to Dashboard
```

### 7.2 Document Upload Flow

```
Frontend (File Upload)
  ↓
Select File
  ↓
Validate File (Type, Size)
  ↓
Upload to Storage (Firebase Storage/Supabase Storage)
  ↓
Get File URL
  ↓
Save Metadata to Database:
  - File Name
  - File URL
  - File Size
  - Upload Date
  - User ID
  - Category
  ↓
Update UI
  ↓
Send Notification (if needed)
```

### 7.3 AI Document Generation Flow

```
Frontend (Generate Document Button)
  ↓
Collect Inputs:
  - Document Type
  - Student Profile Data
  - Additional Inputs
  ↓
Backend API (/api/documents/generate)
  ↓
Prepare Prompt for Gemini API
  ↓
Call Gemini API
  ↓
Process AI Response
  ↓
Format Document
  ↓
Save to Database:
  - Document Content
  - Document Type
  - Student ID
  - Status (Draft)
  - Generation Date
  ↓
Save to Storage (optional)
  ↓
Return to Frontend
  ↓
Display Document in Editor
```

### 7.4 Notification Flow

```
Event Triggered (Status Change, New Message, etc.)
  ↓
Backend Service (Notification Service)
  ↓
Create Notification:
  - User ID
  - Notification Type
  - Message
  - Link
  - Timestamp
  ↓
Save to Database (Notifications collection)
  ↓
Send Email (if enabled)
  ↓
Push Notification (if mobile app)
  ↓
Update Frontend (Real-time or Polling)
  ↓
Display in UI
```

---

## 8. Integration Architecture

### 8.1 Google OAuth Integration

```
Frontend
  ↓
Google OAuth Client Library
  ↓
Google OAuth Server
  ↓
Authorization Code
  ↓
Backend API
  ↓
Exchange Code for Access Token
  ↓
Get User Info
  ↓
Create/Update User Account
```

### 8.2 Gemini API Integration

```
Backend API
  ↓
Prepare Request:
  - API Key
  - Prompt
  - Parameters
  ↓
HTTP Request to Gemini API
  ↓
Process Response
  ↓
Extract Generated Content
  ↓
Format and Store
  ↓
Return to Frontend
```

### 8.3 Email Service Integration

```
Backend Service
  ↓
Email Template Engine
  ↓
Prepare Email:
  - Recipient
  - Subject
  - Body
  - Attachments (if any)
  ↓
Send via Email Service (SendGrid/AWS SES)
  ↓
Email Delivered
  ↓
Track Delivery Status
```

### 8.4 Calendly Integration (Optional)

```
Frontend (Consultation Booking)
  ↓
Calendly Widget Embedded
  ↓
Student Selects Slot
  ↓
Calendly Webhook
  ↓
Backend API (/webhooks/calendly)
  ↓
Create Consultation Record
  ↓
Send Confirmation Emails
  ↓
Update Dashboard
```

---

## 9. Database Schema Overview

### 9.1 Users Collection

```javascript
{
  id: "user_id",
  email: "student@example.com",
  name: "Student Name",
  role: "student" | "counsellor" | "admin",
  authProvider: "google",
  googleId: "google_user_id",
  createdAt: timestamp,
  lastLogin: timestamp,
  status: "active" | "inactive"
}
```

### 9.2 Profiles Collection

```javascript
{
  id: "profile_id",
  userId: "user_id",
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "2000-01-01",
    nationality: "India",
    passportNumber: "ABC123456",
    passportExpiry: "2030-01-01"
  },
  academicInfo: {
    highestQualification: "Bachelor's",
    fieldOfStudy: "Computer Science",
    institution: "University Name",
    graduationYear: 2022,
    cgpa: 8.5
  },
  languageScores: {
    english: {
      test: "IELTS",
      score: 7.5
    },
    german: {
      level: "B1"
    }
  },
  completionPercentage: 85,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 9.3 Applications Collection

```javascript
{
  id: "application_id",
  studentId: "user_id",
  university: "University Name",
  program: "M.Sc. Data Science",
  intake: "Winter 2025",
  status: "applied" | "documents_sent" | "under_review" | "accepted" | "rejected",
  documents: ["doc_id_1", "doc_id_2"],
  counsellorId: "counsellor_id",
  appliedDate: timestamp,
  decisionDate: timestamp,
  timeline: [
    { status: "applied", date: timestamp },
    { status: "documents_sent", date: timestamp }
  ]
}
```

### 9.4 Documents Collection

```javascript
{
  id: "document_id",
  studentId: "user_id",
  type: "sop" | "lor" | "resume" | "cover_letter" | "aps" | "upload",
  title: "Statement of Purpose",
  content: "document content...",
  fileUrl: "storage_url",
  status: "draft" | "submitted" | "approved" | "rejected",
  version: 1,
  counsellorId: "counsellor_id",
  reviewComments: "comments...",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 9.5 Messages Collection

```javascript
{
  id: "message_id",
  conversationId: "conversation_id",
  senderId: "user_id",
  receiverId: "counsellor_id",
  message: "message text",
  attachments: ["file_url"],
  read: false,
  readAt: timestamp,
  createdAt: timestamp
}
```

---

## 10. API Architecture

### 10.1 API Endpoints Structure

**Authentication:**
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

**Users:**
- `GET /api/users` - Get users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Profiles:**
- `GET /api/profiles/me` - Get own profile
- `PUT /api/profiles/me` - Update profile
- `POST /api/profiles/me/documents` - Upload document

**Eligibility:**
- `POST /api/eligibility/check` - Check eligibility
- `GET /api/eligibility/me` - Get eligibility result

**APS:**
- `GET /api/aps/me` - Get APS form
- `POST /api/aps/me` - Submit APS form
- `PUT /api/aps/me` - Update APS form

**Documents:**
- `GET /api/documents` - Get documents
- `POST /api/documents/generate` - Generate AI document
- `PUT /api/documents/:id` - Update document
- `POST /api/documents/:id/review` - Submit for review
- `GET /api/documents/:id` - Get document

**Applications:**
- `GET /api/applications` - Get applications
- `POST /api/applications` - Create application (admin)
- `PUT /api/applications/:id` - Update application
- `GET /api/applications/:id` - Get application details

**Messages:**
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read

**Consultations:**
- `GET /api/consultations` - Get consultations
- `POST /api/consultations` - Book consultation
- `PUT /api/consultations/:id` - Update consultation

**Admin:**
- `GET /api/admin/students` - Get all students
- `GET /api/admin/reviews` - Get review queue
- `POST /api/admin/reviews/:id/approve` - Approve document
- `GET /api/admin/analytics` - Get analytics

### 10.2 API Response Format

```javascript
// Success Response
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Error message",
    details: { ... }
  }
}
```

---

## 11. Authentication Flow

### 11.1 Student Authentication (Google OAuth)

```
1. Student clicks "Login with Google"
   ↓
2. Frontend redirects to Google OAuth
   ↓
3. Student grants permissions
   ↓
4. Google redirects back with authorization code
   ↓
5. Frontend sends code to backend (/api/auth/google)
   ↓
6. Backend exchanges code for access token
   ↓
7. Backend gets user info from Google
   ↓
8. Backend checks if user exists:
   ├─ Yes → Update last login → Create session
   └─ No → Create user account → Create profile → Create session
   ↓
9. Backend returns session token
   ↓
10. Frontend stores token → Redirects to Dashboard
```

### 11.2 Admin Authentication

```
1. Admin enters email/password
   ↓
2. Frontend sends credentials to backend (/api/auth/login)
   ↓
3. Backend validates credentials
   ↓
4. If MFA enabled → Send MFA challenge
   ↓
5. Admin enters MFA code
   ↓
6. Backend verifies MFA code
   ↓
7. Backend creates session
   ↓
8. Frontend stores token → Redirects to Admin Dashboard
```

---

## 12. Document Processing Flow

### 12.1 APS Form Processing

```
Student submits APS form
  ↓
Backend validates form data
  ↓
Backend saves form data to database
  ↓
Backend uploads files to storage
  ↓
Backend creates APS record:
  - Status: "submitted"
  - Student ID
  - Form data
  - File URLs
  ↓
Backend sends notification to assigned counsellor
  ↓
Counsellor reviews in admin dashboard
  ↓
Counsellor verifies documents
  ↓
Backend updates status:
  - "verified" or "needs_correction"
  ↓
Backend sends notification to student
  ↓
Student sees updated status in dashboard
```

### 12.2 AI Document Generation Processing

```
Student requests document generation
  ↓
Backend validates:
  - Profile completion (80%+)
  - Document type
  - Required inputs
  ↓
Backend prepares prompt:
  - Student profile data
  - Document type
  - Additional inputs
  - Template structure
  ↓
Backend calls Gemini API:
  - API key
  - Prompt
  - Parameters (temperature, max tokens)
  ↓
Gemini API processes request
  ↓
Backend receives AI response
  ↓
Backend processes response:
  - Format content
  - Extract text
  - Structure document
  ↓
Backend saves document:
  - Content to database
  - Status: "draft"
  - Version: 1
  ↓
Backend returns document to frontend
  ↓
Frontend displays document in editor
  ↓
Student can edit and save
```

### 12.3 Document Review Processing

```
Student submits document for review
  ↓
Backend updates status: "submitted"
  ↓
Backend sends notification to counsellor
  ↓
Document appears in counsellor review queue
  ↓
Counsellor reviews document
  ↓
Counsellor makes decision:
  ├─ Approve → Status: "approved"
  └─ Request Revision → Status: "needs_revision" + Comments
  ↓
Backend updates document status
  ↓
Backend sends notification to student
  ↓
Student sees updated status:
  ├─ Approved → Can download
  └─ Needs Revision → Can edit and resubmit
```

---

## 13. AI Integration Flow

### 13.1 Gemini API Integration Details

**Request Structure:**
```javascript
{
  model: "gemini-pro",
  prompt: "Generate a Statement of Purpose for...",
  temperature: 0.7,
  maxTokens: 2000
}
```

**Response Processing:**
```javascript
{
  content: "Generated document text...",
  metadata: {
    tokensUsed: 1500,
    model: "gemini-pro",
    timestamp: "2025-01-01T00:00:00Z"
  }
}
```

**Error Handling:**
- Rate limit exceeded → Queue request
- API error → Retry with exponential backoff
- Invalid response → Return error to user

### 13.2 Prompt Engineering

**SOP Prompt Template:**
```
Generate a Statement of Purpose for a Master's program in [PROGRAM] at [UNIVERSITY].

Student Information:
- Name: [NAME]
- Academic Background: [ACADEMIC_INFO]
- Work Experience: [WORK_EXP]
- Language Scores: [LANGUAGE_SCORES]
- Career Goals: [GOALS]

Requirements:
- Length: 800-1200 words
- Format: Academic style
- Include: Motivation, Background, Goals, Why this program
```

---

## 14. Notification System Flow

### 14.1 Notification Types

**Email Notifications:**
- Welcome email
- Profile completion reminder
- Document approval/rejection
- Application status update
- Consultation reminder
- Password reset

**In-App Notifications:**
- Real-time status updates
- New messages
- Document review complete
- Application status change
- System announcements

### 14.2 Notification Delivery Flow

```
Event Occurs (Status change, new message, etc.)
  ↓
Backend Notification Service
  ↓
Create Notification Record:
  - User ID
  - Type
  - Message
  - Link
  - Priority
  ↓
Save to Database (Notifications collection)
  ↓
Check User Preferences:
  ├─ Email enabled → Send email
  ├─ Push enabled → Send push notification
  └─ In-app only → Store only
  ↓
Update Frontend (Real-time or Polling)
  ↓
Display Notification Badge/Alert
```

---

## 15. System Workflows

### 15.1 Complete Student Journey Workflow

```
LANDING PAGE
  ↓
[Check Eligibility] OR [Book Consultation] OR [Contact]
  ↓
REGISTRATION (Google OAuth)
  ↓
DASHBOARD HOME
  ↓
PROFILE CREATION (Complete to 80%+)
  ↓
ELIGIBILITY CHECKER (Optional)
  ↓
APS FORM SUBMISSION
  ↓
APS VERIFICATION (Counsellor)
  ↓
AI DOCUMENT GENERATION (SOP, LOR, Resume, Cover Letter)
  ↓
DOCUMENT REVIEW (Counsellor)
  ↓
DOCUMENT APPROVAL
  ↓
UNIVERSITY APPLICATION (Admin creates)
  ↓
APPLICATION TRACKING
  ↓
DECISION RECEIVED
  ↓
POST-ACCEPTANCE SERVICES
```

### 15.2 Document Approval Workflow

```
STUDENT GENERATES DOCUMENT
  ↓
STUDENT EDITS (Optional)
  ↓
STUDENT SUBMITS FOR REVIEW
  ↓
STATUS: "submitted"
  ↓
COUNSELLOR NOTIFIED
  ↓
COUNSELLOR REVIEWS
  ↓
DECISION:
  ├─ APPROVE
  │   ↓
  │   STATUS: "approved"
  │   ↓
  │   STUDENT NOTIFIED
  │   ↓
  │   STUDENT CAN DOWNLOAD
  │
  └─ REQUEST REVISION
      ↓
      STATUS: "needs_revision"
      ↓
      COMMENTS ADDED
      ↓
      STUDENT NOTIFIED
      ↓
      STUDENT EDITS
      ↓
      STUDENT RESUBMITS
      ↓
      BACK TO REVIEW
```

---

## 16. Security Architecture

### 16.1 Security Layers

**Frontend Security:**
- HTTPS only
- Secure cookie handling
- XSS prevention
- CSRF tokens
- Input validation

**Backend Security:**
- Authentication middleware
- Authorization checks
- Rate limiting
- Input sanitization
- SQL injection prevention
- API key protection

**Database Security:**
- Encrypted connections
- Role-based access
- Data encryption at rest
- Backup encryption

**File Storage Security:**
- Encrypted uploads
- Access tokens
- Time-limited URLs
- Virus scanning (optional)

### 16.2 Data Protection

**Personal Data:**
- Encrypted storage
- Access control
- Audit logging
- GDPR compliance
- Right to deletion

**Document Security:**
- Encrypted storage
- Access control
- Version control
- Secure deletion

---

## 17. Performance Optimization

### 17.1 Frontend Optimization

**Code Splitting:**
- Route-based splitting
- Component lazy loading
- Dynamic imports

**Caching:**
- Browser caching
- Service worker (PWA)
- Local storage
- Session storage

**Asset Optimization:**
- Image compression
- Lazy loading images
- CDN delivery
- Minification

### 17.2 Backend Optimization

**Database:**
- Indexing
- Query optimization
- Connection pooling
- Caching (Redis)

**API:**
- Response caching
- Pagination
- Rate limiting
- Compression

**File Handling:**
- Async processing
- Queue system
- CDN delivery
- Compression

---

## 18. Scalability Considerations

### 18.1 Horizontal Scaling

**Frontend:**
- Stateless design
- CDN distribution
- Load balancing

**Backend:**
- Stateless API
- Load balancing
- Auto-scaling
- Microservices (future)

**Database:**
- Read replicas
- Sharding (if needed)
- Caching layer

### 18.2 Performance Monitoring

**Metrics:**
- Response times
- Error rates
- Throughput
- Resource usage

**Tools:**
- Application monitoring
- Error tracking
- Performance profiling
- Log aggregation

---

## 19. Deployment Architecture

### 19.1 Production Setup

```
Frontend (Vercel)
  ↓
CDN (Vercel Edge Network)
  ↓
Backend API (Vercel/AWS)
  ↓
Database (Firebase/Supabase)
  ↓
File Storage (Firebase Storage/Supabase Storage)
  ↓
External Services (Google, Gemini, Email)
```

### 19.2 Environment Configuration

**Development:**
- Local database
- Mock services
- Debug logging
- Hot reload

**Staging:**
- Test database
- Test integrations
- Staging URLs
- Limited access

**Production:**
- Production database
- Live integrations
- Production URLs
- Monitoring enabled

---

## 20. Future Enhancements

### 20.1 Planned Features
- Mobile applications (iOS/Android)
- Payment gateway integration
- LMS integration
- Video conferencing integration
- Advanced analytics
- Multi-language support
- Chatbot enhancement

### 20.2 Scalability Improvements
- Microservices architecture
- Event-driven architecture
- Advanced caching
- Database optimization
- CDN expansion

---

**End of Project Architecture & Flow Documentation**

