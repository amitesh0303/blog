# Project Structure - Full Stack Blog Application

## Overview

This is a complete full-stack blog application built with turborepo, pnpm, Express, TypeScript, Prisma, Next.js, and shadcn/ui.

## Directory Structure

```
blog/
├── .eslintrc.json                          # Root ESLint config
├── .gitignore                              # Git ignore rules
├── .prettierrc                             # Prettier config
├── package.json                            # Root package with turborepo
├── turbo.json                              # Turborepo configuration
├── pnpm-workspace.yaml                     # pnpm workspace config
├── README.md                               # Main documentation
├── QUICKSTART.md                           # Quick start guide
├── PROJECT_STRUCTURE.md                    # This file
│
└── packages/
    ├── backend/                            # Express API Server
    │   ├── .env                            # Environment variables
    │   ├── .env.example                    # Example env
    │   ├── .eslintrc.json                  # ESLint config
    │   ├── package.json                    # Dependencies & scripts
    │   ├── tsconfig.json                   # TypeScript config
    │   ├── prisma/
    │   │   ├── schema.prisma               # Database schema
    │   │   └── migrations/                 # Database migrations
    │   └── src/
    │       └── index.ts                    # Express server
    │
    ├── frontend/                           # Next.js Frontend
    │   ├── .env.local                      # Environment variables
    │   ├── .env.example                    # Example env
    │   ├── .eslintrc.json                  # ESLint config
    │   ├── package.json                    # Dependencies & scripts
    │   ├── tsconfig.json                   # TypeScript config
    │   ├── next.config.js                  # Next.js config
    │   ├── tailwind.config.ts              # Tailwind CSS config
    │   ├── postcss.config.js               # PostCSS config
    │   └── src/
    │       ├── app/
    │       │   ├── globals.css             # Global styles
    │       │   ├── layout.tsx              # Root layout
    │       │   ├── page.tsx                # Home page
    │       │   ├── blog/
    │       │   │   └── [slug]/
    │       │   │       └── page.tsx        # Blog detail page
    │       │   └── admin/
    │       │       ├── page.tsx            # Admin dashboard
    │       │       ├── create/
    │       │       │   └── page.tsx        # Create blog page
    │       │       └── edit/
    │       │           └── [id]/
    │       │               └── page.tsx    # Edit blog page
    │       ├── components/
    │       │   ├── header.tsx              # Header component
    │       │   ├── blog-card.tsx           # Blog card component
    │       │   └── ui/
    │       │       ├── button.tsx          # Button component
    │       │       ├── card.tsx            # Card component
    │       │       ├── input.tsx           # Input component
    │       │       └── textarea.tsx        # Textarea component
    │       └── lib/
    │           ├── api.ts                  # API client
    │           └── utils.ts                # Utility functions
    │
    └── shared/                             # Shared Types & Utils
        ├── .eslintrc.json                  # ESLint config
        ├── package.json                    # Dependencies
        ├── tsconfig.json                   # TypeScript config
        ├── tsconfig.node.json              # Node TypeScript config
        └── src/
            └── index.ts                    # Shared types
```

## Key Files Description

### Root Configuration

- **package.json**: Defines root workspace with turborepo and pnpm configuration
- **turbo.json**: Configures turborepo task pipeline (dev, build, lint, type-check, format)
- **pnpm-workspace.yaml**: Defines pnpm workspace packages
- **.eslintrc.json**: ESLint configuration for the entire project
- **.prettierrc**: Prettier code formatting rules

### Backend Package

- **src/index.ts**: Main Express server with 7 API endpoints
- **prisma/schema.prisma**: Defines Blog model with id, title, content, excerpt, slug, published, createdAt, updatedAt
- **.env**: Database URL and server configuration

**API Endpoints:**
- GET /health - Health check
- GET /api/blogs - Get published blogs
- GET /api/blogs/:slug - Get blog by slug
- GET /api/admin/blogs - Get all blogs
- POST /api/admin/blogs - Create blog
- PUT /api/admin/blogs/:id - Update blog
- DELETE /api/admin/blogs/:id - Delete blog

### Frontend Package

**Pages:**
- `/` - Home page with blog listing
- `/blog/[slug]` - Individual blog post with Markdown rendering
- `/admin` - Admin dashboard for blog management
- `/admin/create` - Create new blog post
- `/admin/edit/[id]` - Edit existing blog post

