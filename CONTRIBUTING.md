# Contributing to AJ NOVA

Thank you for your interest in contributing to the AJ NOVA platform! This document provides guidelines and best practices for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Development](#component-development)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm/pnpm installed
- **Git** installed and configured
- A code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arjavaai/AJNOVA-WEBSITE.git
   cd AJNOVA
   ```

2. **Install dependencies**
   ```bash
   cd aj-nova-website
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open the project**
   - Navigate to `http://localhost:3000`
   - Open the codebase in your editor

## Development Workflow

### Project Structure Understanding

Before making changes, familiarize yourself with:

- **Root README.md** - Project overview and quick start
- **PRD/** - Product requirements and specifications
- **aj-nova-website/README.md** - Website-specific documentation
- **PRD/architecture.md** - Technical architecture details

### Making Changes

1. **Understand the requirement**
   - Check PRD documentation for specifications
   - Review existing code patterns
   - Ask questions if unclear

2. **Plan your approach**
   - Break down the task into smaller steps
   - Consider edge cases
   - Think about reusability

3. **Implement incrementally**
   - Write code in small, testable chunks
   - Test as you go
   - Commit frequently with clear messages

## Code Style Guidelines

### TypeScript

#### File Structure

Organize files logically:

```typescript
// 1. Imports (grouped)
import { ComponentProps } from "react"           // React imports
import { Button } from "@/components/ui/button"  // Internal imports
import { cn } from "@/lib/utils"                 // Utilities
import { ArrowRight } from "lucide-react"        // Icons

// 2. Types/Interfaces
interface MyComponentProps extends ComponentProps<"div"> {
  title: string
  description?: string
}

// 3. Component
export function MyComponent({ title, description }: MyComponentProps) {
  // Implementation
}
```

#### Naming Conventions

```typescript
// Components: PascalCase
export function HeroSection() {}
export function UserProfile() {}

// Functions: camelCase
function calculateTotal() {}
function fetchUserData() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "..."
const MAX_UPLOAD_SIZE = 10

// Files: kebab-case
// hero-section.tsx ✅
// HeroSection.tsx ❌
```

#### Type Annotations

Always provide explicit types:

```typescript
// Good ✅
function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
}

// Avoid ❌
function getUser(id) {
  return fetch(`/api/users/${id}`)
}
```

#### Interfaces vs Types

- Use `interface` for component props and object shapes
- Use `type` for unions, intersections, and utilities

```typescript
// Props: use interface
interface ButtonProps {
  label: string
  onClick: () => void
}

// Unions: use type
type Status = "idle" | "loading" | "success" | "error"
```

### React Components

#### Component Structure

Follow this pattern for consistency:

```tsx
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps extends ComponentProps<"div"> {
  title: string
  variant?: "default" | "highlighted"
}

export function MyComponent({
  title,
  variant = "default",
  className,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "base-classes",
        variant === "highlighted" && "highlight-classes",
        className
      )}
      {...props}
    >
      <h3>{title}</h3>
    </div>
  )
}
```

#### Component Best Practices

1. **Single Responsibility**: Each component should do one thing well
2. **Props Over State**: Prefer controlled components
3. **Composition**: Build complex UIs from simple components
4. **Accessibility**: Always include ARIA attributes

```tsx
// Good ✅ - Composable, accessible
<Button
  variant="primary"
  size="lg"
  aria-label="Submit form"
>
  Submit
</Button>

// Avoid ❌ - Too many responsibilities
<MegaButton
  variant="primary"
  hasIcon
  iconPosition="left"
  withTooltip
  tooltipText="..."
  ...
/>
```

#### Hooks

- Keep hooks at the top of the component
- Extract complex logic into custom hooks
- Name custom hooks with `use` prefix

```tsx
function MyComponent() {
  // Hooks first
  const [state, setState] = useState()
  const { data } = useQuery()
  const customValue = useCustomHook()

  // Event handlers
  const handleClick = () => {}

  // Render
  return <div>...</div>
}
```

### CSS & Tailwind

#### Class Organization

Order Tailwind classes logically:

```tsx
<div className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "p-6 gap-4",
  // Sizing
  "w-full h-auto",
  // Typography
  "text-lg font-semibold",
  // Colors
  "bg-white text-navy",
  // Effects
  "rounded-lg shadow-md",
  // States
  "hover:bg-gray-50 active:scale-95",
  // Responsive
  "md:p-8 lg:text-xl",
  // Custom
  className
)} />
```

#### Using the `cn()` Utility

Always use `cn()` for conditional classes:

```tsx
// Good ✅
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "large" && "large-class",
  className
)} />

// Avoid ❌
<div className={`base-class ${isActive ? 'active-class' : ''}`} />
```

#### Custom Styles

Prefer Tailwind utilities, use custom CSS only when necessary:

```tsx
// Good ✅ - Use Tailwind
<div className="bg-gradient-to-r from-navy to-coral" />

// Only if unavoidable ❌
<div style={{ background: "linear-gradient(...)" }} />
```

### File Organization

#### Component Files

```
components/
├── ui/                    # Base UI components (shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
├── features/              # Feature-specific components
│   ├── profile/
│   │   ├── profile-form.tsx
│   │   └── profile-card.tsx
│   └── dashboard/
│
├── layout/                # Layout components
│   ├── navbar.tsx
│   └── footer.tsx
│
└── shared/                # Shared utility components
    ├── loader.tsx
    └── error-boundary.tsx
```

#### Utility Files

```
lib/
├── api.ts                 # API client
├── auth.ts                # Authentication utilities
├── utils.ts               # General utilities
└── constants.ts           # Application constants
```

## Component Development

### Creating a New Component

1. **Determine the component type**
   - UI component → `components/ui/`
   - Feature component → `components/features/`
   - Shared component → `components/`

2. **Create the file**
   ```bash
   touch components/my-component.tsx
   ```

3. **Write the component**
   ```tsx
   // components/my-component.tsx
   import { ComponentProps } from "react"
   import { cn } from "@/lib/utils"

   interface MyComponentProps extends ComponentProps<"div"> {
     // Props here
   }

   export function MyComponent({ className, ...props }: MyComponentProps) {
     return (
       <div className={cn("", className)} {...props}>
         {/* Content */}
       </div>
     )
   }
   ```

4. **Add documentation**
   ```tsx
   /**
    * MyComponent - A brief description
    *
    * @example
    * <MyComponent prop="value" />
    */
   export function MyComponent() {}
   ```

### Component Testing (Future)

When testing infrastructure is added:

```tsx
// __tests__/my-component.test.tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Git Workflow

