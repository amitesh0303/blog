'use client'

import Link from 'next/link'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            Blog
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              Admin
            </Link>
          </nav>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
    </header>
  )
}
