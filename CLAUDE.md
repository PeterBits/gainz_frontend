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
- **PWA**: vite-plugin-pwa with Workbox

### Project Structure
```
src/
├── components/       # React components
│   ├── auth/        # Authentication components (ProtectedRoute)
│   └── ui/          # Reusable UI components (shadcn/ui style)
├── lib/             # Utilities and API client
│   ├── api.ts       # Axios instance + API endpoints
│   └── utils.ts     # Utility functions (cn helper)
├── pages/           # Route pages (Home, Login)
├── stores/          # Zustand stores (authStore with persist)
├── types/           # TypeScript type definitions
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