### Branch Naming

Follow this convention:

```bash
# Feature
feature/add-consultation-page
feature/improve-hero-section

# Bug fix
fix/navigation-mobile-menu
fix/button-hover-state

# Enhancement
enhance/testimonials-carousel
enhance/form-validation

# Documentation
docs/update-readme
docs/add-component-guide
```

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good ✅
git commit -m "feat: add consultation booking form

- Create consultation form component
- Add date picker integration
- Implement form validation with Zod
- Connect to booking API endpoint"

# Good ✅
git commit -m "fix: resolve mobile navigation overflow issue

The mobile menu was extending beyond viewport on small screens.
Added overflow-hidden and proper max-height constraints."

# Avoid ❌
git commit -m "fixed stuff"
git commit -m "updates"
```

### Commit Message Format

```
<type>: <short summary>

<detailed description>
<why this change was needed>
<what was changed>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Committing Process

```bash
# 1. Stage your changes
git add .

# 2. Review what you're committing
git status
git diff --staged

# 3. Commit with a clear message
git commit -m "feat: add user profile page"

# 4. Push to your branch
git push origin feature/add-profile-page
```

## Pull Request Process

### Before Creating a PR

1. **Ensure code quality**
   ```bash
   npm run lint         # Check for linting errors
   npm run build        # Ensure build succeeds
   ```

2. **Test your changes**
   - Test on different screen sizes
   - Test dark/light themes
   - Test user interactions
   - Check console for errors

3. **Update documentation**
   - Update README if needed
   - Add component documentation
   - Update PRD if feature changed

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR on GitHub**
   - Use a descriptive title
   - Fill out the PR template
   - Link related issues
   - Add screenshots/videos for UI changes

3. **PR Title Format**
   ```
   feat: Add consultation booking feature

   fix: Resolve mobile navigation issue

   docs: Update component documentation
   ```

4. **PR Description Template**
   ```markdown
   ## What does this PR do?
   Brief description of changes

   ## Why is this needed?
   Explain the motivation

   ## What changed?
   - List of changes
   - Key modifications
   - New files added

   ## Screenshots/Videos
   (For UI changes)

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-reviewed the code
   - [ ] Commented complex logic
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Tested on mobile/desktop
   - [ ] Tested dark/light themes
   ```

### Code Review Process

1. **Be open to feedback**
   - Respond to review comments
   - Make requested changes
   - Ask questions if unclear

2. **Address review comments**
   ```bash
   # Make changes
   git add .
   git commit -m "address review feedback: improve form validation"
   git push origin feature/your-feature
   ```

3. **Resolve conversations**
   - Mark conversations as resolved after addressing
   - Reply to clarify your approach

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] **Functionality**: Feature works as expected
- [ ] **Responsiveness**: Works on mobile, tablet, desktop
- [ ] **Theme**: Works in light and dark modes
- [ ] **Accessibility**: Keyboard navigation works
- [ ] **Performance**: No performance regressions
- [ ] **Error Handling**: Handles errors gracefully
- [ ] **Edge Cases**: Handles empty states, long text, etc.

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Testing

Test these breakpoints:
- Mobile: 375px, 425px
- Tablet: 768px, 1024px
- Desktop: 1440px, 1920px

Use Chrome DevTools device toolbar (F12 → Toggle device toolbar).

## Documentation

### Code Comments

Add comments for complex logic:

```tsx
// Good ✅
// Calculate prorated cost based on days remaining in billing cycle
const proratedCost = (fullPrice * daysRemaining) / totalDays

// Avoid ❌
// Calculate cost
const cost = (price * days) / total
```

### Component Documentation

Document component props and usage:

```tsx
/**
 * ConsultationForm - Form for booking consultation appointments
 *
 * @param onSubmit - Callback when form is successfully submitted
 * @param availableSlots - List of available time slots
 *
 * @example
 * <ConsultationForm
 *   onSubmit={(data) => handleBooking(data)}
 *   availableSlots={slots}
 * />
 */
export function ConsultationForm({ onSubmit, availableSlots }: Props) {
  // Implementation
}
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Modifying project structure
- Adding dependencies

## Questions?

If you have questions:
1. Check existing documentation
2. Review PRD specifications
3. Ask in project discussions
4. Contact the development team

## Thank You!

Your contributions make AJ NOVA better for everyone. We appreciate your time and effort!

---

**Last Updated**: December 2025
**Version**: 1.0.0
