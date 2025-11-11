import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import slug from 'slug';
import { BlogCreateInput, BlogUpdateInput, ApiResponse } from '@blog/shared';

const app: Express = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Get all published blogs
app.get('/api/blogs', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get a single blog by slug
app.get('/api/blogs/:slug', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { slug: blogSlug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: {
        slug: blogSlug,
      },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all blogs (admin)
app.get('/api/admin/blogs', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create a new blog
app.post('/api/admin/blogs', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { title, content, excerpt }: BlogCreateInput = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, content, excerpt',
      });
    }

    const blogSlug = slug(title, { lower: true });

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        excerpt,
        slug: blogSlug,
      },
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A blog with this slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update a blog
app.put('/api/admin/blogs/:id', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, published }: BlogUpdateInput = req.body;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }

    let newSlug = blog.slug;
    if (title && title !== blog.title) {
      newSlug = slug(title, { lower: true });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: title || blog.title,
        content: content || blog.content,
        excerpt: excerpt || blog.excerpt,
        slug: newSlug,
        published: published !== undefined ? published : blog.published,
      },
    });

    res.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A blog with this slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete a blog
app.delete('/api/admin/blogs/:id', async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }

    await prisma.blog.delete({
      where: { id },
    });

    res.json({
      success: true,
      data: { id },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
