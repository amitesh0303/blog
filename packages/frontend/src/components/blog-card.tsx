'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  slug: string
  createdAt: string
}

export function BlogCard({ id, title, excerpt, slug, createdAt }: BlogCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
