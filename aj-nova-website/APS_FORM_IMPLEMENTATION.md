# APS Form Implementation - Complete Guide

## Overview
This document describes the complete implementation of the APS (Akademische Prüfstelle) Verification Form for AJ NOVA's student dashboard. The form helps gather all information needed for APS verification and tracks the verification status.

## Features Implemented

### 1. Complete Form with 7 Sections
- ✅ **Section 1:** Personal & Identification Details
- ✅ **Section 2:** Secondary & Higher Secondary Education (10th & 12th Grade)
- ✅ **Section 3:** Higher Education (Bachelor/Master)
- ✅ **Section 4:** Language & Test Scores (English/German)
- ✅ **Section 5:** University Preferences & Intake
- ✅ **Section 6:** Optional Information / Returning Applicants
- ✅ **Section 7:** Declaration

### 2. File Upload System
- **Drag-and-drop file upload** with click-to-browse fallback
- **File validation:**
  - Accepted formats: PDF, JPG, PNG
  - Maximum size: 10MB per file
  - Multiple files support for transcripts
- **Upload features:**
  - Progress indicator during upload
  - File preview with icons
  - File size display
  - Upload date tracking
  - Remove/replace functionality
  - Real-time validation feedback

### 3. Document Verification Status
- **Status tracking** for each uploaded document:
  - ✅ Verified/Reviewed
  - ⏳ Pending Review
  - ⚠ Needs Correction
  - ❌ Rejected
- **Status table** showing all documents with:
  - Document name and upload date
  - Current verification status
  - Actions (View, Re-upload)
  - Counsellor comments
- **Color-coded badges** for quick status identification

### 4. Form Progress & Validation
- **Progress bar** showing form completion percentage
- **Inline validation** for all required fields
- **Auto-save** functionality (draft mode)
- **Section completion indicators** (checkmarks)
- **Accordion-based navigation** for easy section access
- **Passport expiry warning** (if < 6 months)

### 5. Status Management
- **Form statuses:**
  - Not Started
  - Draft (saved but not submitted)
  - Submitted (awaiting review)
  - Under Review (counsellor reviewing)
  - Verified (approved)
  - Needs Correction (requires updates)
  - Rejected (with reason)
- **Visual status badges** on form and dashboard
- **Contextual alerts** based on status

### 6. Dashboard Integration
- **APS status card** on student dashboard showing:
  - Current verification status
  - Form completion percentage
  - Action buttons (Continue Form / View Form)
  - Status-specific alerts (corrections needed, verified)
- **Real-time updates** when status changes

## File Structure

```
aj-nova-website/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Dashboard with APS status
│   │   └── aps-form/
│   │       └── page.tsx                # Main APS form page
│   └── api/
│       └── aps/
│           └── route.ts                # APS form API endpoints
├── components/
│   ├── file-upload.tsx                 # Reusable file upload component
│   └── aps-document-status.tsx         # Document status table
└── lib/
    ├── aps-types.ts                    # TypeScript types & interfaces
    └── aps-mock-data.ts                # Mock data & utilities
```

## Components

### 1. FileUpload Component
**Location:** `components/file-upload.tsx`

**Features:**
- Drag-and-drop file upload
- File type and size validation
- Single or multiple file mode
- Upload progress tracking
- File preview with status badges
- Remove/replace functionality
- Disabled state for submitted forms

**Props:**
```typescript
interface FileUploadProps {
  label: string
  description?: string
  accept?: string              // default: '.pdf,.jpg,.jpeg,.png'
  maxSize?: number            // in MB, default: 10
  multiple?: boolean          // default: false
  files: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  disabled?: boolean
  required?: boolean
}
```

**Usage:**
```tsx
<FileUpload
  label="Degree Certificate"
  description="Upload your degree certificate (PDF, JPG, or PNG)"
  accept=".pdf,.jpg,.jpeg,.png"
  maxSize={10}
  multiple={false}
  files={form.higherEducation.degreeCertificate ? [form.higherEducation.degreeCertificate] : []}
  onChange={(files) => updateForm({
    higherEducation: { ...form.higherEducation, degreeCertificate: files[0] }
  })}
  required
/>
```

### 2. DocumentStatusTable Component
**Location:** `components/aps-document-status.tsx`

