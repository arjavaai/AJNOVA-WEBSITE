# Testing Guide for AI Document Generation

## Prerequisites
1. Ensure the dev server is running: `npm run dev`
2. Add your Gemini API key to `.env.local`

## Manual Testing Steps

### 1. Test Document List Page
**URL**: http://localhost:3000/dashboard/documents

**Expected Result**:
- [ ] Page loads without errors
- [ ] 4 document cards are displayed (SOP, LOR, Resume, Cover Letter)
- [ ] Each card shows:
  - Document name and description
  - Status badge (should be "Not Started" initially)
  - "Generate" button
- [ ] Cards have hover effects

**Screenshot checklist**:
- Grid layout is responsive
- Status badges are color-coded
- Icons are displayed correctly

---

### 2. Test Document Generation Wizard
**URL**: http://localhost:3000/dashboard/documents/generate?type=SOP

**Step 1 - Additional Information**:
- [ ] Progress indicator shows "Step 1 of 3"
- [ ] Input fields for:
  - Target University (optional)
  - Target Program (optional)
- [ ] "Continue" button works
- [ ] Can enter text in inputs

**Test Data**:
- Target University: `Stanford University`
- Target Program: `Master of Science in Computer Science`

**Step 2 - Additional Notes**:
- [ ] Progress indicator shows "Step 2 of 3"
- [ ] Textarea for additional notes
- [ ] "Back" button returns to Step 1
- [ ] "Continue" button works

**Test Data**:
- Additional Notes: `I have strong experience in machine learning and published 2 research papers`

**Step 3 - Review & Generate**:
- [ ] Progress indicator shows "Step 3 of 3"
- [ ] Profile information is displayed:
  - Name: Ajay Kumar
  - Email: ajay.kumar@example.com
  - Education details
  - Work experience
  - Skills
  - Entered university and program
- [ ] "Back" button returns to Step 2
- [ ] "Generate Document" button shows sparkle icon
- [ ] Blue info box explains what will happen

**Generate Action**:
- [ ] Click "Generate Document"
- [ ] Button shows loading state ("Generating...")
- [ ] After 20-30 seconds, redirects to editor page
- [ ] Check browser console for any errors

**Note**: If you don't have a real Gemini API key, you'll see an error. This is expected.

---

### 3. Test Document Editor
**URL**: After generation or navigate to http://localhost:3000/dashboard/documents/1

**Editor Interface**:
- [ ] Document title is displayed
- [ ] Version number shown
- [ ] Status badge displayed
- [ ] Rich text editor loaded
- [ ] Toolbar with formatting buttons:
  - Bold, Italic
  - Bullet list, Ordered list
  - Undo, Redo

**Editor Features**:
- [ ] Can type in the editor
- [ ] Bold button works (Ctrl+B or click)
- [ ] Italic button works (Ctrl+I or click)
- [ ] Can create bullet lists
- [ ] Can create numbered lists
- [ ] Undo/Redo buttons work
- [ ] Active formatting buttons are highlighted

**Sidebar Stats**:
- [ ] Word count updates as you type
- [ ] Last updated timestamp displayed
- [ ] Status shown

**Actions**:
- [ ] "Save Draft" button:
  - Click and verify button shows "Saving..."
  - After save, "hasUnsavedChanges" indicator resets
- [ ] "Submit for Review" button:
  - Click and see confirmation dialog
  - Dialog explains what happens
  - Can cancel or confirm
  - After submit, status changes to "SUBMITTED"
- [ ] "Regenerate" button:
  - Redirects back to generation wizard
- [ ] "Download" dropdown:
  - Shows "Download as PDF" option
  - Shows "Download as DOCX" option
  - **Note**: Clicking may have errors if libraries need browser-specific setup

**Back Navigation**:
- [ ] "Back to Documents" button works

---

### 4. Test Counsellor Review Queue
**URL**: http://localhost:3000/counsellor/documents

**Expected Result**:
- [ ] Page loads
- [ ] If no documents submitted: Shows "No documents pending review" message
- [ ] After submitting a document from student view:
  - Document card appears
  - Shows document title, version, status
  - Shows submitted date
  - "Review" button displayed

---

### 5. Test Counsellor Review Page
**URL**: http://localhost:3000/counsellor/documents/1
(Only works if document status is SUBMITTED or UNDER_REVIEW)

