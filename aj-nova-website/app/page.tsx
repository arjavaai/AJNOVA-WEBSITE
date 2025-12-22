import { Navbar } from "@/components/navbar"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { StatsCounter } from "@/components/stats-counter"
import { FeaturesGrid } from "@/components/features-grid"
import { InteractiveJourneyTimeline } from "@/components/interactive-journey-timeline"
import { StudentSuccessStories } from "@/components/student-success-stories"
import { UniversityPartnersCarousel } from "@/components/university-partners-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import { InteractiveFAQ } from "@/components/interactive-faq"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-coral/20">
      <Navbar />
      <EnhancedHeroSection />
      <StatsCounter />
      <FeaturesGrid />
      <InteractiveJourneyTimeline />
      <StudentSuccessStories />
      <UniversityPartnersCarousel />
      <TestimonialsSection />
      <InteractiveFAQ />
      <CtaSection />
      <Footer />
    </div>
  )
}
