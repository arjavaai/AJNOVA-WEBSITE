# AI Document Generation System

## Overview
This is a complete implementation of the AI-powered document generation system for AJ NOVA's student dashboard. The system allows students to generate, edit, and submit professional admission documents (SOP, LOR, Resume, Cover Letter) using Google's Gemini AI.

## Features Implemented

### 1. Document Management
- **4 Document Types**: SOP, LOR, Resume/CV, Cover Letter
- **Document Status Workflow**: NOT_STARTED → DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED/NEEDS_REVISION
- **Version Control**: Track multiple versions of each document
- **Mock Data Store**: In-memory storage (ready to be replaced with database)

### 2. AI Integration
- **Google Gemini API**: Integrated with proper error handling
- **Profile-based Generation**: Uses student profile data for personalization
- **Custom Prompts**: Tailored prompts for each document type
- **Additional Context**: Optional university/program targeting

### 3. User Interface

#### Student Dashboard
- **Documents Overview** (`/dashboard/documents`): Grid view of all 4 document types with status badges
- **Generation Wizard** (`/dashboard/documents/generate`): 3-step flow for document generation
  - Step 1: Target university and program
  - Step 2: Additional notes
  - Step 3: Review profile data and generate
- **Document Editor** (`/dashboard/documents/[id]`): Rich text editor with:
  - Full formatting toolbar (bold, italic, lists, undo/redo)
  - Auto-save functionality
  - Word count tracking
  - Submit for review
  - Download options (PDF and DOCX)
  - Regenerate functionality

#### Counsellor Interface
- **Review Queue** (`/counsellor/documents`): List of documents pending review
- **Review Page** (`/counsellor/documents/[id]`): 
  - View document content
  - Add comments/feedback
  - Approve or request revision
  - Document metadata

### 4. Document Export
- **PDF Export**: Professional formatting with student info and branding
- **DOCX Export**: Editable format for further customization
- **Branding**: AJ NOVA footer on all exports

### 5. Rich Text Editor
- Built with TipTap (React wrapper for ProseMirror)
- Features: Bold, Italic, Bullet Lists, Ordered Lists, Undo/Redo
- Clean, professional interface
- Real-time content updates

## File Structure

```
aj-nova-website/
├── app/
│   ├── api/
│   │   └── documents/
│   │       ├── route.ts                    # GET all documents
│   │       ├── generate/route.ts           # POST generate document
│   │       └── [id]/route.ts              # GET/PATCH specific document
│   ├── dashboard/
│   │   ├── layout.tsx                     # Dashboard layout with nav
│   │   ├── page.tsx                       # Dashboard home
│   │   └── documents/
│   │       ├── page.tsx                   # Documents list
│   │       ├── generate/page.tsx          # Generation wizard
│   │       └── [id]/page.tsx             # Document editor
│   └── counsellor/
│       └── documents/
│           ├── page.tsx                   # Review queue
│           └── [id]/page.tsx             # Review interface
├── components/
│   ├── document-editor.tsx                # Rich text editor
│   └── ui/
│       ├── badge.tsx                      # Status badges
│       └── alert-dialog.tsx               # Confirmation dialogs
├── lib/
│   ├── gemini.ts                          # Gemini API integration
│   ├── types.ts                           # TypeScript types
│   ├── mock-data.ts                       # Mock data store
│   ├── export-utils.ts                    # PDF/DOCX export functions
│   └── utils.ts                           # Utility functions
└── .env.local                             # Environment variables
```

## Setup Instructions

### 1. Install Dependencies
All required packages are already installed:
- `@google/generative-ai` - Gemini API client
- `jspdf`, `jspdf-autotable` - PDF generation
- `docx` - DOCX generation
- `file-saver` - File download helper
- `@tiptap/react`, `@tiptap/starter-kit` - Rich text editor

