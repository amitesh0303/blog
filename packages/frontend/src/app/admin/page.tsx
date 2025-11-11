'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchAllBlogs, deleteBlog } from '@/lib/api'
import Link from 'next/link'

export default function AdminPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true)
        const result = await fetchAllBlogs()
        if (result.success) {
          setBlogs(result.data)
        } else {
          setError(result.error)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      const result = await deleteBlog(id)
      if (result.success) {
        setBlogs(blogs.filter((b) => b.id !== id))
      } else {
        setError(result.error)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/create">Create New Post</Link>
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Error: {error}</p>
          </div>
        )}

        {!isLoading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button asChild>
              <Link href="/admin/create">Create your first post</Link>
            </Button>
          </div>
        )}

        {!isLoading && blogs.length > 0 && (
          <div className="space-y-4">
            {blogs.map((blog) => {
              const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })

              return (
                <Card key={blog.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{blog.title}</CardTitle>
                        <CardDescription>
                          {date} • {blog.published ? '✓ Published' : '○ Draft'}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/edit/${blog.id}`}>Edit</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
