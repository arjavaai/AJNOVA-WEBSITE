import { BeamButton } from "./beam-button"

export function CtaSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-coral/5 border border-coral/10 text-center py-20 px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-coral/10 to-transparent opacity-60 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">Ready to fly?</h2>
          <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
            Start your journey to German education today.
          </p>
          <BeamButton primary className="text-lg px-10 py-4 mx-auto">
            Start Free Application
          </BeamButton>
        </div>
      </div>
    </section>
  )
}
