import { BeamButton } from "./beam-button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-coral flex items-center justify-center text-white font-bold text-lg">
            AJ
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-foreground">AJ NOVA</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-coral transition">
            Services
          </a>
          <a href="#" className="hover:text-coral transition">
            Universities
          </a>
          <a href="#" className="hover:text-coral transition">
            Pricing
          </a>
        </div>

        <div className="flex gap-4 items-center">
          <a href="#" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-coral py-3">
            Login
          </a>
          <BeamButton primary className="text-sm px-6 py-2">
            Get Started
          </BeamButton>
        </div>
      </div>
    </nav>
  )
}
