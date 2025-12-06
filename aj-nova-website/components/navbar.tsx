import Link from "next/link"
import { BeamButton } from "./beam-button"

export function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4">
      <nav className="relative w-full max-w-7xl">
        {/* Glassmorphism pill container */}
        <div className="relative rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/5">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative px-6 md:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/websitelogo.png" 
                alt="AJ NOVA Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Navigation Links */}
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
              <Link href="/contact" className="hover:text-coral transition-colors duration-200">
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 items-center">
              <Link href="/login" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-coral transition-colors duration-200">
                Login
              </Link>
              <BeamButton primary className="text-sm px-5 py-2">
                Free Consultation
              </BeamButton>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
