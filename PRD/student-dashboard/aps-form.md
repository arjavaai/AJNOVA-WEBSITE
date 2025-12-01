# Student Dashboard - APS Form

## Document Overview
This document details the APS (Akademische Prüfstelle) Form feature, a simplified replica of the official APS form for data collection and verification support.

---

## 1. Purpose

The APS Form enables students to:
- Complete all information required for APS verification
- Upload necessary documents
- Track APS submission status
- Receive verification from counsellors
- Avoid common submission mistakes

---

## 2. Form Structure

### 2.1 Page Introduction
**Content:**
- **Title:** "APS Verification Form (AjNova)"
- **Description:** "This form helps AjNova gather all information needed for APS verification. It is for data collection only and does not replace the official APS submission process."
- **Link:** "Visit Official APS Website" (opens https://aps-india.de in new tab)
- **Note:** "Our team will review your information and guide you through the official submission process."

### 2.2 Section 1: Personal & Identification Details
**Fields:**
- **Full Name (as in passport)** (required)
  - Text input
  - Hint: "Enter your full name exactly as in your passport"
- **Date of Birth** (required)
  - Date picker (DD/MM/YYYY)
- **Gender** (required)
  - Dropdown: Male, Female, Other, Prefer not to say
- **Nationality** (required)
  - Dropdown: Country list
- **Passport Number** (required)
  - Text input
  - Format validation
- **Passport Expiry Date** (required)
  - Date picker
  - Warning if expiry < 6 months from current date
- **Email Address** (required)
  - Email input (auto-filled from profile)
- **Mobile Number** (required)
  - Phone input with country code
- **Country of Residence** (required)
  - Dropdown: Country list

**Validation:**
- Required field indicators
- Format validation
- Date range checks
- Passport expiry warning

### 2.3 Section 2: Secondary & Higher Secondary Education

**10th Grade Details:**
- **School Name** (required)
  - Text input
- **Year of Completion** (required)
  - Year picker (YYYY)
- **Marks / Percentage** (required)
  - Number input
  - Dropdown: Marks or Percentage
- **Board** (optional)
  - Text input

**12th Grade Details:**
- **School Name** (required)
  - Text input
- **Year of Completion** (required)
  - Year picker (YYYY)
- **Marks / Percentage** (required)
  - Number input
  - Dropdown: Marks or Percentage
- **Board** (optional)
  - Text input

**Instruction:**
"Enter marks exactly as shown on your certificate (percentage or CGPA)."

### 2.4 Section 3: Higher Education (Bachelor/Master)

**Fields:**
- **Degree Awarded** (required)
  - Text input (e.g., B.Tech, BBA, M.Sc.)
  - Autocomplete suggestions
- **University / Institution Name** (required)
  - Text input
- **Country of Education** (required)
  - Dropdown: Country list
- **Study Period** (required)
  - From Date (Month/Year)
  - To Date (Month/Year)
  - "Current" checkbox option
- **Final Grade / Percentage** (required)
  - Number input
  - Dropdown: CGPA or Percentage
- **Backlogs** (optional)
  - Number input
- **Medium of Instruction** (required)
  - Dropdown: English, German, Other

**Uploads:**
- **Degree Certificate** (required)
  - File upload (PDF, JPG, PNG)
  - Max size: 10MB
  - Preview available
  - Status indicator
- **Academic Transcripts** (required)
  - Multiple files allowed
  - File upload (PDF, JPG, PNG)
  - Max size: 10MB per file
  - File list with delete option
  - "Add More Files" button

**Instructions:**
- "Upload one file per document if possible"
- "Ensure all uploads are clearly readable"
- "Accepted formats: PDF, JPG, PNG"

### 2.5 Section 4: Language & Test Scores

**Fields:**
- **English Test** (required)
  - Dropdown: IELTS, TOEFL, None
  - Conditional: If test selected, show score input
  - Score input with validation
  - Test Date (optional)
- **German Language Level** (required)
  - Dropdown: None, A1, A2, B1, B2, C1, C2
- **Other Relevant Exams** (optional)
  - Exam Type: GRE, GMAT, Other
  - Score input
  - Test Date

### 2.6 Section 5: University Preferences & Intake

**Fields:**
- **Preferred University 1** (optional)
  - Text input with autocomplete
- **Preferred University 2** (optional)
  - Text input with autocomplete
- **Preferred University 3** (optional)
  - Text input with autocomplete
- **Preferred Intake** (required)
  - Dropdown: Winter 2025, Summer 2026, etc.
- **Application Channel** (optional)
  - Dropdown: Direct, UniAssist, Other

**Instruction:**
"You can name up to 3 preferred universities or leave blank if undecided."

### 2.7 Section 6: Optional Information / Returning Applicants

**Fields:**
- **APS Application Number** (optional)
  - Text input
  - "If you already have an APS application number"
- **Upload Existing APS Certificate** (optional)
  - File upload (PDF, JPG, PNG)
  - Max size: 10MB

### 2.8 Section 7: Declaration

**Checkbox (required):**
"I confirm that the information provided is true and that AjNova may use these details to assist with my APS verification process."

**Submit Button:**
- "Submit APS Details" (primary button)
- Loading state during submission
- Disabled until all required fields filled

**Confirmation Message:**
"Thank you! Your APS details have been submitted successfully. Our verification team will contact you soon."

---

## 3. Status Tracking

### 3.1 Status Types
- **Not Started:** Form not yet submitted
- **Submitted:** Form submitted, awaiting review
- **Under Review:** Counsellor reviewing documents
- **Verified:** Documents verified and approved
- **Needs Correction:** Corrections required
- **Rejected:** Submission rejected (with reason)

### 3.2 Status Display
**On Dashboard:**
- Status badge with color coding
- Last updated timestamp
- Next action required

**On Form Page:**
- Current status at top
- Document status table
- Counsellor comments (if any)
- Action buttons based on status

### 3.3 Document Status Table
**Table Columns:**
| Document Uploaded | Status | Upload Date | Actions |
|-------------------|--------|-------------|---------|
| Degree Certificate | ✅ Reviewed | DD/MM/YYYY | View |
| Transcripts | ✅ Verified | DD/MM/YYYY | View |
| Passport | ⚠ Needs Correction | DD/MM/YYYY | Re-upload |

**Status Indicators:**
- ✅ Reviewed/Verified
- ⏳ Pending Review
- ⚠ Needs Correction
- ❌ Rejected

---

## 4. UI Layout

### 4.1 Form Layout
**Structure:**
- Accordion/collapsible sections
- Progress indicator at top
- Section navigation sidebar (optional)
- Auto-save indicator

**Sections:**
1. Personal & Identification (expanded by default)
2. Secondary Education
3. Higher Education
4. Language & Test Scores
5. University Preferences
6. Optional Information
7. Declaration

### 4.2 Form Features
**Auto-Fill:**
- Pre-populate from student profile
- Allow manual override
- Save progress automatically

**Validation:**
- Inline validation
- Error messages below fields
- Required field indicators
- File type/size validation

**Navigation:**
- "Next Section" / "Previous Section" buttons
- Section tabs
- Jump to incomplete sections
- Save and continue later

### 4.3 File Upload Interface
**Features:**
- Drag and drop support
- Click to browse
- Upload progress indicator
- File preview
- Delete/replace option
- File size display
- Upload status

**Accepted Formats:**
- PDF, JPG, JPEG, PNG
- Max size: 10MB per file

---

## 5. Error Prevention Features

### 5.1 Validation Rules
- Required field checks
- Format validation (dates, emails, phone numbers)
- File type validation
- File size limits
- Date range validation
- Passport expiry warning

### 5.2 Helpful Hints
- Inline hints for every major field
- Example formats shown
- Tooltips for complex fields
- "Why we need this" explanations

### 5.3 Error Messages
- Clear, actionable error messages
- Field-specific guidance
- Visual error indicators
- Success confirmations

---

## 6. Post-Submission Process

### 6.1 Immediate Actions
- Show confirmation message
- Send email confirmation to student
- Create notification for assigned counsellor
- Update dashboard status
- Lock form for editing (until review)

### 6.2 Counsellor Review
- Counsellor receives notification
- Reviews submitted information
- Checks uploaded documents
- Verifies completeness
- Adds comments if needed
- Marks as verified or requests corrections

### 6.3 Student Notifications
- Email when under review
- Email when verified
- Email if corrections needed
- In-app notifications
- Dashboard status updates

---

## 7. Integration Points

### 7.1 Profile Integration
- Auto-fill from profile data
- Update profile with APS data
- Link APS status to profile

### 7.2 Dashboard Integration
- Display APS status on dashboard
- Show in progress tracker
- Link to form from dashboard

### 7.3 Admin Dashboard
- Counsellors review submissions
- Verify documents
- Add comments
- Update status
- Track verification time

---

## 8. User Experience Flow

### 8.1 First-Time Submission
1. Student navigates to APS Form
2. Sees pre-filled data from profile
3. Reviews and completes missing fields
4. Uploads required documents
5. Reviews all sections
6. Accepts declaration
7. Submits form
8. Receives confirmation
9. Waits for counsellor review

### 8.2 Correction Flow
1. Student receives notification (corrections needed)
2. Views counsellor comments
3. Edits form fields
4. Re-uploads corrected documents
5. Resubmits form
6. Status updates to "Under Review"

### 8.3 Verification Flow
1. Counsellor verifies submission
2. Student receives "Verified" notification
3. Status updates on dashboard
4. Student can proceed to next steps
5. Success message displayed

---

## 9. Mobile Responsiveness

### 9.1 Mobile Layout
- Single column form
- Collapsible sections
- Touch-friendly inputs
- Optimized file upload
- Full-width buttons
- Simplified navigation

### 9.2 Tablet Layout
- Two-column where appropriate
- Maintained functionality
- Responsive file upload
- Optimized spacing

---

## 10. Security & Privacy

### 10.1 Data Protection
- Encrypted file storage
- Secure form submission
- Access control
- Audit logging

### 10.2 File Security
- Virus scanning (optional)
- Secure upload process
- Encrypted storage
- Time-limited access tokens

---

**End of APS Form Documentation**

