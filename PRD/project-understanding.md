# AJ NOVA - Project Understanding Summary

Based on the comprehensive analysis of the PRD documentation, here is a summary of the AJ NOVA project.

## 1. Project Overview
AJ NOVA is a digital admissions platform designed to streamline the application process for international students seeking admission to German universities. It acts as a bridge between students and counsellors, automating many parts of the process while providing personalized support.

**Core Value Proposition:**
- **For Students:** A unified dashboard to manage the entire journey (Profile -> Eligibility -> APS -> Documents -> Application).
- **For Counsellors:** A CRM and management tool to track students, verify documents, and manage applications efficiently.
- **Automation:** AI-powered document generation (SOP, LOR, etc.) and automated workflows.

## 2. Key Components

### A. Student Dashboard
The central hub for students. Key modules include:
1.  **Profile Management:** Comprehensive profile creation (Personal, Academic, Language, etc.) which feeds into other modules.
2.  **Eligibility Checker:** An intelligent tool to assess readiness for Public vs. Private universities based on academic and language scores.
3.  **APS Form:** A digital replica of the APS verification form for data collection and pre-verification by counsellors.
4.  **AI Document Generation:** Uses Google Gemini API to generate drafts for SOPs, LORs, Resumes, and Cover Letters based on profile data.
5.  **Document Center:** Central repository for uploading and managing all documents (Passport, Transcripts, Certificates).
6.  **Application Tracking:** Real-time status tracking of university applications (Applied -> Documents Sent -> Under Review -> Decision).
7.  **Consultation Scheduler:** Booking system for free consultations with counsellors (integrated with Calendly or custom).
8.  **Messaging:** Direct communication channel with assigned counsellors.

### B. Admin Dashboard
The control panel for counsellors and admins. Key features:
1.  **CRM & Lead Management:** Manage inquiries from the public website.
2.  **Student Management:** View student profiles, progress, and assign counsellors.
3.  **Document Review:** Workflow to review and approve/reject uploaded documents and AI-generated drafts.
4.  **APS Verification:** Verify student APS submissions before they send to the official authority.
5.  **Application Management:** Create and update university applications on behalf of students.
6.  **Analytics:** Track success metrics, student engagement, and counsellor performance.

### C. Public Website
- **Landing Page:** Hero section, value prop, eligibility teaser.
- **Services Page:** Detailed breakdown of services (Visa, Blocked Account, etc.).
- **Contact Page:** Inquiry forms and contact info.

## 3. Technical Architecture
- **Frontend:** Vite React or Next.js with Tailwind CSS.
- **Backend:** Node.js (Express) or Python (FastAPI/Django).
- **Database:** Firebase or Supabase (Firestore/PostgreSQL).
- **Storage:** Firebase Storage or Supabase Storage for documents.
- **AI Integration:** Google Gemini API.
- **Auth:** Google OAuth for students, Email/Password for admins.

## 4. User Journey Flow
1.  **Engagement:** Student visits site -> Checks Eligibility -> Books Consultation.
2.  **Onboarding:** Login via Google -> Profile Creation (80% completion unlocks features).
3.  **Preparation:** Submit APS Form -> Counsellor Verifies -> Generate AI Documents -> Counsellor Approves.
4.  **Application:** Admin applies to universities -> Student tracks status on dashboard.
5.  **Post-Acceptance:** Visa, Blocked Account, and other services.

## 5. Key Workflows
- **Document Generation:** Profile Data + User Input -> Gemini API -> Draft -> Edit -> Submit -> Counsellor Review -> Approval.
- **APS Verification:** Student Fills Form -> Uploads Docs -> Submit -> Counsellor Review -> Verified Status.

This understanding covers the scope, features, and flows described in the PRD.
