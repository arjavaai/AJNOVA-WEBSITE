'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { BeamButton } from "./beam-button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="fixed top-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4" suppressHydrationWarning>
        <nav className="relative w-full max-w-7xl">
          {/* Glassmorphism pill container */}
          <div className="relative rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/5">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <img 
                  src="/websitelogo.png" 
                  alt="AJ NOVA Logo" 
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </Link>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-coral transition-colors duration-200">
                  Home
                </Link>
                <a href="#about" className="hover:text-coral transition-colors duration-200">
                  About
                </a>
                <a href="#services" className="hover:text-coral transition-colors duration-200">
                  Services
                </a>
                <Link href="/eligibility-checker" className="hover:text-coral transition-colors duration-200">
                  Eligibility Checker
                </Link>
                <Link href="/ects-calculator" className="hover:text-coral transition-colors duration-200">
                  ECTS Calculator
                </Link>
                <Link href="/contact" className="hover:text-coral transition-colors duration-200">
                  Contact
                </Link>
              </div>

              {/* CTA Buttons - Desktop */}
              <div className="hidden md:flex gap-3 items-center">
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-coral transition-colors duration-200">
                  Login
                </Link>
                <BeamButton className="text-sm px-5 py-2" href="/login">
                  Sign Up
                </BeamButton>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-coral transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
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
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <a 
                  href="#about" 
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#services" 
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
                <Link
                  href="/eligibility-checker"
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Eligibility Checker
                </Link>
                <Link
                  href="/ects-calculator"
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ECTS Calculator
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <div className="pt-4 border-t border-border space-y-3">
                  <Link
                    href="/login"
                    className="block text-center text-base font-medium text-foreground hover:text-coral transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <BeamButton className="w-full text-sm px-5 py-3" href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </BeamButton>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
