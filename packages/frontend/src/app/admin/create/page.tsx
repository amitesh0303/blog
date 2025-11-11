'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createBlog } from '@/lib/api'

export default function CreateBlogPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const result = await createBlog(formData)
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

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
            <CardDescription>
              Write and publish a new blog post
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

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish'}
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