**Features:**
- Displays all uploaded documents in a table
- Shows verification status for each document
- Displays counsellor comments
- Action buttons (View, Re-upload)
- Status icons and badges

**Props:**
```typescript
interface DocumentStatusTableProps {
  documents: Array<{
    name: string
    file?: UploadedFile
    required: boolean
  }>
  onReupload?: (documentName: string) => void
  onView?: (file: UploadedFile) => void
}
```

## API Endpoints

### GET /api/aps
**Description:** Fetch APS form data for a student

**Query Parameters:**
- `studentId` (required): Student ID

**Response:**
```json
{
  "form": {
    "id": "1",
    "studentId": "1",
    "status": "DRAFT",
    "personalDetails": { ... },
    "secondaryEducation": { ... },
    "higherEducation": { ... },
    "languageTestScores": { ... },
    "universityPreferences": { ... },
    "optionalInfo": { ... },
    "declarationAccepted": false,
    "completionPercentage": 65,
    "createdAt": "2025-12-01T...",
    "updatedAt": "2025-12-01T..."
  }
}
```

### PATCH /api/aps
**Description:** Update APS form (save draft)

**Body:**
```json
{
  "personalDetails": { ... },
  "status": "DRAFT"
}
```

**Response:**
```json
{
  "form": { ... }
}
```

### POST /api/aps
**Description:** Submit APS form for review

**Body:**
```json
{
  "personalDetails": { ... },
  "declarationAccepted": true
}
```

**Response:**
```json
{
  "form": { ... },
  "message": "APS form submitted successfully"
}
```

## Data Types

### APSForm
```typescript
interface APSForm {
  id: string
  studentId: string
  status: APSStatus
  personalDetails: PersonalDetails
  secondaryEducation: SecondaryEducation
  higherEducation: HigherEducation
  languageTestScores: LanguageTestScores
  universityPreferences: UniversityPreferences
  optionalInfo: OptionalInfo
  declarationAccepted: boolean
  submittedAt?: Date
  reviewedAt?: Date
  verifiedAt?: Date
  counsellorComments?: string
  createdAt: Date
  updatedAt: Date
  completionPercentage: number
}
```

### APSStatus
```typescript
type APSStatus = 
  | 'NOT_STARTED'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'NEEDS_CORRECTION'
  | 'REJECTED'
```

### UploadedFile
```typescript
interface UploadedFile {
  id: string
  name: string
  url: string
  size: number
  uploadedAt: Date
  status: DocumentVerificationStatus
  comments?: string
}
```

## User Flow

### First-Time Submission Flow
1. Student navigates to `/dashboard/aps-form`
2. Form loads with pre-filled data from profile
3. Student completes all sections:
   - Personal & Identification Details
   - Secondary Education (10th & 12th)
   - Higher Education (Bachelor/Master)
   - Language & Test Scores
   - University Preferences
   - Optional Information (if applicable)
4. Student uploads required documents:
   - Degree Certificate
   - Academic Transcripts
5. Student can save progress (Draft status)
6. Student reviews all information
7. Student accepts declaration checkbox
8. Student submits form
9. Status changes to "SUBMITTED"
10. Confirmation message displayed
11. Email confirmation sent

### Correction Flow
1. Student receives notification (Needs Correction)
2. Student views form with counsellor comments
3. Form becomes editable again
4. Student makes corrections
5. Student re-uploads corrected documents (if needed)
6. Student resubmits form
7. Status changes back to "Under Review"

### Counsellor Review Flow
1. Counsellor receives notification of new submission
2. Counsellor reviews form in admin dashboard
3. Counsellor checks uploaded documents
4. Counsellor can:
   - Mark as Verified
   - Request Corrections (with comments)
   - Reject (with reason)
5. Student receives notification of status change

## Validation Rules

### Required Fields
- **Personal Details:** All fields (9 fields)
- **Secondary Education:** School names, years, marks (6 fields)
- **Higher Education:** Degree, university, country, period, grade, medium (7 fields)
- **Language Scores:** German level (1 field)
- **University Preferences:** Preferred intake (1 field)
- **Declaration:** Must be accepted (1 field)

