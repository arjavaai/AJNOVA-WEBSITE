import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LogoStrip } from "@/components/logo-strip"
import { FeaturesGrid } from "@/components/features-grid"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { BackgroundGrid } from "@/components/background-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-coral/20">
      <BackgroundGrid />
      <Navbar />
      <HeroSection />
      <LogoStrip />
      <FeaturesGrid />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
