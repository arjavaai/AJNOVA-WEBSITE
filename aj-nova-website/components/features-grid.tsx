import { FlashlightCard } from "./flashlight-card"
import { CheckCircle, Lock, Plane, Award, Coins, Home, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Preliminary Profile Assessment",
    desc: "Instant evaluation of your profile for German university admission requirements.",
    icon: CheckCircle,
  },
  {
    title: "Blocked Account",
    desc: "Open your Expatrio or Coracle account in one click.",
    icon: Lock,
  },
  {
    title: "Visa Assistance",
    desc: "Step-by-step guidance for appointment booking and interviews.",
    icon: Plane,
  },
  {
    title: "APS Certification",
    desc: "Complete support for the Academic Evaluation Centre process.",
    icon: Award,
  },
  {
    title: "Loan Assistance",
    desc: "Connect with partners for non-collateral education loans.",
    icon: Coins,
  },
  {
    title: "Accommodation",
    desc: "Find student housing before you even board your flight.",
    icon: Home,
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-32 px-6 relative z-10 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Everything you need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From shortlisting universities to landing in Germany, our platform handles the complexities so you can focus
            on your studies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <FlashlightCard key={i} className="p-8 h-full">
                <div className="w-12 h-12 bg-peach/30 border border-peach/50 rounded-xl flex items-center justify-center mb-6 text-coral">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
              </FlashlightCard>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-coral hover:text-coral/80 font-semibold transition-colors"
          >
            Learn More About Our Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
