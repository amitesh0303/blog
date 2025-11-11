'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { fetchBlogBySlug } from '@/lib/api'

export default function BlogPage() {
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setIsLoading(true)
        const result = await fetchBlogBySlug(slug)
        if (result.success) {
          setBlog(result.data)
        } else {
          setError(result.error)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBlog()
  }, [slug])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-destructive">Error: {error || 'Blog not found'}</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    )
  }

  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">← Back</Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-muted-foreground">{date}</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <Markdown>{blog.content}</Markdown>
        </div>
      </article>
    </main>
  )
}
