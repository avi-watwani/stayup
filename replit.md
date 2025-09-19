# AwakeKeeper

## Overview

AwakeKeeper is a React-based web application that prevents screen sleep using the Screen Wake Lock API. The app allows users to set timers with preset durations or custom time intervals to keep their device screens awake. It features a modern, accessible UI built with shadcn/ui components and includes usage statistics tracking and an FAQ section for user guidance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **API Pattern**: RESTful API structure with `/api` prefix
- **Development**: Hot module replacement via Vite middleware integration

### Core Features
- **Wake Lock Management**: Browser Screen Wake Lock API integration with fallback handling
- **Timer System**: Preset durations (30 min, 1 hr, 2 hr) and custom time input
- **Usage Analytics**: Local storage-based statistics tracking with daily/weekly summaries
- **Progressive UI**: Responsive design with mobile-first approach
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **Local Storage**: Browser localStorage for usage statistics and user preferences
- **Session Store**: PostgreSQL-based session management for user authentication
- **Schema Management**: Drizzle migrations with TypeScript schema definitions

### Development Architecture
- **Monorepo Structure**: Shared schema between client and server in `/shared` directory
- **Path Aliases**: TypeScript path mapping for clean imports (`@/`, `@shared/`)
- **Environment**: Development/production environment detection with appropriate tooling
- **Error Handling**: Runtime error overlay for development debugging

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database driver
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation and formatting utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library with consistent styling

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **esbuild**: Fast JavaScript bundler for production builds

### Browser APIs
- **Screen Wake Lock API**: Primary functionality for preventing screen sleep
- **Local Storage API**: Usage statistics persistence
- **Notification API**: Timer completion notifications (when supported)