# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gainz** is a modern gym tracker Progressive Web Application (PWA) built with React, TypeScript, and Vite. It supports both athletes and trainers with workout routine management, progress tracking, and trainer-athlete relationship features.

## Common Commands

```bash
# Development
npm run dev              # Start dev server with Vite (default port 3000)

# Build & Quality
npm run build            # Type-check with tsc and build for production
npm run lint             # Lint code with ESLint
npm run preview          # Preview production build locally
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Code Style & Formatting

**IMPORTANT**: This project uses Prettier for code formatting. Always respect these rules when writing or modifying code:

- **Quotes**: Single quotes (`'`) for strings, not double quotes (`"`)
- **Line Width**: Maximum 100 characters per line
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Always use semicolons at the end of statements
- **Trailing Commas**: ES5 style (in objects, arrays, function parameters)
- **Arrow Function Parens**: Always use parentheses around arrow function parameters

Configuration files:

- `.prettierrc` - Prettier configuration
- `.editorconfig` - Editor configuration for consistent settings across IDEs

**Before committing**, run `npm run format` to ensure all code follows the established style.

## Design & UI Guidelines

**CRITICAL**: All UI components and pages must be designed with these principles:

### Responsive Design (Mobile-First)

- **Always** build responsive layouts that work on mobile, tablet, and desktop
- Use Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Start with mobile layout, then enhance for larger screens
- Test on multiple screen sizes: mobile (375px), tablet (768px), desktop (1440px)
- Ensure touch targets are at least 44x44px on mobile

### Visual Design System

- **Colors**: Use gradient theme blue-600 → purple-600 for primary actions
- **Spacing**: Consistent padding and margins (4, 6, 8, 12, 16, 24)
- **Border Radius**:
  - `rounded-2xl` for cards and major containers
  - `rounded-xl` for buttons and inputs
  - `rounded-lg` for smaller components
- **Shadows**: Layered depth with `shadow-md`, `shadow-lg`, `shadow-xl`
- **Typography**: Clear hierarchy with bold headings, readable body text

### Interactive Elements

- **Buttons**: Must have hover, active, and disabled states
- **Inputs**: Visual feedback on focus (`focus:ring-2`, `focus:border-*`)
- **Cards**: Hover effects with shadow and scale transitions
- **Transitions**: Smooth animations with `transition-all` or `transition-transform`

### Component Patterns

- **Forms**: Icon-enhanced inputs with clear labels and error states
- **Cards**: White background with border, rounded-2xl, shadow-md
- **CTAs**: Gradient backgrounds with prominent placement
- **Empty States**: Centered icon, message, and action button
- **Loading States**: Clear feedback during async operations

### Icons

- Use Lucide React icons consistently throughout the app
- Icon size: `w-4 h-4` (small), `w-5 h-5` (medium), `w-6 h-6` (large)
- Always include semantic meaning with icons + text

**Example of good responsive card:**

