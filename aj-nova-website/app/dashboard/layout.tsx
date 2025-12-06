'use client'

import Link from 'next/link'
import { FileText, Home, User, Building2, ClipboardCheck, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Pill-shaped Header */}
      <div className="fixed top-0 w-full z-50 flex justify-center pt-4 px-4">
        <header className="relative w-full max-w-6xl">
          {/* Glassmorphism pill container */}
          <div className="relative rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-lg">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative px-6 h-14 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <img 
                  src="/websitelogo.png" 
                  alt="AJ NOVA Logo" 
                  className="h-8 w-auto object-contain"
                />
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1">
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/applications"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  Applications
                </Link>
                <Link 
                  href="/dashboard/documents"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Documents
                </Link>
                <Link 
                  href="/dashboard/aps-form"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  APS Form
                </Link>
              </nav>

              {/* Profile & Logout */}
              <div className="flex items-center gap-1">
                <Link 
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      
      {/* Main content with top padding for fixed header */}
      <main className="pt-24">{children}</main>
    </div>
  )
}