### 2. Configure Gemini API
Add your Gemini API key to `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### 3. Run the Application
```bash
npm run dev
```

Navigate to:
- Student Dashboard: http://localhost:3000/dashboard/documents
- Counsellor Review: http://localhost:3000/counsellor/documents

## Usage Flow

### For Students:
1. Go to `/dashboard/documents`
2. Click "Generate" on any document type
3. Fill in optional details (university, program, notes)
4. Review profile data
5. Click "Generate Document" (takes 20-30 seconds)
6. Edit the generated content in the rich text editor
7. Save draft or submit for review
8. Download as PDF or DOCX once approved

### For Counsellors:
1. Go to `/counsellor/documents`
2. Click "Review" on any submitted document
3. Read the content
4. Add feedback comments
5. Approve or request revision
6. Student receives notification

## API Endpoints

### GET `/api/documents?studentId={id}`
Get all documents for a student
```json
{
  "documents": [
    {
      "id": "1",
      "studentId": "1",
      "type": "SOP",
      "title": "Statement of Purpose",
      "content": "...",
      "status": "DRAFT",
      "version": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/api/documents/generate`
Generate a new document using AI
```json
Request:
{
  "documentType": "SOP",
  "profileData": {
    "id": "1",
    "name": "Ajay Kumar",
    "email": "ajay@example.com",
    ...
  },
  "targetUniversity": "Stanford University",
  "targetProgram": "MS Computer Science",
  "additionalNotes": "Focus on machine learning experience"
}

Response:
{
  "document": { ... },
  "content": "Generated document content..."
}
```

### GET `/api/documents/[id]`
Get a specific document

### PATCH `/api/documents/[id]`
Update a document
```json
{
  "content": "Updated content...",
  "status": "SUBMITTED",
  "counsellorComments": "Great work!"
}
```

## Document Status Workflow

```
NOT_STARTED
    ↓ (Generate)
  DRAFT
    ↓ (Submit)
SUBMITTED
    ↓ (Counsellor reviews)
UNDER_REVIEW
    ↓
    ├→ APPROVED (Ready for download)
    └→ NEEDS_REVISION (Back to student)
```

## Testing Checklist

- [x] Build succeeds without errors
- [x] All pages render correctly
- [x] Document list page shows 4 document types
- [x] Generation wizard has 3 steps
- [x] API routes are functional
- [x] Rich text editor works
- [x] Status badges display correctly
- [x] Download functionality implemented
- [x] Counsellor review interface complete
- [ ] Test with actual Gemini API key
- [ ] Test PDF/DOCX export functionality
- [ ] Test full workflow end-to-end

## Database Integration (TODO)

Currently using in-memory mock data. To integrate with a real database:

1. **Choose a database**: PostgreSQL, MySQL, or MongoDB
2. **Set up Prisma** (recommended ORM):
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
3. **Create schema** based on types in `lib/types.ts`
4. **Replace mock-data.ts** with actual database queries
5. **Add user authentication** to track which student/counsellor

## Next Steps

1. **Add User Authentication**: Integrate NextAuth.js or similar
2. **Connect Real Database**: Replace mock data with Prisma + PostgreSQL
3. **Add Email Notifications**: Notify on status changes
4. **Implement Version History**: Show all previous versions
5. **Add Document Templates**: Pre-built templates for different scenarios
6. **Improve AI Prompts**: Refine based on user feedback
7. **Add Analytics**: Track generation success rates
8. **Mobile Optimization**: Improve mobile editor experience

## Troubleshooting

### Gemini API Errors
- Check API key is valid
- Ensure API quota hasn't been exceeded
- Verify network connection

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Editor Not Loading
- Check TipTap dependencies are installed
- Verify 'use client' directive is present

## Support

For issues or questions, refer to:
- Next.js docs: https://nextjs.org/docs
- Gemini API docs: https://ai.google.dev/docs
- TipTap docs: https://tiptap.dev

---

**Built with ❤️ for AJ NOVA**
