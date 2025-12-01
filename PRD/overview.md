# AJ NOVA - Product Requirements Document (PRD)

## Document Information
- **Project Name:** AJ NOVA
- **Version:** 1.0
- **Date:** 2025
- **Prepared For:** AJNOVA Abroad Consultancy
- **Prepared By:** Development Team

---

## 1. Executive Summary

AJ NOVA is a comprehensive digital admissions platform designed to streamline the entire process of applying to German universities for international students. The platform combines AI-powered document generation, automated workflows, and personalized counselling to provide a seamless experience from initial consultation to university acceptance.

### 1.1 Project Vision
To become the leading digital platform that empowers students to successfully navigate the complex German university admission process through intelligent automation, expert guidance, and transparent tracking.

### 1.2 Key Objectives
- **For Students:** Provide a user-friendly dashboard to track application progress, generate AI-powered documents, and receive expert guidance
- **For Counsellors:** Offer a comprehensive CRM system to manage leads, review documents, and track student progress efficiently
- **For Management:** Deliver analytics and insights to optimize operations and improve conversion rates

---

## 2. Project Scope

### 2.1 Core Components
1. **Public-Facing Website**
   - Landing page with hero section and value proposition
   - Services page showcasing all offerings
   - Contact page with inquiry form
   - Eligibility checker tool

2. **Student Dashboard**
   - Profile creation and management
   - Eligibility checker integration
   - APS form submission and tracking
   - AI-powered document generation (SOP, LOR, Resume, Cover Letter)
   - Application progress tracking
   - Document management center
   - Consultation scheduling
   - Messaging and support

3. **Admin Dashboard**
   - Lead management and assignment
   - Student management and progress tracking
   - Document review and approval workflow
   - APS verification system
   - Meeting scheduling and calendar management
   - University updates and application management
   - Service tracking (Blocked Account, Health Insurance, Loans, etc.)
   - Analytics and reporting

4. **AI Integration**
   - Gemini API integration for document generation
   - AI chatbot for 24/7 assistance
   - Intelligent eligibility assessment

5. **Automation & Workflows**
   - Automated email notifications
   - Status update communications
   - Reminder systems
   - Lead qualification automation

### 2.2 Out of Scope (Phase 1)
- Payment gateway integration (future phase)
- LMS integration (third-party provided by client)
- Zoom/Google Meet integration (future phase)
- Mobile applications (web-responsive only)

---

## 3. Technology Stack

### 3.1 Frontend
- **Framework:** Vite React or Next.js
- **Styling:** Modern CSS framework (Tailwind CSS or similar)
- **State Management:** React Context API or Redux
- **UI Components:** Component library (Material-UI, Ant Design, or custom)

### 3.2 Backend
- **Runtime:** Node.js or Python
- **Framework:** Express.js (Node.js) or FastAPI/Django (Python)
- **API:** RESTful API architecture

### 3.3 Database
- **Primary Database:** Firebase or Supabase
- **File Storage:** Cloud storage for documents (Firebase Storage or Supabase Storage)

### 3.4 Third-Party Integrations
- **AI/LLM:** Google Gemini API
- **Authentication:** Google OAuth for student login
- **Email Service:** Email service provider (SendGrid, AWS SES, or similar)
- **Analytics:** Google Analytics or similar

### 3.5 Hosting & Deployment
- **Frontend:** Vercel (with SSL)
- **Backend:** Cloud platform (Vercel, AWS, or similar)
- **Database:** Managed by Firebase/Supabase

---

## 4. User Roles & Permissions

### 4.1 Student
- Access to personal dashboard
- Profile creation and editing
- Document upload and management
- AI document generation
- Application progress tracking
- Consultation scheduling
- Messaging with counsellors

### 4.2 Counsellor
- View assigned students
- Review and approve documents
- Verify APS submissions
- Schedule meetings
- Update application status
- Communicate with students
- Access student profiles

### 4.3 Admin/Super Admin
- All counsellor permissions
- User management (students and counsellors)
- System settings configuration
- Analytics and reporting access
- Lead assignment
- Service tracking management
- University updates management

---

## 5. Key Features Overview

### 5.1 Student-Facing Features
1. **Authentication:** Google OAuth login
2. **Profile Management:** Complete student profile creation
3. **Eligibility Checker:** Intelligent assessment tool
4. **APS Form:** Simplified APS verification form
5. **AI Document Generation:** SOP, LOR, Resume, Cover Letter
6. **Application Tracking:** Real-time status updates
7. **Document Center:** Upload and manage all documents
8. **Consultation Scheduler:** Book free consultations
9. **Messaging System:** Direct communication with counsellors
10. **Progress Dashboard:** Visual progress tracking

