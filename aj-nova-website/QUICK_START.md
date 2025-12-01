# Quick Start Guide - AI Documents Feature

## 5-Minute Setup

### 1. Get Gemini API Key (2 minutes)
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

### 2. Configure Environment (1 minute)
Open `.env.local` and add your key:
```env
GEMINI_API_KEY=paste_your_key_here
```

### 3. Start Development Server (2 minutes)
```bash
cd aj-nova-website
npm run dev
```

Wait for: `Ready on http://localhost:3000`

---

## Quick Test Flow (5 minutes)

### Test Document Generation:

1. **Open browser**: http://localhost:3000/dashboard/documents

2. **Click "Generate"** on SOP card

3. **Fill wizard**:
   - University: `Stanford University`
   - Program: `MS Computer Science`
   - Notes: `Focus on my AI research`
   - Click through steps → Generate

4. **Wait 20-30 seconds** for AI to generate

5. **Edit** the generated document in the rich text editor

6. **Save** and **Submit for Review**

7. **Counsellor View**: http://localhost:3000/counsellor/documents
   - Click "Review"
   - Add feedback
   - Approve or request revision

8. **Download**: Try PDF or DOCX export

---

## File Locations Cheat Sheet

```
Key Files:
├── lib/gemini.ts              → AI integration
├── lib/mock-data.ts           → Data store (replace with DB)
├── lib/types.ts               → TypeScript types
├── app/dashboard/documents/   → Student interface
├── app/counsellor/documents/  → Counsellor interface
└── app/api/documents/         → API routes
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Production build
npm start               # Run production build

# Clean
rm -rf .next            # Clear build cache
rm -rf node_modules     # Clear dependencies
npm install             # Reinstall
```

---

## Quick Fixes

### Port 3000 in use?
```bash
# Server will auto-use next available port (3001, 3002, etc.)
# Or kill the process:
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

### Build errors?
```bash
rm -rf .next
npm run build
```

### Editor not loading?
- Check browser console
- Hard refresh (Ctrl+Shift+R)
- Clear cache

---

## API Endpoints Quick Reference

```
GET    /api/documents?studentId=1
GET    /api/documents/:id
PATCH  /api/documents/:id
POST   /api/documents/generate
```

---

## Key Routes

**Student:**
- `/dashboard` - Home
- `/dashboard/documents` - Documents list
- `/dashboard/documents/generate?type=SOP` - Generate wizard
- `/dashboard/documents/:id` - Editor

**Counsellor:**
- `/counsellor/documents` - Review queue
- `/counsellor/documents/:id` - Review page

---

## Need Help?

- 📖 Full docs: `AI_DOCUMENTS_README.md`
- 🧪 Testing guide: `TEST_GUIDE.md`
- 📊 Implementation details: `IMPLEMENTATION_SUMMARY.md`

---

**Happy Coding! 🚀**
