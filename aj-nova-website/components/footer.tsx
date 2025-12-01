import { Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-coral flex items-center justify-center text-white font-bold text-lg">
              AJ
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-foreground">AJ NOVA</span>
          </div>
          <p className="text-muted-foreground mb-3">
            Making German education accessible to everyone through technology.
          </p>
          <p className="text-coral font-display font-semibold text-sm">Dream • Build • Thrive</p>
        </div>
        <div>
          <h4 className="text-foreground font-display font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-display font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Visa Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Checklist
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-display font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-coral transition">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex justify-between items-center">
        <p className="text-muted-foreground">© 2025 AJ NOVA. All rights reserved.</p>
        <div className="flex gap-4">
          <Twitter className="w-[18px] h-[18px] text-muted-foreground hover:text-coral cursor-pointer transition" />
          <Linkedin className="w-[18px] h-[18px] text-muted-foreground hover:text-coral cursor-pointer transition" />
          <Instagram className="w-[18px] h-[18px] text-muted-foreground hover:text-coral cursor-pointer transition" />
        </div>
      </div>
    </footer>
  )
}
