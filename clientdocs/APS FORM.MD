# AjNova — Section 5: APS Form (UI Specification — Replica of APS Website, Simplified)

## Purpose
To collect every piece of student data required for APS verification in one clean, logical form — without payment or unnecessary APS site elements.
The goal is to help students fill everything correctly, avoid mistakes, and reduce repeated communication.

## 1. Page Introduction
- **Title**: APS Verification Form (AjNova)
- **Description**: This form helps AjNova gather all information needed for APS verification. It is for data collection only and does not replace the official APS submission process.
- **Link**: 
  • "Visit Official APS Website" (opens https://aps-india.de in a new tab)

## 2. Section One — Personal & Identification Details
Fields to display:
• Full Name (as in passport)
• Date of Birth
• Gender (Male / Female / Other / Prefer not to say)
• Nationality
• Passport Number
• Passport Expiry Date
• Email Address
• Mobile Number
• Country of Residence

**Inline Hints**:
• "Enter your full name exactly as in your passport."
• "Ensure passport is valid for at least 6 months."

## 3. Section Two — Secondary & Higher Secondary Education (10th / 12th)
**10th Grade Details**
• School Name
• Year of Completion
• Marks / Percentage

**12th Grade Details**
• School Name
• Year of Completion
• Marks / Percentage

**Instruction**:
"Enter marks exactly as shown on your certificate (percentage or CGPA)."

## 4. Section Three — Higher Education (Bachelor / Master)
**Fields**:
• Degree Awarded (e.g., B.Tech, BBA, M.Sc.)
• University / Institution Name
• Country of Education
• Study Period (From – To)
• Final Grade / Percentage
• Backlogs (number field, optional)
• Medium of Instruction (English / German / Other)

**Uploads**:
• Degree Certificate (PDF / JPG, max 10MB)
• Academic Transcripts (All Semesters, multiple files allowed, max 10MB each)

**Instructions for Students**:
• "Upload one file per document if possible."
• "Ensure all uploads are clearly readable."

## 5. Section Four — Language & Test Scores
**Fields**:
• English Test (IELTS, TOEFL, None)
• German Language Level (None, A1, A2, B1, B2, C1)
• Other Relevant Exams (GRE, GMAT, etc., optional)

## 6. Section Five — University Preferences & Intake
**Fields**:
• Preferred University 1
• Preferred University 2
• Preferred University 3
• Preferred Intake (Winter / Summer + Year)
• Application Channel (Direct / UniAssist / Other)

**Instruction**:
"You can name up to 3 preferred universities or leave blank if undecided."

## 7. Section Six — Optional Information / Returning Applicants
**Fields**:
• APS Application Number (if already obtained)
• Upload Existing APS Certificate (optional)

## 8. Section Seven — Declaration
**Checkbox**:
"I confirm that the information provided is true and that AjNova may use these details to assist with my APS verification process."

**Submit Button**:
Label: Submit APS Details

**Confirmation Message**:
"Thank you! Your APS details have been submitted successfully. Our verification team will contact you soon."

## 9. Error Prevention Features
To help students avoid mistakes:
• Inline hints for every major field.
• Validation for required fields (cannot submit incomplete forms).
• File upload limits (PDF or image files only, up to 10 MB).
• Warning if passport expiry is less than 6 months from current date.

## 10. Visual Aids
**Progress Bar (Optional)**:
Profile → APS Form → AI Docs → Submission (current step highlighted).

**Success Feedback**:
Show a green success message box after valid submission.

## 11. Logic for Developer Implementation
### Form Logic Overview:
• Pull existing data (Name, DOB, Education) from student profile when available.
• Only new or editable fields should be open to change.
• Validate required uploads before submission.
• Display inline messages for missing or invalid data.
• Mark profile as "APS Form Completed = True" once all required fields are filled.

### File Handling:
• Allow multiple transcripts (up to 10MB each).
• Store all uploads under /student_docs/aps/.
• Accept formats: .pdf, .jpg, .jpeg, .png.

### Post-Submission Process:
• Show confirmation text.
• Send email: "Your APS form has been received."
• Admin panel to review submissions and mark verified/pending/rejected.

## 12. UX Guidelines
• Keep the form on a single page, logically grouped by education level.
• Use consistent input formatting (e.g., YYYY for years, DD/MM/YYYY for dates).
• Use soft color cues for section dividers, not heavy boxes.
• Always show clear success feedback after submission.
• Allow users to edit their APS form later if corrections are needed.
• Keep tone reassuring — never bureaucratic.

End of Section 5 Document
Prepared for AjNova — APS Form Design & Validation Review