# Student Dashboard - Profile Management

## Document Overview
This document details the Profile Management feature, which allows students to create and maintain their complete profile used throughout the application process.

---

## 1. Purpose

The Profile Management module enables students to:
- Create a comprehensive student profile
- Update personal and academic information
- Upload required documents
- Track profile completion
- Use profile data for AI document generation
- Download profile as PDF

---

## 2. Profile Structure

### 2.1 Personal Information Section
**Fields:**
- **Full Name** (required)
  - First Name
  - Last Name
  - Middle Name (optional)
- **Date of Birth** (required)
  - Date picker (DD/MM/YYYY)
- **Gender** (required)
  - Dropdown: Male, Female, Other, Prefer not to say
- **Nationality** (required)
  - Dropdown: Country list
- **Country of Residence** (required)
  - Dropdown: Country list
- **Passport Number** (required)
  - Text input with validation
- **Passport Expiry Date** (required)
  - Date picker
  - Warning if expiry < 6 months

**Validation:**
- Required field indicators
- Format validation
- Date range validation
- Passport expiry warning

### 2.2 Academic Background Section
**Fields:**
- **Highest Qualification Completed** (required)
  - Dropdown: High School, Diploma, Bachelor's, Master's, PhD
- **Field of Study** (required)
  - Text input with autocomplete
  - Common fields: Engineering, Business, IT, Health Sciences, Arts, etc.
- **Institution Name** (required)
  - Text input
- **Country of Education** (required)
  - Dropdown: Country list
- **Graduation Year** (required)
  - Year picker (YYYY)
- **CGPA / Percentage** (required)
  - Number input
  - Dropdown: CGPA or Percentage
  - Range validation (0-10 for CGPA, 0-100 for %)
- **Backlogs** (optional)
  - Number input
- **Medium of Instruction** (required)
  - Dropdown: English, German, Other

**Additional Education (Optional):**
- Add multiple education entries
- Same fields as above
- "Add Another Degree" button

### 2.3 Secondary Education Section
**10th Grade Details:**
- School Name (required)
- Year of Completion (required)
- Marks / Percentage (required)
- Board (optional)

**12th Grade Details:**
- School Name (required)
- Year of Completion (required)
- Marks / Percentage (required)
- Board (optional)

### 2.4 Language & Test Scores Section
**English Proficiency:**
- Test Type (required)
  - Dropdown: IELTS, TOEFL, None, Pending
- Score (conditional - required if test selected)
  - Number input
  - Band/Score display based on test type
- Test Date (optional)
  - Date picker
- Certificate Upload (optional)
  - File upload (PDF, JPG, PNG)
  - Max size: 10MB

**German Language Level:**
- Level (required)
  - Dropdown: None, A1, A2, B1, B2, C1, C2
- Certificate Upload (optional)
  - File upload
- Test Date (optional)

**Other Relevant Exams (Optional):**
- Exam Type
  - Dropdown: GRE, GMAT, SAT, Other
- Score
- Test Date
- Certificate Upload

### 2.5 Work Experience Section (Optional)
**Fields:**
- **Work Experience** (required)
  - Dropdown: None, <1 year, 1-3 years, 3+ years
- **Current/Previous Employment** (if applicable)
  - Company Name
  - Position/Title
  - Start Date
  - End Date (or "Current")
  - Description (textarea)
  - "Add Another Experience" button

### 2.6 Contact & Preferences Section
**Fields:**
- **Email Address** (required, auto-filled from login)
  - Email validation
  - Read-only if from Google OAuth
- **Mobile Number** (required)
  - Phone number input with country code
  - Format validation
- **Alternate Phone** (optional)
- **Address** (optional)
  - Street Address
  - City
  - State/Province
  - Postal Code
  - Country
- **Preferred Intake** (required)
  - Dropdown: Winter 2025, Summer 2026, Winter 2026, etc.
- **Interested Country** (required)
  - Default: Germany
  - Dropdown: Country list
- **Study Level** (required)
  - Dropdown: Bachelor's, Master's, PhD
- **Preferred Course/Program** (optional)
  - Text input with autocomplete

### 2.7 Document Uploads Section
**Upload Categories:**
1. **Passport Copy** (required)
   - File upload (PDF, JPG, PNG)
   - Max size: 10MB
   - Preview available
   - Status: Uploaded/Not Uploaded

2. **Academic Transcripts** (required)
   - Multiple files allowed
   - File upload (PDF, JPG, PNG)
   - Max size: 10MB per file
   - File list display
   - Delete option

3. **Degree Certificates** (required)
   - File upload (PDF, JPG, PNG)
   - Max size: 10MB
   - Preview available

4. **Language Certificates** (optional)
   - IELTS/TOEFL certificate
   - German language certificate
   - File upload (PDF, JPG, PNG)

5. **Other Documents** (optional)
   - Additional certificates
   - Work experience letters
   - File upload (PDF, JPG, PNG)

**File Upload Features:**
- Drag and drop support
- Click to browse
- File type validation
- Size validation
- Upload progress indicator
- Preview before upload
- Delete/replace option

