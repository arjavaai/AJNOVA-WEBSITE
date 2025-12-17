# AJ NOVA - German University Admissions Platform

A comprehensive digital platform designed to streamline the German university admissions process for international students, featuring AI-powered document generation, automated workflows, and expert counseling services.

## What This Does

AJ NOVA empowers students to navigate the complex German university admission process through:
- **✅ AI-Powered Document Generation** - Automated SOP, LOR, Resume, and Cover Letter creation using Google Gemini API
- **Application Tracking** - Real-time progress monitoring from consultation to acceptance
- **Expert Guidance** - Integrated counselor support and consultation scheduling
- **APS Verification** - Simplified Akademische Prüfstelle form submission and tracking

### 🎉 New: AI Document Generation System
A complete document generation and review workflow featuring:
- Generate professional admission documents (SOP, LOR, Resume, Cover Letter) with AI
- Rich text editor for customization
- Submit documents for counsellor review
- Download in PDF or DOCX format
- Track document status and versions

**[Quick Start Guide →](./aj-nova-website/QUICK_START.md)** | **[Full Documentation →](./aj-nova-website/AI_DOCUMENTS_README.md)** | **[Testing Guide →](./aj-nova-website/TEST_GUIDE.md)**

## Quick Start

### Prerequisites

**Frontend:**
- Node.js 18+ and npm/pnpm
- Git
- A code editor (VS Code recommended)

**Backend:**
- Python 3.13+ (recommended) or Python 3.10+
- pip (Python package manager)
- Virtual environment support

### Get the Website Running in 5 Minutes

**Frontend Only:**
```bash
# Clone the repository
git clone https://github.com/arjavaai/AJNOVA-WEBSITE.git
cd AJNOVA-WEBSITE

# Navigate to the website directory
cd aj-nova-website

# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

**Full Stack (Frontend + Backend):**
```bash
# Start Backend (from project root)
START_BACKEND.bat

# In a new terminal, start Frontend
cd aj-nova-website
npm run dev

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/api/docs
```

That's it! The application should now be running locally.

## Project Structure

```
AJNOVA-WEBSITE/
├── aj-nova-website/          # Next.js marketing website & student dashboard
│   ├── app/                  # Next.js 16 app directory
│   │   ├── api/             # API routes
│   │   │   └── documents/  # Document generation & management APIs
│   │   ├── dashboard/       # Student dashboard
│   │   │   ├── documents/  # AI document generation UI
│   │   │   └── page.tsx    # Dashboard home
│   │   ├── counsellor/      # Counsellor interface
│   │   │   └── documents/  # Document review system
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   ├── page.tsx         # Homepage with all sections
│   │   └── globals.css      # Global styles and Tailwind config
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (Radix UI based)
│   │   ├── document-editor.tsx     # Rich text editor (TipTap)
│   │   ├── hero-section.tsx        # Landing page hero
│   │   ├── features-grid.tsx       # Features showcase
│   │   ├── testimonials-section.tsx # Student testimonials
│   │   ├── navbar.tsx              # Main navigation
│   │   └── footer.tsx              # Site footer
│   ├── lib/                # Utility functions & integrations
│   │   ├── gemini.ts       # Google Gemini AI integration
│   │   ├── types.ts        # TypeScript type definitions
│   │   ├── mock-data.ts    # Mock data store (replace with DB)
│   │   ├── export-utils.ts # PDF/DOCX export functions
│   │   └── utils.ts        # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── public/             # Static assets (images, logos)
│   ├── AI_DOCUMENTS_README.md    # AI feature documentation
│   ├── TEST_GUIDE.md             # Testing instructions
│   └── QUICK_START.md            # Quick setup guide
│
├── backend/                # FastAPI backend (Python 3.13)
│   ├── app/
│   │   ├── main.py               # FastAPI application entry point
│   │   ├── main_working.py       # Current working version
│   │   ├── config.py             # Configuration settings
│   │   ├── dependencies.py       # Dependency injection
│   │   ├── api/v1/              # API endpoints
│   │   │   ├── auth.py          # Google OAuth authentication
│   │   │   ├── profiles.py      # Profile management
│   │   │   ├── documents.py     # Document & AI generation
│   │   │   ├── eligibility.py   # Eligibility checker
│   │   │   └── ...              # Other endpoints
│   │   ├── models/              # Pydantic models
│   │   ├── services/            # Business logic
│   │   │   ├── ai_service.py   # Google Gemini integration
│   │   │   ├── auth_service.py # Authentication logic
│   │   │   └── ...
│   │   └── middleware/          # Custom middleware
│   ├── venv/                    # Python 3.13 virtual environment
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example            # Environment template
│   └── README.md               # Backend documentation
│
├── START_BACKEND.bat       # Windows script to start backend
├── PRD/                    # Product Requirements Documents
│   ├── overview.md         # High-level project vision
│   ├── architecture.md     # System architecture
│   ├── student-dashboard/  # Student-facing feature specs
│   └── admin-dashboard.md  # Admin panel specifications
│
├── brandkit/               # Brand assets and guidelines
│   └── AJ NOVA BRAND KIT/  # Official logos, colors, fonts
│
├── clientdocs/             # Client requirement documents
│   ├── STUDENTDASHBOARD.MD
│   ├── ADMIN DASHBOARD.MD
│   └── [other specs]
│
└── PYTHON_313_UPGRADE_SUCCESS.md  # Python upgrade documentation
```

## Key Concepts

### 1. Technology Stack

**Frontend:**
- Next.js 16 with App Router
- React 19 with Server Components
- TypeScript for type safety
- Tailwind CSS 4.x for styling
- Radix UI for accessible components
- Framer Motion for animations

**Backend:**
- Python 3.13.11
- FastAPI (modern, fast web framework)
- Pydantic 2.12.5 for data validation
- Supabase for database & authentication
- Google Gemini AI for document generation
- JWT-based authentication
- RESTful API architecture

**Design System:**
- Shadcn/ui component library
- Responsive, mobile-first design
- Dark/light theme support via next-themes
- Custom animated components (beam-button, flashlight-card, etc.)

### 2. Project Phases

**Current Phase: Marketing Website (Phase 1)**
- Landing page with hero, features, testimonials
- Responsive design for all devices
- Dark/light theme toggle
- SEO optimization

**Upcoming Phases:**
- Phase 2: Student Dashboard (Application tracking, AI documents)
- Phase 3: Admin Dashboard (CRM, document review)
- Phase 4: AI Integration (Gemini API for document generation)
- Phase 5: Automation & Workflows (Email notifications, status updates)

### 3. Component Architecture

The website uses a modular component structure:

```
Page (app/page.tsx)
  ├── BackgroundGrid (animated background)
  ├── Navbar (navigation)
  ├── HeroSection (main CTA)
  ├── LogoStrip (partner logos)
  ├── FeaturesGrid (service highlights)
  ├── TestimonialsSection (social proof)
  ├── CtaSection (conversion)
  └── Footer (links, info)
