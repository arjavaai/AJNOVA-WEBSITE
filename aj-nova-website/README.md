# AJ NOVA Marketing Website

The official marketing website for AJ NOVA - a comprehensive digital platform for German university admissions. Built with Next.js 16, React 19, and Tailwind CSS 4.

## What This Is

This is the public-facing website that serves as the entry point for students interested in studying in Germany. It features:
- **Landing Page** - Hero section, features, testimonials, and CTAs
- **Responsive Design** - Mobile-first approach with dark/light theme
- **Modern Animations** - Framer Motion powered interactive components
- **SEO Optimized** - Server-side rendering for better search visibility

## Quick Start

### Get Running in 2 Minutes

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev

# Open http://localhost:3000
```

That's it! The site should be running with hot reload enabled.

### Prerequisites

- **Node.js** 18+ (check with `node --version`)
- **npm** or **pnpm** package manager
- A modern code editor (VS Code recommended)

## Project Structure

```
aj-nova-website/
├── app/                          # Next.js 16 App Router
│   ├── layout.tsx               # Root layout (theme provider, fonts)
│   ├── page.tsx                 # Homepage - landing page
│   └── globals.css              # Global styles + Tailwind theme
│
├── components/                   # React Components
│   ├── ui/                      # Base UI components (Radix UI + shadcn)
│   │   ├── button.tsx          # Button variants
│   │   ├── card.tsx            # Card container
│   │   ├── input.tsx           # Form inputs
│   │   └── [50+ components]    # All shadcn/ui components
│   │
│   ├── navbar.tsx               # Main navigation with theme toggle
│   ├── hero-section.tsx         # Hero with animated text reveal
│   ├── features-grid.tsx        # Service features showcase
│   ├── testimonials-section.tsx # Student testimonials carousel
│   ├── cta-section.tsx          # Call-to-action section
│   ├── footer.tsx               # Site footer with links
│   │
│   └── [Custom Components]
│       ├── beam-button.tsx      # Animated button with beam effect
│       ├── flashlight-card.tsx  # Card with flashlight hover
│       ├── background-grid.tsx  # Animated background grid
│       ├── text-reveal.tsx      # Text animation component
│       ├── rotating-feature.tsx # Rotating feature display
│       ├── marquee.tsx          # Infinite scroll marquee
│       └── logo-strip.tsx       # Partner logos strip
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts            # Mobile breakpoint detection
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                          # Utility Functions
│   └── utils.ts                 # Helper functions (cn, etc.)
│
├── public/                       # Static Assets
│   ├── icon.svg                 # Favicon
│   ├── placeholder-logo.svg     # Logo placeholder
│   └── [images]                 # Other static files
│
├── styles/                       # Additional Styles
│   └── globals.css              # Alternative global styles
│
├── components.json               # shadcn/ui configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── next.config.mjs               # Next.js configuration
└── package.json                  # Dependencies and scripts
```

## Key Technologies

### Core Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.3 | React framework with App Router |
| **React** | 19.2.0 | UI library with Server Components |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Tailwind CSS** | 4.1.9 | Utility-first CSS framework |

### UI & Animation
| Library | Purpose |
|---------|---------|
| **Radix UI** | Accessible, unstyled component primitives |
| **shadcn/ui** | Pre-built component library |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Beautiful icon set |
| **next-themes** | Dark/light theme switching |

### Form & Validation
| Library | Purpose |
|---------|---------|
| **React Hook Form** | Performant form handling |
| **Zod** | TypeScript-first schema validation |

### Other Tools
| Tool | Purpose |
|------|---------|
| **Embla Carousel** | Touch-friendly carousels |
| **Recharts** | Data visualization (for future analytics) |
| **Sonner** | Beautiful toast notifications |

## Component Architecture

### Page Structure

The homepage (`app/page.tsx`) is composed of modular sections:

```tsx
<Page>
  <BackgroundGrid />       {/* Animated background */}
  <Navbar />               {/* Navigation + theme toggle */}
  <HeroSection />          {/* Hero with CTAs */}
  <LogoStrip />            {/* Partner logos */}
  <FeaturesGrid />         {/* Services showcase */}
  <TestimonialsSection />  {/* Student testimonials */}
  <CtaSection />           {/* Final conversion section */}
  <Footer />               {/* Links and info */}
</Page>
```

### Custom Animated Components

#### BeamButton (`components/beam-button.tsx`)
Animated button with beam light effect on hover.

```tsx
import { BeamButton } from "@/components/beam-button"

<BeamButton primary>
  Get Started <ArrowRight />
