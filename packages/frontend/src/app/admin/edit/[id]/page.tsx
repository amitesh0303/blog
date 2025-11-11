'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchAllBlogs, updateBlog } from '@/lib/api'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingBlog, setIsLoadingBlog] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    published: false,
  })

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setIsLoadingBlog(true)
        const result = await fetchAllBlogs()
        if (result.success) {
          const blog = result.data.find((b: any) => b.id === blogId)
          if (blog) {
            setFormData({
              title: blog.title,
              excerpt: blog.excerpt,
              content: blog.content,
              published: blog.published,
            })
          } else {
            setError('Blog not found')
          }
        } else {
          setError(result.error)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoadingBlog(false)
      }
    }

    loadBlog()
  }, [blogId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.excerpt || !formData.content) {
      setError('All fields are required')
      return
    }

    try {
      setIsLoading(true)
      const result = await updateBlog(blogId, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        published: formData.published,
      })
      if (result.success) {
        router.push('/admin')
      } else {
        setError(result.error)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingBlog) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
            <CardDescription>
              Update your blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-2 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter blog post title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Excerpt
                </label>
                <Textarea
                  name="excerpt"
                  placeholder="Enter a short excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content (Markdown)
                </label>
                <Textarea
                  name="content"
                  placeholder="Write your blog post content here (supports Markdown)"
                  value={formData.content}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={10}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="published"
                  id="published"
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                  disabled={isLoading}
                  className="rounded border-input"
                />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                  Publish this post
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