---

## 3. UI Layout

### 3.1 Page Structure
**Header:**
- "My Profile" title
- Profile completion indicator
- Save button (sticky or top-right)

**Form Layout:**
- Accordion/collapsible sections
- Progress indicator at top
- Section navigation (optional)

**Sections:**
1. Personal Information (expanded by default)
2. Academic Background
3. Secondary Education
4. Language & Test Scores
5. Work Experience
6. Contact & Preferences
7. Document Uploads

**Footer:**
- "Save Profile" button
- "Continue to APS Form" button (if profile complete)
- "Download Profile PDF" button

### 3.2 Profile Completion Indicator
**Display:**
- Horizontal progress bar
- Percentage: "Profile 60% Complete"
- Visual breakdown by section

**Logic:**
- Calculate: (Filled fields / Total required fields) × 100
- Show completion by section
- Highlight incomplete sections

**Encouragement:**
- At 80%: "Your profile is ready for document creation!"
- At 100%: "Profile complete! You're ready to proceed."

### 3.3 Form Features
**Auto-Save:**
- Save on field blur (optional)
- Auto-save indicator
- "Last saved: [time]" display

**Validation:**
- Inline validation
- Error messages below fields
- Success indicators
- Required field markers (*)

**Navigation:**
- Section tabs/accordion
- "Next Section" / "Previous Section" buttons
- Jump to incomplete sections

---

## 4. User Experience

### 4.1 First-Time Profile Creation
**Flow:**
1. Student lands on profile page after login
2. Welcome message: "Let's create your profile"
3. Step-by-step guidance
4. Progress indicator visible
5. Save progress at any time
6. Continue later option

**Guidance:**
- Tooltips for complex fields
- Help text below fields
- Example formats shown
- "Why we need this" explanations

### 4.2 Profile Editing
**Flow:**
1. Student clicks "Edit Profile"
2. Form pre-filled with existing data
3. Make changes
4. Save updates
5. Confirmation message

**Features:**
- Edit any section independently
- History of changes (optional)
- Version comparison (optional)

### 4.3 Profile View Mode
**Display:**
- Read-only view
- Organized sections
- Document previews
- Download PDF option
- Edit button prominent

---

## 5. Data Management

### 5.1 Data Storage
- Store in database (Firebase/Supabase)
- Encrypted sensitive data
- Version history (optional)
- Backup regularly

### 5.2 Data Usage
- Pre-fill APS form
- Generate AI documents
- Eligibility checker
- Application forms
- Counsellor view

### 5.3 Data Validation
**Client-Side:**
- Format validation
- Required field checks
- Range validation
- File type/size checks

**Server-Side:**
- Duplicate validation
- Data integrity checks
- Security validation
- Sanitization

---

## 6. Profile Completion Logic

### 6.1 Required Fields
**Personal Information:**
- Full Name, DOB, Gender, Nationality, Country of Residence, Passport Number, Passport Expiry

**Academic:**
- Highest Qualification, Field of Study, Institution, Country, Graduation Year, CGPA/Percentage, Medium of Instruction

**Secondary Education:**
- 10th and 12th details (School, Year, Marks)

**Language:**
- English Proficiency status
- German Level

**Contact:**
- Email, Mobile, Preferred Intake, Interested Country, Study Level

**Documents:**
- Passport Copy, Academic Transcripts, Degree Certificates

### 6.2 Completion Calculation
```
Completion % = (Filled Required Fields / Total Required Fields) × 100
```

**Section Weights (Optional):**
- Personal Info: 15%
- Academic: 25%
- Secondary: 10%
- Language: 15%
- Contact: 10%
- Documents: 25%

### 6.3 Unlock Logic
- **60% Complete:** Can check eligibility
- **80% Complete:** Can generate AI documents
- **100% Complete:** Can proceed to APS form

---

## 7. Download Profile PDF

### 7.1 PDF Content
- All profile information
- Formatted layout
- Document list
- AJ NOVA branding
- Generated date

### 7.2 PDF Features
- Professional formatting
- Print-friendly
- Password protection (optional)
- Watermark (optional)

---

## 8. Integration Points

### 8.1 APS Form
- Auto-populate APS form with profile data
- Reduce duplicate data entry

### 8.2 AI Documents
- Use profile data for SOP/LOR generation
- Pre-fill resume with academic/work experience

### 8.3 Eligibility Checker
- Use academic and language data
- Calculate eligibility score

### 8.4 Admin Dashboard
- Counsellors can view student profiles
- Use for application processing

---

## 9. Security & Privacy

### 9.1 Data Protection
- Encrypted storage
- Secure file uploads
- Access control
- Audit logging

### 9.2 Privacy
- Student controls visibility
- GDPR compliance
- Right to deletion
- Data export option

---

## 10. Mobile Responsiveness

### 10.1 Mobile Layout
- Single column
- Collapsible sections
- Touch-friendly inputs
- File upload optimization
- Simplified navigation

### 10.2 Tablet Layout
- Two-column where appropriate
- Maintained functionality
- Optimized spacing

---

**End of Profile Management Documentation**