### File Validation
- **Formats:** PDF, JPG, JPEG, PNG only
- **Size:** Max 10MB per file
- **Required Uploads:**
  - Degree Certificate
  - Academic Transcripts (at least 1)

### Date Validation
- **Passport Expiry:** Warning if < 6 months
- **Birth Date:** Must be in the past
- **Study Period:** Valid date range

## UI/UX Features

### Responsive Design
- **Mobile:** Single column, touch-friendly
- **Tablet:** Optimized 2-column layout
- **Desktop:** Full multi-column layout

### Accessibility
- Proper label associations
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

### Visual Feedback
- Loading spinners during API calls
- Progress bars for file uploads
- Success/error messages
- Status badges with colors
- Inline validation errors
- Passport expiry warnings

### Performance
- Auto-save functionality
- Optimistic UI updates
- Lazy loading of sections
- Efficient file handling

## Testing Guide

### Manual Testing Checklist

#### Form Functionality
- [ ] All sections load correctly
- [ ] Pre-filled data appears from profile
- [ ] All input fields are editable (when not submitted)
- [ ] Date pickers work correctly
- [ ] Dropdowns populate with correct options
- [ ] Checkboxes function properly

#### File Upload
- [ ] Drag-and-drop works
- [ ] Click-to-browse works
- [ ] File validation (size, type) works
- [ ] Multiple files upload for transcripts
- [ ] Single file upload for degree certificate
- [ ] File removal works
- [ ] Upload progress shows correctly
- [ ] File preview displays properly

#### Validation
- [ ] Required fields show validation errors
- [ ] Email format validation works
- [ ] Phone number format validation works
- [ ] Date range validation works
- [ ] Passport expiry warning displays
- [ ] File size/type validation works

#### Save & Submit
- [ ] Save Progress button works (Draft)
- [ ] Submit button disabled until required fields filled
- [ ] Declaration must be checked to submit
- [ ] Confirmation message shows after submission
- [ ] Form becomes read-only after submission
- [ ] Status updates correctly

#### Dashboard Integration
- [ ] APS status card shows on dashboard
- [ ] Status badge displays correctly
- [ ] Completion percentage accurate
- [ ] Action button navigates to form
- [ ] Status-specific alerts show correctly

#### Document Status
- [ ] Document status table appears after submission
- [ ] All uploaded documents listed
- [ ] Status badges show correctly
- [ ] View button opens files
- [ ] Counsellor comments display (if any)
- [ ] Re-upload functionality works

## Future Enhancements

### Phase 2 Features
- [ ] Real-time form validation
- [ ] Auto-save every 30 seconds
- [ ] Document OCR for data extraction
- [ ] Multi-language support
- [ ] Email notifications system
- [ ] Timeline view of status changes
- [ ] PDF export of completed form
- [ ] Print-friendly view

### Phase 3 Features
- [ ] Integration with official APS API
- [ ] Automated document verification
- [ ] AI-powered form assistance
- [ ] Mobile app version
- [ ] Offline mode with sync
- [ ] Video call scheduling with counsellor
- [ ] Chat support within form

## Troubleshooting

### Common Issues

#### Form not loading
- Check API endpoint is running
- Verify studentId is being passed correctly
- Check browser console for errors

#### File upload fails
- Verify file size < 10MB
- Check file format (PDF, JPG, PNG only)
- Ensure sufficient storage space
- Check network connection

#### Save/Submit not working
- Ensure all required fields are filled
- Check declaration is accepted
- Verify API endpoint is accessible
- Check browser console for errors

## Security Considerations

- All file uploads are validated server-side
- File size limits enforced (10MB max)
- Only accepted file types allowed
- User authentication required
- API endpoints protected
- Sensitive data encrypted in transit
- No sensitive data in client-side logs

## Performance Optimization

- Lazy loading of form sections
- Debounced auto-save
- Optimized file upload (chunked for large files)
- Efficient state management
- Minimal re-renders
- Cached API responses where appropriate

## Conclusion

The APS Form implementation provides a complete, user-friendly solution for students to submit their APS verification information. With comprehensive validation, file upload capabilities, status tracking, and dashboard integration, it streamlines the APS verification process for both students and counsellors.

---

**Last Updated:** December 1, 2025  
**Version:** 1.0.0  
**Maintained By:** AJ NOVA Development Team
