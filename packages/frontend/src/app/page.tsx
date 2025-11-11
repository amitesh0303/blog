'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { BlogCard } from '@/components/blog-card'
import { fetchBlogs } from '@/lib/api'

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true)
        const result = await fetchBlogs()
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

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">
            Read our latest articles and insights
          </p>
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
            <p className="text-muted-foreground">No blog posts yet</p>
          </div>
        )}

        {!isLoading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                slug={blog.slug}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
