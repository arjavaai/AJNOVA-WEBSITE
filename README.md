# AJ NOVA - German University Admissions Platform

A comprehensive digital platform designed to streamline the German university admissions process for international students, featuring AI-powered document generation, automated workflows, and expert counseling services.

## What This Does

AJ NOVA empowers students to navigate the complex German university admission process through:
- **AI-Powered Document Generation** - Automated SOP, LOR, Resume, and Cover Letter creation
- **Application Tracking** - Real-time progress monitoring from consultation to acceptance
- **Expert Guidance** - Integrated counselor support and consultation scheduling
- **APS Verification** - Simplified Akademische Prüfstelle form submission and tracking

## Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git
- A code editor (VS Code recommended)

### Get the Website Running in 5 Minutes

```bash
# Clone the repository
git clone https://github.com/arjavaai/AJNOVA-WEBSITE.git
cd AJNOVA

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

That's it! The landing page should now be running locally.

## Project Structure

```
AJNOVA/
├── aj-nova-website/          # Next.js marketing website
│   ├── app/                  # Next.js 16 app directory
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   ├── page.tsx         # Homepage with all sections
│   │   └── globals.css      # Global styles and Tailwind config
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (Radix UI based)
│   │   ├── hero-section.tsx        # Landing page hero
│   │   ├── features-grid.tsx       # Features showcase
│   │   ├── testimonials-section.tsx # Student testimonials
│   │   ├── navbar.tsx              # Main navigation
│   │   └── footer.tsx              # Site footer
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── public/             # Static assets (images, logos)
│
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
└── other/                  # Additional resources
    └── homepage.html       # Reference designs
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

- ✅ Marketing Website (Phase 1) - **In Progress**
- ⏳ Student Dashboard (Phase 2) - Planned
- ⏳ Admin Dashboard (Phase 3) - Planned
- ⏳ AI Integration (Phase 4) - Planned
- ⏳ Automation (Phase 5) - Planned

## Tech Specs

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.3 | React framework |
| React | 19.2.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.1.9 | Styling |
| Radix UI | Latest | Accessible components |
| Framer Motion | Latest | Animations |

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
