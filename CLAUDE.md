# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flow Machine is a Next.js project management tool designed for both human and AI Agent collaboration. It provides CRUD operations for projects, documents, tickets, and connections, with AI-powered execution capabilities.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Directory Structure

The project follows a feature-based architecture under `src/`:

- `app/` - Next.js App Router with API routes at `/api/v1/`
- `features/` - Feature-specific frontend/backend implementations
- `modules/` - Core business logic organized by domain
- `components/` - Reusable UI components with shadcn/ui
- `libs/` - Shared utilities for frontend and backend

### Key Architectural Patterns

**Backend Layer Structure:**
- `modules/{domain}/backend/{domain}-use-cases.ts` - Business logic
- `features/{domain}/backend/{domain}-apis.ts` - API route handlers
- `app/api/v1/{domain}/route.ts` - Next.js route exports

**Frontend Layer Structure:**
- `modules/{domain}/frontend/{domain}-http-client.ts` - API client
- `features/{domain}/frontend/components/` - Feature components
- Uses React Query for state management and caching

**Database:**
- MongoDB with connection utilities in `libs/backend/mongodb.ts`
- Collections: docs, projects, tickets, connections
- Uses ObjectId conversion utilities (`toMongoDoc`, `fromMongoDoc`)

### AI Integration

The `/executions` endpoint enables AI-powered document processing:
- Uses Anthropic Claude models via `@ai-sdk/anthropic`
- Implements dynamic tools for document creation
- Located in `modules/executions/backend/executions-use-cases.ts`

### Environment Setup

The application requires `MONGO_URI` environment variable for database connection.

### UI Framework

- Next.js 15 with React 19
- Tailwind CSS with shadcn/ui components
- TanStack Query for data fetching
- React Hook Form with Zod validation