### 5.2 Admin-Facing Features
1. **CRM System:** Lead and student management
2. **Document Review:** Approval workflow for AI-generated documents
3. **APS Verification:** Review and verify APS submissions
4. **Analytics Dashboard:** Performance metrics and insights
5. **Meeting Management:** Schedule and track consultations
6. **University Management:** Update and track university applications
7. **Service Tracking:** Monitor additional services (loans, insurance, etc.)
8. **Automation Settings:** Configure automated workflows
9. **User Management:** Manage roles and permissions
10. **Reporting:** Generate and export reports

---

## 6. Project Workflow Stages

### Stage 1: Engagement & Initial Inquiry
- Landing page visit
- Contact form submission
- Eligibility checker usage
- Free consultation request

### Stage 2: Consultation & Assessment
- Consultation scheduling via Calendly
- Eligibility assessment completion
- Profile creation initiation

### Stage 3: Profile & Documentation
- Complete profile creation
- APS form submission
- Document uploads
- AI document generation (SOP, LOR, Resume, Cover Letter)

### Stage 4: Review & Approval
- Counsellor review of documents
- APS verification
- Document approval workflow
- Revision cycles if needed

### Stage 5: Application Processing
- University application submission (admin-managed)
- Application status tracking
- Document submission tracking
- Decision tracking (Accepted/Rejected)

### Stage 6: Post-Acceptance Services
- Additional service tracking (Blocked Account, Health Insurance, etc.)
- Visa application support
- Pre-departure orientation

---

## 7. Design Principles

### 7.1 User Experience
- **Simplicity:** Clean, intuitive interface
- **Transparency:** Clear progress tracking and status updates
- **Guidance:** Helpful prompts and next-step suggestions
- **Responsiveness:** Mobile-friendly design
- **Accessibility:** WCAG 2.1 compliance

### 7.2 Visual Design
- Modern, professional aesthetic
- Student-friendly color scheme
- Consistent branding throughout
- Clear typography hierarchy
- Engaging but not overwhelming

### 7.3 Content Strategy
- Clear, concise messaging
- Supportive and encouraging tone
- Educational content where needed
- Multilingual support (English, German, Hindi)

---

## 8. Security & Compliance

### 8.1 Data Security
- End-to-end encryption (TLS 1.3)
- AES-256 encryption for data at rest
- Secure file storage with access tokens
- Regular security audits

### 8.2 Privacy Compliance
- GDPR/DSGVO compliance
- Data retention policies
- User consent management
- Right to deletion
- Privacy-by-design principles

### 8.3 Access Control
- Role-based access control (RBAC)
- Multi-factor authentication (optional for admins)
- Session management
- Audit logging

---

## 9. Performance Requirements

### 9.1 Response Times
- Page load time: < 2 seconds
- API response time: < 500ms
- Document generation: < 30 seconds
- File upload: Support up to 10MB files

### 9.2 Scalability
- Support 1000+ concurrent users
- Handle 10,000+ student profiles
- Process 100+ document generations per day

### 9.3 Availability
- 99.5% uptime target
- Automated backups (daily)
- Disaster recovery plan

---

## 10. Success Metrics

### 10.1 Student Engagement
- Profile completion rate
- Document generation usage
- Consultation booking rate
- Application completion rate

### 10.2 Operational Efficiency
- Average APS verification time
- Document approval turnaround time
- Counsellor response time
- Lead conversion rate

### 10.3 Business Metrics
- Student enrollment rate
- Service utilization rate
- User satisfaction scores
- Platform adoption rate

---

## 11. Documentation Structure

This PRD is organized into the following sections:

1. **Overview** (this document) - Project overview and high-level requirements
2. **Static Pages** - Landing page, Services page, Contact page specifications
3. **Student Dashboard** - Detailed student-facing features and workflows
4. **Admin Dashboard** - Comprehensive admin and counsellor features
5. **Authentication & Security** - Login, authorization, and security specifications
6. **AI Integration** - Gemini API integration and document generation
7. **Automation & Workflows** - Automated processes and email systems
8. **Analytics & Reporting** - Metrics, dashboards, and reporting features

---

## 12. Next Steps

1. Review and approve this PRD
2. Create detailed wireframes and mockups
3. Set up development environment
4. Begin frontend development
5. Begin backend development
6. Integration testing
7. User acceptance testing
8. Deployment and launch

---

## 13. Appendices

### 13.1 Related Documents
- Quotation Document (QUOTATAION.MD)
- Meeting Notes (afterdiscussionmeeting.md)
- Client Requirements (clientdocs folder)

### 13.2 Glossary
- **APS:** Akademische Prüfstelle (Academic Evaluation Center)
- **SOP:** Statement of Purpose
- **LOR:** Letter of Recommendation
- **CRM:** Customer Relationship Management
- **GDPR:** General Data Protection Regulation
- **DSGVO:** Datenschutz-Grundverordnung (German GDPR)

---

**End of Overview Document**

