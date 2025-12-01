import { Marquee } from "./marquee"
import { Library } from "lucide-react"

const universities = ["TU Munich", "RWTH Aachen", "Heidelberg", "TU Berlin", "KIT", "Humboldt", "Freie Berlin"]

export function LogoStrip() {
  return (
    <section className="py-10 border-y border-border bg-muted/50 backdrop-blur-sm">
      <Marquee speed={40}>
        {universities.map((uni, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500"
          >
            <div className="w-8 h-8 bg-border rounded-full flex items-center justify-center text-muted-foreground">
              <Library className="w-4 h-4" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">{uni}</span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
