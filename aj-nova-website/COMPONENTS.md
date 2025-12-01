# Component Documentation

Complete guide to all components in the AJ NOVA marketing website.

## Table of Contents

- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Animated Components](#animated-components)
- [UI Components](#ui-components)
- [Usage Examples](#usage-examples)

---

## Layout Components

### Navbar
**File**: `components/navbar.tsx`

Main navigation bar with theme toggle and responsive mobile menu.

**Features**:
- Sticky positioning on scroll
- Theme switcher (light/dark)
- Responsive mobile menu
- Logo with link to home

**Usage**:
```tsx
import { Navbar } from "@/components/navbar"

<Navbar />
```

**Styling**:
- Background: Blurred backdrop with border
- Mobile: Hamburger menu (< 768px)
- Desktop: Horizontal navigation

---

### Footer
**File**: `components/footer.tsx`

Site footer with links, contact info, and social media.

**Features**:
- Multi-column layout
- Quick links navigation
- Contact information
- Social media icons
- Copyright notice

**Usage**:
```tsx
import { Footer } from "@/components/footer"

<Footer />
```

---

### Background Grid
**File**: `components/background-grid.tsx`

Animated grid background with gradient overlay.

**Features**:
- Subtle animated grid pattern
- Gradient overlay
- Fixed positioning
- Non-interactive (pointer-events-none)

**Usage**:
```tsx
import { BackgroundGrid } from "@/components/background-grid"

<BackgroundGrid />
```

**Note**: Place once at the root level, typically in page layout.

---

## Feature Components

### Hero Section
**File**: `components/hero-section.tsx`

Main hero section for the landing page.

**Features**:
- Animated text reveal
- Call-to-action buttons
- Social proof (student count)
- Rotating feature showcase
- Responsive two-column layout

**Usage**:
```tsx
import { HeroSection } from "@/components/hero-section"

<HeroSection />
```

**Structure**:
```
HeroSection
  ├── Badge (Accepting Applications)
  ├── Heading (Animated Text)
  ├── Description
  ├── CTA Buttons
  ├── Social Proof
  └── Rotating Feature Display
```

---

### Features Grid
**File**: `components/features-grid.tsx`

Grid showcase of service features.

**Features**:
- Flashlight hover effect cards
- Icon-based feature display
- Responsive grid layout (1-2-3 columns)
- Hover interactions

**Usage**:
```tsx
import { FeaturesGrid } from "@/components/features-grid"

<FeaturesGrid />
```

**Customization**:
Edit the `features` array inside the component to add/modify features.

---

### Testimonials Section
**File**: `components/testimonials-section.tsx`

Student testimonials carousel.

**Features**:
- Infinite scroll marquee
- Two rows (offset animation)
- Student photos and quotes
- University names
- Smooth animations

**Usage**:
```tsx
import { TestimonialsSection } from "@/components/testimonials-section"

<TestimonialsSection />
```

**Data Structure**:
```typescript
const testimonials = [
  {
    name: "Student Name",
    university: "University Name",
    image: "/path/to/image.jpg",
    quote: "Testimonial text..."
  },
  // ...
]
```

---

### CTA Section
**File**: `components/cta-section.tsx`

Call-to-action section for conversion.

**Features**:
- Eye-catching design
- Multiple CTAs
- Benefits list
- Gradient background

**Usage**:
```tsx
import { CtaSection } from "@/components/cta-section"

<CtaSection />
```

---

### Logo Strip
**File**: `components/logo-strip.tsx`

Partner university logos strip.

**Features**:
- Horizontal scrolling logos
- Infinite loop animation
- Grayscale effect (colorize on hover)
- Responsive sizing

**Usage**:
```tsx
import { LogoStrip } from "@/components/logo-strip"

<LogoStrip />
```

---

## Animated Components

### Beam Button
**File**: `components/beam-button.tsx`

Animated button with beam light effect.

**Props**:
```typescript
interface BeamButtonProps extends ComponentProps<"button"> {
  primary?: boolean  // Primary coral styling
  children: ReactNode
}
```

**Usage**:
```tsx
import { BeamButton } from "@/components/beam-button"

// Primary button
<BeamButton primary>
  Get Started <ArrowRight className="w-4 h-4" />
</BeamButton>

// Secondary button
<BeamButton>
  Learn More
</BeamButton>
```

**Animation**:
- Beam of light sweeps across on hover
- Scale effect on click
- Smooth transitions

---

### Flashlight Card
**File**: `components/flashlight-card.tsx`

Card with spotlight effect that follows mouse.

**Props**:
```typescript
interface FlashlightCardProps extends ComponentProps<"div"> {
  children: ReactNode
}
```

**Usage**:
```tsx
import { FlashlightCard } from "@/components/flashlight-card"

<FlashlightCard>
  <Icon className="w-12 h-12" />
  <h3>Feature Title</h3>
  <p>Description</p>
</FlashlightCard>
```

**Effect**:
- Radial gradient follows mouse position
- Smooth tracking with mouse movement
- Enhances card on hover

---

### Text Reveal
**File**: `components/text-reveal.tsx`

Animated text reveal with typewriter effect.

**Props**:
```typescript
interface TextRevealProps {
  text: string  // Text to animate
}
```

**Usage**:
```tsx
import { TextReveal } from "@/components/text-reveal"

<h1>
  <TextReveal text="Gateway to" />
  <span className="text-coral">German Universities</span>
</h1>
```

**Animation**:
- Letters appear one by one
- Smooth fade-in effect
- Configurable timing

---

### Marquee
**File**: `components/marquee.tsx`

Infinite scrolling marquee component.

**Props**:
```typescript
interface MarqueeProps {
  children: ReactNode
  reverse?: boolean  // Scroll direction
  speed?: "slow" | "normal" | "fast"
}
```

**Usage**:
```tsx
import { Marquee } from "@/components/marquee"

<Marquee speed="slow">
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Marquee>

// Reverse direction
<Marquee reverse>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Marquee>
```

**Use Cases**:
- Logo strips
- Testimonial carousels
- Partner showcase
- Feature highlights

---

### Rotating Feature
**File**: `components/rotating-feature.tsx`

Rotating text display showing key features.

**Usage**:
```tsx
import { RotatingFeature } from "@/components/rotating-feature"

<RotatingFeature />
```

**Features**:
- Array of features rotates automatically
- Smooth fade transitions
- Customizable timing
- Bullet point indicator

**Customization**:
Edit the `features` array in the component:
```typescript
const features = [
  "AI-Powered SOP Generation",
  "97% Visa Success Rate",
  "Free Consultation",
  // Add more...
]
```

---

## UI Components

All UI components are from shadcn/ui library and located in `components/ui/`.

### Button
**File**: `components/ui/button.tsx`

**Variants**:
- `default` - Default styling
- `destructive` - For delete/remove actions
- `outline` - Outlined button
- `secondary` - Secondary styling
- `ghost` - Minimal styling
- `link` - Link-styled button

**Sizes**:
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Square icon button

**Usage**:
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">
  Click Me
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>

<Button variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>
```

---

### Card
**File**: `components/ui/card.tsx`

**Components**:
- `Card` - Container
- `CardHeader` - Header section
- `CardTitle` - Title
- `CardDescription` - Description
- `CardContent` - Main content
- `CardFooter` - Footer section

**Usage**:
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

---

### Input
**File**: `components/ui/input.tsx`

**Usage**:
```tsx
import { Input } from "@/components/ui/input"

<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

### Badge
**File**: `components/ui/badge.tsx`

**Variants**:
- `default`
- `secondary`
- `destructive`
- `outline`

**Usage**:
```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">New</Badge>
<Badge variant="secondary">Featured</Badge>
<Badge variant="outline">Popular</Badge>
```

---

### Separator
**File**: `components/ui/separator.tsx`

**Usage**:
```tsx
import { Separator } from "@/components/ui/separator"

<div>
  <p>Section 1</p>
  <Separator className="my-4" />
  <p>Section 2</p>
</div>

// Vertical separator
<div className="flex h-5 items-center space-x-4">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
</div>
```

---

## Usage Examples

### Complete Page Layout

```tsx
import { BackgroundGrid } from "@/components/background-grid"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <BackgroundGrid />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
```

---

### Feature Card with Animation

```tsx
import { FlashlightCard } from "@/components/flashlight-card"
import { CheckCircle } from "lucide-react"

<FlashlightCard className="p-6">
  <CheckCircle className="w-12 h-12 text-coral mb-4" />
  <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
  <p className="text-muted-foreground">
    Generate perfect documents with AI assistance
  </p>
</FlashlightCard>
```

---

### CTA with Beam Button

```tsx
import { BeamButton } from "@/components/beam-button"
import { ArrowRight, Calendar } from "lucide-react"

<div className="flex gap-4">
  <BeamButton primary>
    Get Started <ArrowRight className="w-4 h-4" />
  </BeamButton>

  <BeamButton>
    <Calendar className="w-4 h-4" />
    Book Consultation
  </BeamButton>
</div>
```

---

### Testimonial Card

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Card>
  <CardContent className="p-6">
    <div className="flex items-center gap-4 mb-4">
      <Avatar>
        <AvatarImage src="/student.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">Student Name</p>
        <p className="text-sm text-muted-foreground">TU Munich</p>
      </div>
    </div>
    <p className="text-muted-foreground">
      "Amazing experience! Got into my dream university."
    </p>
  </CardContent>
</Card>
```

---

## Custom Component Creation

### Creating a New Animated Component

```tsx
// components/my-animated-component.tsx
"use client"

import { motion } from "framer-motion"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface MyAnimatedComponentProps extends ComponentProps<"div"> {
  duration?: number
}

export function MyAnimatedComponent({
  duration = 0.5,
  className,
  children,
  ...props
}: MyAnimatedComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration }}
      className={cn("", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

---

## Performance Tips

### Code Splitting Heavy Components

```tsx
import dynamic from 'next/dynamic'

// Load component dynamically (client-side only)
const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <Skeleton />,
    ssr: false
  }
)
```

### Lazy Loading Images

```tsx
import Image from 'next/image'

<Image
  src="/large-image.jpg"
  alt="Description"
  width={1200}
  height={600}
  loading="lazy"  // Lazy load
  placeholder="blur"  // Show blur while loading
/>
```

---

## Accessibility

### Keyboard Navigation

All interactive components support keyboard navigation:
- `Tab` - Navigate between elements
- `Enter`/`Space` - Activate buttons
- `Escape` - Close modals/menus

### ARIA Labels

Always include ARIA labels for accessibility:

```tsx
<button aria-label="Close menu">
  <X className="w-6 h-6" />
</button>

<input
  aria-label="Email address"
  aria-describedby="email-help"
/>
```

---

## Troubleshooting

### Component Not Rendering

1. Check imports are correct
2. Verify component is exported
3. Check for TypeScript errors
4. Ensure all required props are passed

### Styles Not Applying

1. Check Tailwind classes are valid
2. Verify `cn()` utility is used correctly
3. Check for conflicting styles
4. Clear Next.js cache: `rm -rf .next`

### Animation Not Working

1. Ensure `"use client"` directive is added
2. Check Framer Motion is installed
3. Verify animation props are correct
4. Check browser DevTools for errors

---

**Last Updated**: December 2025
**Version**: 1.0.0
