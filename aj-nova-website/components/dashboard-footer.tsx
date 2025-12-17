'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DashboardFooter() {
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language preference
    const saved = localStorage.getItem('preferred_language')
    if (saved) {
      setLanguage(saved)
    }
  }, [])

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // Store in localStorage for future sessions
    localStorage.setItem('preferred_language', value)
    // TODO: Implement actual i18n when translations are added
    console.log('Language changed to:', value)
  }

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">AJ NOVA</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for German university admissions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard/applications" className="text-muted-foreground hover:text-foreground transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link href="/dashboard/consultations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact-support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/dashboard/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/dashboard/notifications" className="text-muted-foreground hover:text-foreground transition-colors">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Language */}
          <div>
            <h3 className="font-semibold mb-3">Legal & Settings</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </label>
              {mounted ? (
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch (German)</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                  English
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AJ NOVA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-use" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/contact-support" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