**Review Interface**:
- [ ] Document content displayed in read-only view
- [ ] Document info sidebar shows:
  - Version number
  - Submitted date
  - Word count
- [ ] Feedback textarea provided
- [ ] Two action buttons:
  - "Approve Document" (green)
  - "Request Revision" (red)

**Approve Flow**:
- [ ] Click "Approve Document"
- [ ] Button shows loading state
- [ ] Success alert appears
- [ ] Redirects to review queue
- [ ] In student view, document status is now "APPROVED"

**Revision Flow**:
- [ ] Enter feedback in textarea
- [ ] Click "Request Revision"
- [ ] Button shows loading state
- [ ] Success alert appears
- [ ] Redirects to review queue
- [ ] In student view:
  - Document status is "NEEDS_REVISION"
  - Counsellor feedback is displayed

---

### 6. Test Dashboard Home
**URL**: http://localhost:3000/dashboard

**Expected Result**:
- [ ] Page loads
- [ ] Three stat cards displayed:
  - Total Documents: 4
  - In Progress: (varies)
  - Approved: (varies)
- [ ] Quick actions card with:
  - "Manage Documents" button
  - "Generate New SOP" button
- [ ] Both buttons navigate correctly

---

### 7. Test API Endpoints (Optional - Advanced)

**Using browser DevTools or Postman**:

**GET Documents**:
```bash
GET http://localhost:3000/api/documents?studentId=1
```
Expected: JSON with array of 4 documents

**GET Single Document**:
```bash
GET http://localhost:3000/api/documents/1
```
Expected: JSON with single document object

**UPDATE Document**:
```bash
PATCH http://localhost:3000/api/documents/1
Content-Type: application/json

{
  "content": "<p>Updated content</p>",
  "status": "DRAFT"
}
```
Expected: JSON with updated document

**GENERATE Document** (requires real API key):
```bash
POST http://localhost:3000/api/documents/generate
Content-Type: application/json

{
  "documentType": "SOP",
  "profileData": {
    "id": "1",
    "name": "Ajay Kumar",
    "email": "ajay@example.com",
    "education": "B.Tech CS",
    "completionPercentage": 85
  },
  "targetUniversity": "Stanford",
  "targetProgram": "MS CS"
}
```
Expected: JSON with generated document

---

## Common Issues & Solutions

### Issue: Gemini API Error
**Symptom**: Generation fails with API error
**Solution**: 
1. Check `.env.local` has valid `GEMINI_API_KEY`
2. Verify key at https://makersuite.google.com/app/apikey
3. Ensure you have API quota available

### Issue: useSearchParams Error
**Symptom**: Build fails or page doesn't load
**Solution**: Already fixed with Suspense wrapper

### Issue: Editor Not Loading
**Symptom**: Blank editor area
**Solution**: 
1. Check browser console for errors
2. Verify TipTap packages are installed
3. Hard refresh (Ctrl+Shift+R)

### Issue: Download Doesn't Work
**Symptom**: PDF/DOCX download fails
**Solution**:
1. Check browser console for errors
2. Some libraries may need additional configuration
3. Verify jsPDF and docx packages are installed

### Issue: Styles Look Broken
**Symptom**: UI doesn't look right
**Solution**:
1. Clear `.next` folder: `rm -rf .next`
2. Restart dev server
3. Hard refresh browser

---

## Performance Checklist

- [ ] Pages load in < 2 seconds
- [ ] Document generation completes in 20-30 seconds
- [ ] Editor is responsive (no lag when typing)
- [ ] Save operations complete quickly (< 1 second)
- [ ] No console errors or warnings
- [ ] Mobile view is responsive (test on narrow screen)

---

## Accessibility Checklist

- [ ] Can navigate with keyboard (Tab key)
- [ ] Buttons have proper focus indicators
- [ ] Form inputs have labels
- [ ] Status badges have proper contrast
- [ ] Error messages are clear

---

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

---

## Next Steps After Testing

1. **Document Issues**: Create a list of bugs found
2. **Gather Feedback**: Note UX improvements
3. **Real API Testing**: Test with actual Gemini API key
4. **Database Integration**: Plan migration from mock data
5. **Authentication**: Add user login system

---

**Happy Testing! 🚀**