```tsx
<div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all border border-slate-100">
  <h2 className="text-xl md:text-2xl font-bold mb-4">Title</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

## Architecture

### Tech Stack

- **Frontend**: React 19 + TypeScript, Vite
- **Styling**: TailwindCSS v4 with class-variance-authority (CVA) and dark mode
- **Routing**: React Router v7
- **State Management**:
  - Zustand (auth and theme state with persistence)
  - TanStack Query (server state)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Internationalization**: react-i18next with browser language detection
- **PWA**: vite-plugin-pwa with Workbox

### Project Structure & Modular Architecture

**CRITICAL**: This project follows a **modular, colocation architecture**. Components, hooks, utilities, or any code used **only** in a single page must be colocated within that page's directory. Only place code in shared directories (`src/components/`, `src/hooks/`) when it's used in **multiple pages**.

```
src/
├── components/       # Shared components (used in multiple pages ONLY)
│   ├── auth/        # Authentication components (ProtectedRoute)
│   ├── ui/          # Reusable UI components (shadcn/ui style)
│   ├── BottomNav.tsx # Mobile navigation
│   ├── Header.tsx   # Global header
│   ├── LanguageSwitcher.tsx  # Language toggle
│   └── ThemeToggle.tsx # Dark mode toggle
├── hooks/           # Shared hooks (used in multiple pages ONLY)
│   ├── useExercises.ts # Fetch exercises (used in multiple pages)
│   └── useIsMobile.ts  # Mobile detection (used in multiple pages)
├── lib/             # Utilities and API client
│   ├── api.ts       # Axios instance + API endpoints
│   └── utils.ts     # Utility functions (cn helper)
├── locales/         # Translation files
│   ├── en/translation.json
│   └── es/translation.json
├── pages/           # Route pages with page-specific code
│   ├── login/       # Login page module
│   │   ├── hooks/   # Login-specific hooks
│   │   │   └── useLogin.ts
│   │   ├── Login.tsx
│   │   └── index.tsx # Export: export { default as Login } from './Login'
│   ├── register/    # Register page module
│   │   ├── hooks/   # Register-specific hooks
│   │   │   └── useRegister.ts
│   │   ├── Register.tsx
│   │   ├── validationsSchema.ts # Register-specific validation
│   │   └── index.tsx # Export: export { default as Register } from './Register'
│   ├── Dashboard.tsx
│   ├── Exercises.tsx
│   └── Home.tsx
├── stores/          # Zustand stores (authStore, themeStore)
├── types/           # TypeScript type definitions
│   ├── entities/    # Domain models
│   └── api/         # API request/response types
├── i18n.ts          # i18next configuration
└── main.tsx         # Application entry point
```

### Modular Architecture Principles

**1. Page-Specific Code Colocation**

Keep components, hooks, utilities, or any code used **only** in a single page inside that page's directory:

```
✅ src/pages/login/hooks/useLogin.ts     # Only used in Login
✅ src/pages/register/hooks/useRegister.ts # Only used in Register
✅ src/pages/register/validationsSchema.ts # Only used in Register
```

**2. Shared Code in Common Directories**

Only place code in shared directories when it's used in **multiple pages**:

```
✅ src/hooks/useIsMobile.ts    # Used in Dashboard, Exercises, BottomNav
✅ src/components/Header.tsx   # Used across multiple pages
```

**3. Index Files for Clean Imports**

**IMPORTANT**: Every page directory **must** have an `index.tsx` file that exports the page component:

```tsx
// src/pages/login/index.tsx
export { default as Login } from './Login';

// src/pages/register/index.tsx
export { default as Register } from './Register';
```

This allows clean imports in `App.tsx`:
```tsx
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
```

**4. Benefits of This Architecture**

- **Better organization**: Related code stays together
- **Easier refactoring**: Clear boundaries between features
- **Reduced coupling**: Page changes don't affect other pages
- **Clearer intent**: Instantly see if code is shared or page-specific
- **Scalability**: Easy to find and maintain code as app grows

**5. When to Move Code**

- **Start**: Place new code in the page directory
- **Second use**: Move to shared directory when a second page needs it
- **Cleanup**: If shared code is only used by one page, move it back

**6. Example Structure for New Page**

When creating a new page (e.g., "Profile"), follow this structure:

```
src/pages/profile/
├── components/        # Profile-specific components
│   ├── ProfileForm.tsx
│   └── AvatarUpload.tsx
├── hooks/            # Profile-specific hooks
│   └── useUpdateProfile.ts
├── utils/            # Profile-specific utilities
│   └── validation.ts
├── Profile.tsx       # Main page component
└── index.tsx         # Export: export { default as Profile } from './Profile'
```

### Key Patterns

**Authentication Flow**:

- JWT token stored in localStorage via Zustand persist middleware
- `authStore.ts` manages user/token/isAuthenticated state
- Axios interceptors auto-inject Bearer token and handle 401 responses
- `ProtectedRoute` component guards authenticated routes

**API Architecture** (`src/lib/api.ts`):

- Base Axios instance with auto-token injection
- API organized by domain: `authApi`, `routinesApi`, `exercisesApi`, `progressApi`, `metricsApi`
- Backend API expected at `http://localhost:4000` (configurable via `VITE_API_URL`)
- Vite dev server proxies `/api` requests to backend

