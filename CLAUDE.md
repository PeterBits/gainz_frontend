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
- **Styling**: TailwindCSS v4 with class-variance-authority (CVA)
- **Routing**: React Router v7
- **State Management**:
  - Zustand (auth state with persistence)
  - TanStack Query (server state)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Internationalization**: react-i18next with browser language detection
- **PWA**: vite-plugin-pwa with Workbox

### Project Structure
```
src/
├── components/       # React components
│   ├── auth/        # Authentication components (ProtectedRoute)
│   ├── ui/          # Reusable UI components (shadcn/ui style)
│   └── LanguageSwitcher.tsx  # Language toggle component
├── lib/             # Utilities and API client
│   ├── api.ts       # Axios instance + API endpoints
│   └── utils.ts     # Utility functions (cn helper)
├── locales/         # Translation files
│   ├── en/          # English translations
│   │   └── translation.json
│   └── es/          # Spanish translations
│       └── translation.json
├── pages/           # Route pages (Home, Login, Register, Dashboard)
├── stores/          # Zustand stores (authStore with persist)
├── types/           # TypeScript type definitions
│   ├── entities/    # Domain models
│   └── api/         # API request/response types
├── i18n.ts          # i18next configuration
└── main.tsx         # Application entry point
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
- **Local state**: React Hook Form for forms
- **Auth state**: Zustand with localStorage persistence
- **Server state**: TanStack Query for API data (retry: 1, no window refocus)

**User Roles**:
- `ATHLETE`: Can track workouts, view assigned routines from trainers
- `TRAINER`: Can create routines, assign to athletes, view athlete progress

**Internationalization (i18n)**:
- Built with `react-i18next` and `i18next-browser-languagedetector`
- Supports English (`en`) and Spanish (`es`)
- Automatic browser language detection with fallback to Spanish
- Translations stored in JSON files at `src/locales/{lang}/translation.json`
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
