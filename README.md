# Full Stack Blog Application

A modern full-stack blog application built with turborepo, pnpm, Express, TypeScript, Prisma, Next.js, and shadcn.

## 🏗️ Project Structure

```
blog/
├── packages/
│   ├── backend/         # Express API server
│   ├── frontend/        # Next.js frontend
│   └── shared/          # Shared types and utilities
├── turbo.json           # Turborepo configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json         # Root package configuration
```

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set up Environment Variables

**Backend** (`.env` in `packages/backend`):
```env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT="3000"
FRONTEND_URL="http://localhost:3001"
```

**Frontend** (`.env.local` in `packages/frontend`):
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
```

### 3. Initialize Database

```bash
cd packages/backend
pnpm db:generate
pnpm db:migrate
```

### 4. Start Development Servers

```bash
pnpm dev
```

This will start both the backend (port 3000) and frontend (port 3001) in parallel.

## 📦 Packages

### Backend (`packages/backend`)

Express.js server with:
- TypeScript support
- Prisma ORM
- SQLite database
- RESTful API for blog management
- CORS enabled

**Available Routes:**
- `GET /health` - Health check
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `GET /api/admin/blogs` - Get all blogs (admin)
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog

### Frontend (`packages/frontend`)

Next.js application with:
- shadcn/ui components
- TypeScript
- Tailwind CSS
- Markdown rendering
- Blog listing and detail pages
- Admin dashboard for blog management

**Pages:**
- `/` - Blog home page with list of published blogs
- `/blog/[slug]` - Individual blog post view
- `/admin` - Admin dashboard to manage blogs
- `/admin/create` - Create new blog post
- `/admin/edit/[id]` - Edit existing blog post

### Shared (`packages/shared`)

Shared TypeScript types and utilities:
- Blog interfaces
- API response types
- Shared utilities

## 🛠️ Development Scripts

### Root Level
```bash
pnpm dev          # Start all services in development mode
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm format       # Format all code
pnpm type-check   # Type check all packages
```

### Backend
```bash
pnpm dev          # Start dev server with hot reload
pnpm build        # Build TypeScript
pnpm start        # Run production build
pnpm db:migrate   # Run database migrations
pnpm db:generate  # Generate Prisma client
pnpm db:studio    # Open Prisma Studio
```

### Frontend
```bash
pnpm dev          # Start Next.js dev server
pnpm build        # Build for production
pnpm start        # Run production server
pnpm lint         # Lint with ESLint
```

## 🗄️ Database Schema

The application uses Prisma with SQLite. The schema includes:

**Blog Model:**
- `id` - Unique identifier (CUID)
- `title` - Blog post title
- `content` - Blog post content (markdown)
- `excerpt` - Short excerpt
- `slug` - URL-friendly slug (unique)
- `published` - Publication status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🎨 UI Components

The frontend uses shadcn/ui components including:
- Button
- Input
- Textarea
- Card
- Form components

All components are fully typed and support dark mode.

## 🔄 API Integration

The frontend communicates with the backend via REST API. The API client is located in `packages/frontend/src/lib/api.ts`.

**Key Features:**
- Fetch published blogs
- Fetch individual blog by slug
- Create, update, delete blogs (admin)
- Fetch all blogs with drafts (admin)
- Error handling and response validation

## 📝 Features

- ✅ Create, read, update, delete blog posts
- ✅ Publish/unpublish posts
- ✅ Markdown support for content
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Type-safe throughout
- ✅ Monorepo structure with turborepo
- ✅ Fast package management with pnpm

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

This creates optimized builds in each package's dist or .next directory.

### Backend Deployment

1. Build: `cd packages/backend && pnpm build`
2. Set environment variables on your server
3. Run: `node dist/index.js`

### Frontend Deployment

1. Build: `cd packages/frontend && pnpm build`
2. Deploy the `.next` folder to your hosting platform (Vercel, Netlify, etc.)

## 📚 Technologies Used

- **Turborepo** - Monorepo management
- **pnpm** - Fast, disk space efficient package manager
- **Express** - Web framework
- **Prisma** - ORM
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Markdown** - Markdown rendering

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
