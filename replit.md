# Repuestos Informáticos D Y M

## Overview

This is an e-commerce platform specialized in selling mobile device spare parts and accessories. The application provides a catalog of parts organized by device brand and model (Samsung, Apple, Xiaomi, Motorola, Nokia), with shopping cart functionality and a checkout process. The platform is designed to serve the Spanish market with Spanish language content throughout.

The application follows a reference-based design approach inspired by modern parts retailers like iFixit and NewEgg, prioritizing trust, professional presentation, and efficient navigation through a multi-level categorization system (Brand → Model → Part Type).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server

**Routing**: Wouter for lightweight client-side routing with a single-page application structure

**State Management**: 
- React TanStack Query for server state and API data fetching
- Local component state (useState) for UI interactions like cart management, filters, and modal visibility
- No global state management library - state is lifted and passed via props where needed

**UI Components**: 
- Shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Typography system using Inter (body/UI) and Lexend Deca (headings/brand) from Google Fonts

**Design System**:
- Custom color palette defined via CSS variables supporting light/dark modes
- Consistent spacing scale (2, 4, 6, 8, 12, 16 Tailwind units)
- Responsive grid layouts with breakpoints for mobile, tablet, and desktop
- Elevation system for interactive elements (hover-elevate, active-elevate-2 classes)

**Component Structure**:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/`
- Shadcn components in `client/src/components/ui/`
- Path aliases configured (`@/` for client src, `@shared/` for shared types)

### Backend Architecture

**Runtime**: Node.js with Express.js web framework

**Language**: TypeScript with ESM modules

**API Design**: RESTful endpoints under `/api` prefix
- POST `/api/checkout` - Processes order submissions and sends notifications

**Development Server**: 
- Vite middleware integration for hot module replacement in development
- Custom logging middleware for API request tracking
- Static file serving in production from compiled build

**Request Processing**:
- JSON body parsing with raw buffer preservation for webhook verification
- Request/response logging with timing metrics
- Error handling with appropriate HTTP status codes

### Data Storage Solutions

**Database**: PostgreSQL (configured for Neon serverless)

**ORM**: Drizzle ORM for type-safe database operations

**Schema Design**:
- `users` table: Authentication data (id, username, password)
- `orders` table: Checkout data including customer info, payment details, items (JSONB), total, timestamp
- UUID primary keys with database-generated defaults
- JSONB column type for flexible cart items storage

**In-Memory Fallback**: MemStorage class implementing IStorage interface for development/testing without database

**Migrations**: Managed via drizzle-kit with schema-first approach

**Data Validation**: Zod schemas derived from Drizzle table definitions for runtime validation

### Authentication and Authorization

**Current Implementation**: Basic user schema exists but authentication is not implemented in the active routes. The application currently operates without user login requirements.

**Planned Architecture** (based on schema):
- User credentials stored with hashed passwords
- Session-based authentication would use connect-pg-simple for PostgreSQL session storage

### External Dependencies

**Payment Processing**: None - the checkout form collects card data directly (marked as test/demo only with PCI compliance warnings)

**Notification System**: 
- Telegram Bot API integration for order notifications
- Environment variables: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Axios HTTP client for API requests
- Order details sent via HTML-formatted messages

**Image Assets**: 
- Placeholder images stored in `attached_assets/generated_images/`
- Products display generic "no image available" placeholders

**Development Tools**:
- Replit-specific plugins: runtime error modal, cartographer, dev banner (development only)
- TypeScript type checking without compilation
- ESBuild for server-side bundling in production

**UI Libraries**:
- Radix UI primitives for accessible component foundations
- React Hook Form with Zod resolvers for form validation
- date-fns for date formatting
- cmdk for command palette functionality
- Lucide React for icon components

**Database Connection**:
- @neondatabase/serverless for PostgreSQL connectivity
- Connection URL configured via `DATABASE_URL` environment variable