**Components:**
- Header with navigation
- BlogCard component for displaying blog previews
- shadcn/ui components: Button, Card, Input, Textarea
- API integration layer

### Shared Package

- Defines TypeScript interfaces:
  - Blog model interface
  - BlogCreateInput and BlogUpdateInput
  - ApiResponse<T> for consistent API responses

## Technologies Used

### Core Monorepo
- **Turborepo** ^1.10.12 - Monorepo task orchestration
- **pnpm** ^8.0.0 - Fast package manager with workspace support

### Backend
- **Express** ^4.18.2 - Web framework
- **TypeScript** ^5.2.0 - Type safety
- **Prisma** ^5.7.1 - ORM for database
- **@prisma/client** ^5.7.1 - Prisma client
- **cors** ^2.8.5 - CORS middleware
- **slug** ^9.1.0 - URL slug generation
- **tsx** ^4.7.0 - TypeScript executor for development

### Frontend
- **Next.js** ^14.0.4 - React framework
- **React** ^18.2.0 - UI library
- **TypeScript** ^5.2.0 - Type safety
- **Tailwind CSS** ^3.3.6 - CSS framework
- **shadcn/ui** - Component library with:
  - @radix-ui/react-slot
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-toast
  - class-variance-authority
  - clsx
  - tailwind-merge
  - tailwindcss-animate
- **react-markdown** ^9.0.1 - Markdown rendering
- **react-hook-form** ^7.48.0 - Form state management
- **zod** ^3.22.4 - Schema validation

## Development Scripts

### Root Level
```bash
pnpm install       # Install dependencies
pnpm dev           # Start all services (backend + frontend)
pnpm build         # Build all packages
pnpm lint          # Lint all code
pnpm format        # Format all code with Prettier
pnpm type-check    # Type check all packages
```

### Backend
```bash
cd packages/backend
pnpm dev           # Start development server with hot reload
pnpm build         # Build TypeScript
pnpm start         # Run production build
pnpm db:migrate    # Run database migrations
pnpm db:generate   # Generate Prisma client
pnpm db:studio     # Open Prisma Studio
```

### Frontend
```bash
cd packages/frontend
pnpm dev           # Start Next.js dev server
pnpm build         # Build for production
pnpm start         # Run production server
pnpm lint          # Lint with ESLint
```

### Shared
```bash
cd packages/shared
pnpm build         # Build TypeScript
pnpm type-check    # Type check
```

## Database Schema

### Blog Model
```prisma
model Blog {
  id        String     @id @default(cuid())
  title     String
  content   String
  excerpt   String
  slug      String     @unique
  published Boolean    @default(false)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

- **id**: Unique identifier (CUID format)
- **title**: Blog post title
- **content**: Full markdown content
- **excerpt**: Short preview text
- **slug**: URL-friendly identifier (unique)
- **published**: Publication status (default: false)
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT="3000"
FRONTEND_URL="http://localhost:3001"
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
```

## Features Implemented

✅ **Full-Stack Architecture**
- Monorepo structure with turborepo and pnpm
- Shared type definitions across packages
- Independent build and development workflows

✅ **Backend Features**
- REST API with Express.js
- Database ORM with Prisma
- SQLite database
- CORS support
- Error handling and validation
- Type-safe endpoints

✅ **Frontend Features**
- Server-side rendering with Next.js
- Client-side state management
- Responsive UI with Tailwind CSS
- shadcn/ui component library
- Markdown rendering for blog content
- Admin dashboard for blog management

✅ **Blog Features**
- Create, read, update, delete blog posts
- Publish/unpublish functionality
- Markdown support
- Slug-based URLs
- Timestamps and metadata

✅ **Developer Experience**
- TypeScript throughout
- ESLint configuration
- Prettier code formatting
- Environment variable management
- Development and production builds
- Hot reload development servers

## Next Steps

1. Install dependencies: `pnpm install`
2. Set up database: `cd packages/backend && pnpm db:migrate`
3. Start development: `pnpm dev`
4. Open browser: http://localhost:3001
5. Access admin: http://localhost:3001/admin
6. Create your first blog post!

## Deployment

### Backend
1. Build: `cd packages/backend && pnpm build`
2. Set environment variables on server
3. Run: `node dist/index.js`

### Frontend
1. Build: `cd packages/frontend && pnpm build`
2. Deploy `.next` folder to hosting (Vercel, Netlify, etc.)

---

This project is fully functional and ready for development and deployment!
