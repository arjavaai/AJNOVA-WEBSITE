import { TextReveal } from "./text-reveal"
import { BeamButton } from "./beam-button"
import { RotatingFeature } from "./rotating-feature"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-semibold uppercase tracking-wider mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Accepting 2025 Applications
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 md:mb-8 text-foreground">
            <TextReveal text="Gateway to" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-coral">
              German Universities
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-lg leading-relaxed">
            AI-powered admissions, personalized counselling, and a 97% visa success rate. Your future in Germany starts
            here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <BeamButton primary className="w-full sm:w-auto justify-center">
              Check Eligibility <ArrowRight className="w-4 h-4" />
            </BeamButton>
            <BeamButton className="w-full sm:w-auto justify-center">Book Consultation</BeamButton>
          </div>

          <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-foreground font-bold text-sm md:text-base">3,000+ Students</p>
              <p className="text-xs md:text-sm">Placed in top universities</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <RotatingFeature />
        </div>
      </div>
    </section>
  )
}
