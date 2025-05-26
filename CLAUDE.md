# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with flat config

### Firebase
- `firebase deploy` - Deploy to Firebase hosting
- `firebase dataconnect:services:list` - List Data Connect services
- Local emulators not configured in firebase.json

## Architecture

### Core Stack
- React 18 with Vite
- Material-UI (MUI) for components
- React Router for navigation
- Firebase for backend services (Firestore, Storage, Auth, Data Connect)

### Project Structure
- `/src/pages/` - Route components (Home, About, ProjectDetail, etc.)
- `/src/components/` - Reusable UI components
- `/src/firebase/` - Service layer for Firebase operations
- `/src/context/` - React Context providers (ProjectContext)
- `/dataconnect/` - Firebase Data Connect schema and queries

### Key Patterns

#### Service Layer
All Firebase operations go through service modules:
- `profileService.js` - User profile CRUD operations
- `projectService.js` - Project management with optimized queries
- `imageService.js` - Image upload/storage operations

#### State Management
- ProjectContext provides global project state
- Service modules handle async operations and return promises
- Components use hooks to consume context data

#### Performance Optimizations
- LazyImage component for progressive image loading
- React.lazy for route-based code splitting
- Firestore query optimization with proper indexing
- Image compression before upload (max 1920px, 0.8 quality)

### Firebase Configuration
Environment variables required in `.env`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Data Connect
- PostgreSQL database via Cloud SQL
- Generated SDK in `/dataconnect-generated/`
- Schema defined in `/dataconnect/schema/schema.gql`
- Queries/mutations in connector files