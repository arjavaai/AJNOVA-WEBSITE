import { Marquee } from "./marquee"

const testimonials = [
  {
    name: "Priya Sharma",
    course: "Masters in CS, TU Munich",
    quote:
      "AJ NOVA completely transformed my application process. The AI tools suggested universities I hadn't even considered.",
  },
  {
    name: "Rahul Verma",
    course: "MS Data Science, RWTH Aachen",
    quote: "The blocked account setup was seamless. They handled everything from documentation to verification.",
  },
  {
    name: "Ananya Patel",
    course: "MBA, Heidelberg",
    quote: "Got my visa approved on the first attempt! Their interview prep sessions were incredibly helpful.",
  },
  {
    name: "Karthik Reddy",
    course: "Masters in ME, TU Berlin",
    quote: "From eligibility check to accommodation, AJ NOVA was with me at every step of the journey.",
  },
  {
    name: "Sneha Gupta",
    course: "MS Physics, KIT",
    quote: "The AI-generated SOP was exactly what I needed. It captured my story perfectly.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden relative bg-muted">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-transparent to-card z-10 pointer-events-none" />

      <h2 className="text-center text-3xl font-display font-bold mb-16 text-foreground relative z-20">
        Trusted by Students
      </h2>

      <Marquee direction="right" speed={50}>
        {testimonials.map((item, i) => (
          <div key={i} className="w-[350px] bg-card border border-border p-6 rounded-2xl mx-4 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-border to-muted" />
              <div>
                <h4 className="font-bold text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.course}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm italic">"{item.quote}"</p>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
