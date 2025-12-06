'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Home, User, Building2, ClipboardCheck, LogOut, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <div className="min-h-screen bg-background" suppressHydrationWarning>
        {/* Pill-shaped Header */}
        <div className="fixed top-0 w-full z-50 flex justify-center pt-4 px-4" suppressHydrationWarning>
          <header className="relative w-full max-w-6xl">
            {/* Glassmorphism pill container */}
            <div className="relative rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-lg">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Content */}
              <div className="relative px-4 md:px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img 
                    src="/websitelogo.png" 
                    alt="AJ NOVA Logo" 
                    className="h-7 md:h-8 w-auto object-contain"
                  />
                </Link>

                {/* Navigation Links - Desktop */}
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

                {/* Profile & Logout - Desktop */}
                <div className="hidden md:flex items-center gap-1">
                  <Link 
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </header>
        </div>
        
        {/* Main content with top padding for fixed header */}
        <main className="pt-20 md:pt-24">{children}</main>
      </div>

      {/* Mobile Menu Overlay - Only render after mount to avoid hydration issues */}
      {mounted && mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 mx-4">
            <div className="relative bg-card border border-border rounded-3xl shadow-xl p-6">
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/applications"
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="w-5 h-5" />
                  Applications
                </Link>
                <Link 
                  href="/dashboard/documents"
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="w-5 h-5" />
                  Documents
                </Link>
                <Link 
                  href="/dashboard/aps-form"
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ClipboardCheck className="w-5 h-5" />
                  APS Form
                </Link>
                
                <div className="pt-4 border-t border-border space-y-3">
                  <Link 
                    href="/dashboard/profile"
                    className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="flex items-center gap-3 w-full text-base font-medium text-red-500 hover:text-red-600 transition-colors py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
