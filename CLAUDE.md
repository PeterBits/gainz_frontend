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
All backend entity types defined in `src/types/index.ts`:
- User, LoginCredentials, RegisterData, AuthResponse
- Exercise, Routine, RoutineExercise, CreateRoutineData
- WorkoutSession, SessionExercise, CreateSessionData
- UserMetrics, ApiError
