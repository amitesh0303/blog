# Quick Start Guide

## Initial Setup

1. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```

2. **Generate Prisma client** for the backend:
   ```bash
   cd packages/backend
   pnpm db:generate
   pnpm db:migrate
   cd ../..
   ```

3. **Start the development servers**:
   ```bash
   pnpm dev
   ```

   This will start:
   - Backend: http://localhost:3000
   - Frontend: http://localhost:3001

## Project Layout

- **Backend** (`packages/backend/`)
  - Express.js REST API
  - Prisma ORM with SQLite database
  - TypeScript for type safety
  - Runs on port 3000

- **Frontend** (`packages/frontend/`)
  - Next.js React application
  - shadcn/ui components
  - Tailwind CSS styling
  - Runs on port 3001

- **Shared** (`packages/shared/`)
  - TypeScript interfaces and types
  - Shared across backend and frontend

## Usage

### Creating a Blog Post

1. Visit http://localhost:3001/admin
2. Click "Create New Post"
3. Fill in title, excerpt, and content (supports Markdown)
4. Click "Publish"

### Viewing Blog Posts

1. Visit http://localhost:3001 to see published posts
2. Click on any post to read the full content
3. Posts use Markdown rendering

### Editing Blog Posts

1. Go to http://localhost:3001/admin
2. Find the post you want to edit
3. Click "Edit"
4. Make changes and click "Save Changes"

### Deleting Blog Posts

1. Go to http://localhost:3001/admin
2. Find the post you want to delete
3. Click "Delete" and confirm

## Available Scripts

### Root Level
```bash
pnpm dev          # Start all services
pnpm build        # Build all packages
pnpm lint         # Lint all code
pnpm format       # Format all code
pnpm type-check   # Type check all packages
```

### Backend
```bash
cd packages/backend
pnpm dev          # Start dev server
pnpm build        # Build
pnpm db:migrate   # Run migrations
pnpm db:generate  # Generate Prisma client
pnpm db:studio    # Open Prisma Studio
```

### Frontend
```bash
cd packages/frontend
pnpm dev          # Start dev server
pnpm build        # Build
pnpm lint         # Lint
```

## Database

The backend uses SQLite with Prisma ORM. The database file is automatically created at `packages/backend/dev.db`.

To view the database:
```bash
cd packages/backend
pnpm db:studio
```

## API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get a specific blog by slug

### Admin Endpoints
- `GET /api/admin/blogs` - Get all blogs (including drafts)
- `POST /api/admin/blogs` - Create a new blog
- `PUT /api/admin/blogs/:id` - Update a blog
- `DELETE /api/admin/blogs/:id` - Delete a blog

## Environment Variables

### Backend (`.env` in `packages/backend/`)
```
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT="3000"
FRONTEND_URL="http://localhost:3001"
```

### Frontend (`.env.local` in `packages/frontend/`)
```
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
```

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use, you can change them:
- Backend: Modify `PORT` in `packages/backend/.env`
- Frontend: Use `pnpm dev -- -p 3002` in `packages/frontend/`

### Database Issues
Reset the database:
```bash
cd packages/backend
rm dev.db
pnpm db:migrate
```

### Dependencies Not Installing
Clear cache and reinstall:
```bash
rm -rf node_modules
pnpm install
```

## Technology Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Backend**: Express.js + TypeScript + Prisma + SQLite
- **Frontend**: Next.js + React + TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Markdown**: react-markdown

## Next Steps

1. Explore the admin dashboard at http://localhost:3001/admin
2. Create your first blog post
3. Customize the styling in `packages/frontend/src/app/globals.css`
4. Add more features to the API in `packages/backend/src/index.ts`
5. Deploy to your preferred hosting platform

See [README.md](README.md) for more detailed documentation.