</BeamButton>
```

**Props:**
- `primary?: boolean` - Primary styling (coral color)
- `children: ReactNode` - Button content
- `...props` - All standard button props

#### FlashlightCard (`components/flashlight-card.tsx`)
Card with spotlight effect that follows mouse movement.

```tsx
import { FlashlightCard } from "@/components/flashlight-card"

<FlashlightCard>
  <h3>Feature Title</h3>
  <p>Description</p>
</FlashlightCard>
```

#### TextReveal (`components/text-reveal.tsx`)
Animated text reveal with typewriter effect.

```tsx
import { TextReveal } from "@/components/text-reveal"

<TextReveal text="Your Text Here" />
```

## Common Tasks

### Adding a New Page

1. Create a new route folder in `app/`:
```bash
mkdir app/services
touch app/services/page.tsx
```

2. Create the page component:
```tsx
// app/services/page.tsx
export default function ServicesPage() {
  return (
    <div>
      <h1>Services</h1>
    </div>
  )
}
```

The page will be automatically available at `/services`.

### Adding a New Component

1. Create component file in `components/`:
```tsx
// components/my-component.tsx
export function MyComponent() {
  return <div>Hello</div>
}
```

2. Import and use:
```tsx
import { MyComponent } from "@/components/my-component"
```

### Adding a shadcn/ui Component

Use the CLI to add pre-built components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

This adds the component to `components/ui/`.

### Customizing the Theme

#### Colors

Edit `app/globals.css` to modify the color palette:

```css
@theme {
  --color-navy: #0a2342;
  --color-coral: #f25c45;
  --color-warm-white: #f8f8f6;
  /* Add your colors */
}
```

#### Typography

Fonts are configured in `app/layout.tsx`:

```tsx
const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})
```

#### Dark/Light Theme

Theme colors are defined using CSS variables in `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

### Running Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

## Development Workflow

### File Naming Conventions

- **Components**: PascalCase with `.tsx` extension
  - `HeroSection.tsx` ❌
  - `hero-section.tsx` ✅

- **Utilities**: kebab-case with `.ts` extension
  - `myUtil.ts` ❌
  - `my-util.ts` ✅

- **Pages**: Always `page.tsx` in Next.js App Router
  - `index.tsx` ❌
  - `page.tsx` ✅

### Component Structure Pattern

Follow this pattern for consistent components:

```tsx
// components/my-component.tsx

import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps extends ComponentProps<"div"> {
  title: string
  description?: string
}

export function MyComponent({
  title,
  description,
  className,
  ...props
}: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### TypeScript Best Practices

- Use `interface` for props
- Extend HTML element types when needed
- Use `ComponentProps<"element">` for flexibility
- Avoid `any` - use `unknown` instead

### Styling Guidelines

- Use Tailwind classes for styling
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Use CSS variables for theme colors

```tsx
<div className={cn(
  "base-class",
  variant === "primary" && "primary-class",
  className
)}>
```

## Environment Variables

Create a `.env.local` file (not tracked in git):

```bash
# Public variables (accessible in browser)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Private variables (server-side only)
# Add backend API keys here when needed
```

## Troubleshooting

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Port Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Regenerate TypeScript types
rm -rf .next
npm run dev
```

### Styling Not Applying

1. Check Tailwind class names are correct
2. Rebuild: `rm -rf .next && npm run dev`
3. Verify `globals.css` is imported in `layout.tsx`

### Hot Reload Not Working

1. Restart the dev server
2. Check file is saved
3. Clear browser cache (Ctrl+Shift+R)

## Performance Tips

### Image Optimization

Always use Next.js `Image` component:

```tsx
import Image from "next/image"

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // for above-the-fold images
/>
```

### Code Splitting

Use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { loading: () => <Skeleton /> }
)
```

### Font Optimization

Fonts are automatically optimized by Next.js font system.

## Testing (Future)

Testing infrastructure will be added in future sprints:

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Visual Regression**: Chromatic

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js and deploys
4. Set environment variables in Vercel dashboard

### Build Locally

```bash
npm run build
npm start
```

## Next Steps

This is Phase 1 (Marketing Website). Upcoming phases:

- **Phase 2**: Student Dashboard
- **Phase 3**: Admin Dashboard
- **Phase 4**: AI Integration
- **Phase 5**: Backend API

## Related Documentation

- [Root README](../README.md) - Project overview
- [PRD Documentation](../PRD/) - Product requirements
- [Architecture](../PRD/architecture.md) - System architecture
- [Brand Kit](../brandkit/) - Design assets

## Support

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Radix UI**: https://www.radix-ui.com

---

**Version**: 1.0.0
**Last Updated**: December 2025
**Status**: Active Development