```

Each component is self-contained and reusable.

## Common Tasks

### Running the Development Server

```bash
cd aj-nova-website
npm run dev
```

Starts the Next.js development server on http://localhost:3000 with hot reload.

### Building for Production

```bash
cd aj-nova-website
npm run build
npm start
```

Creates an optimized production build and starts the production server.

### Linting Code

```bash
cd aj-nova-website
npm run lint
```

Runs ESLint to check for code quality issues.

### Adding a New Component

1. Create the component in `components/` or `components/ui/`:
   ```tsx
   // components/my-component.tsx
   export function MyComponent() {
     return <div>Hello World</div>
   }
   ```

2. Import and use in your page:
   ```tsx
   import { MyComponent } from "@/components/my-component"
   ```

### Customizing the Theme

Edit `app/globals.css` to modify Tailwind CSS variables:

```css
@theme {
  --color-primary: #your-color;
}
```

## Documentation Guide

### For Developers
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design and technical architecture
- [aj-nova-website/README.md](./aj-nova-website/README.md) - Website-specific setup
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guidelines and workflow

### For Product/Business
- [PRD/overview.md](./PRD/overview.md) - Product vision and requirements
- [PRD/student-dashboard/overview.md](./PRD/student-dashboard/overview.md) - Student features
- [PRD/admin-dashboard.md](./PRD/admin-dashboard.md) - Admin features

### For Design
- [brandkit/](./brandkit/) - Brand assets, logos, color palette
- [PRD/design-system.md](./PRD/design-system.md) - UI/UX guidelines

## Troubleshooting

### "Module not found" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

```bash
# Kill the process or use a different port
npm run dev -- -p 3001
```

### TypeScript errors

```bash
# Regenerate types
npm run build
```

### Styling not working

```bash
# Rebuild Tailwind CSS
rm -rf .next
npm run dev
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code style guidelines
- Git workflow
- Pull request process
- Testing requirements

## Project Status

- ✅ Marketing Website (Phase 1) - **Complete**
- ✅ **AI Document Generation (Phase 2)** - **Complete** 🎉
  - Full AI-powered document generation system
  - Student dashboard with document management
  - Counsellor review interface
  - PDF/DOCX export functionality
  - [See Implementation Details →](./aj-nova-website/AI_DOCUMENTS_README.md)
- ⏳ Application Tracking Dashboard - Planned
- ⏳ Admin Dashboard (Phase 3) - Planned
- ⏳ Automation & Workflows (Phase 4) - Planned

## Tech Specs

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.3 | React framework |
| React | 19.2.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.1.9 | Styling |
| Radix UI | Latest | Accessible components |
| Framer Motion | Latest | Animations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.13.11 | Programming language |
| FastAPI | 0.124.4 | Web framework |
| Pydantic | 2.12.5 | Data validation |
| Uvicorn | 0.38.0 | ASGI server |
| Supabase | 2.27.0 | Database & auth |
| Google Gemini | 0.8.6 | AI document generation |
| JWT | Latest | Authentication tokens |

## License

This project is proprietary and confidential. All rights reserved by AJNOVA Abroad Consultancy.

## Support

For questions or issues:
- Technical: Contact the development team
- Business: Refer to PRD documentation
- Design: Check brandkit folder

---

**Last Updated:** December 2025
**Version:** 1.0.0
**Repository:** https://github.com/arjavaai/AJNOVA-WEBSITE