**State Management**:

- **Local state**: React `useState` for UI state
- **Form state**: React Hook Form with Zod validation
- **Auth state**: Zustand with localStorage persistence
- **Server state**: TanStack Query for API data (retry: 1, no window refocus)

**Form Validation**:

- Use **React Hook Form** + **Zod** for all forms
- Create Zod schemas with translated error messages using `useTranslation()`
- Use `useMemo` to create schemas inside components for i18n support:

  ```tsx
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import { useMemo } from 'react';
  import { useTranslation } from 'react-i18next';

  function MyForm() {
    const { t } = useTranslation();

    const schema = useMemo(() => z.object({
      email: z.string().email(t('errors.emailInvalid')),
      password: z.string().min(6, t('errors.passwordMin'))
    }), [t]);

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(schema)
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </form>
    );
  }
  ```

- **Always** add error messages to translation files (EN/ES)
- Use red borders and error text below fields for validation feedback
- Backend validation requirements (for password):
  - 6-128 characters
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)

**User Roles**:

- `ATHLETE`: Can track workouts, view assigned routines from trainers
- `TRAINER`: Can create routines, assign to athletes, view athlete progress

**Internationalization (i18n)**:

- Built with `react-i18next` and `i18next-browser-languagedetector`
- Supports English (`en`) and Spanish (`es`)
- Automatic browser language detection with fallback to Spanish
- Translations stored in JSON files at `src/locales/{lang}/translation.json`
- Available translation namespaces: `common`, `navigation`, `home`, `login`, `register`, `dashboard`, `exercises`
- Use the `useTranslation()` hook in components:

  ```tsx
  import { useTranslation } from 'react-i18next';

  function MyComponent() {
    const { t, i18n } = useTranslation();

    return (
      <div>
        <h1>{t('home.title')}</h1>
        <p>{t('dashboard.welcomeBack', { name: user?.name })}</p>
        <button onClick={() => i18n.changeLanguage('es')}>Español</button>
      </div>
    );
  }
  ```

- `LanguageSwitcher` component provides a toggle between languages
- When adding new text, **always** add translations to both `en` and `es` translation files

**Dark Mode**:

- Implemented with Tailwind CSS v4 dark mode using custom `@variant` directive
- Theme state managed with Zustand and persisted to localStorage
- `ThemeToggle` component provides a toggle between light and dark modes
- Theme is initialized on app load and applied to the `<html>` element
- Dark mode configured in `src/index.css` with:

  ```css
  @variant dark (&:where(.dark, .dark *));

  ```

- Use Tailwind dark mode variants for styling:

  ```tsx
  <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
    <p className="text-slate-600 dark:text-slate-300">Content</p>
  </div>
  ```

- **Always** add dark mode variants when styling components
- Common dark mode patterns:
  - Backgrounds: `bg-white dark:bg-slate-800`
  - Text: `text-slate-900 dark:text-slate-100`
  - Borders: `border-slate-200 dark:border-slate-700`
  - Secondary text: `text-slate-600 dark:text-slate-300`
  - Gradients: `from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800`

**PWA Configuration**:

- Auto-update service worker registration
- API responses cached with NetworkFirst strategy (24hr expiry)
- Static assets cached for offline support

### Path Alias

- `@/*` maps to `src/*` (configured in vite.config.ts)

### Type Definitions

Types are organized in a modular structure:

**Entity Types** (`src/types/entities/`):

- `user.ts` - User, UserRole
- `exercise.ts` - Exercise
- `routine.ts` - Routine, RoutineExercise
- `session.ts` - WorkoutSession, SessionExercise
- `metrics.ts` - UserMetrics

**API Types** (`src/types/api/`):

- `auth.ts` - Login/Register/Profile request/response types
- `routines.ts` - Routine CRUD request/response types
- `exercises.ts` - Exercise CRUD request/response types
- `sessions.ts` - Session/Progress request/response types
- `metrics.ts` - Metrics update request/response types
- `common.ts` - ApiError and common types

Each module exports its types through index files for clean imports.
