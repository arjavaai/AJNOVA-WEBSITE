import { Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/websitelogo.png"
              alt="AJ NOVA Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
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
              <a href="/about" className="text-muted-foreground hover:text-coral transition">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="text-muted-foreground hover:text-coral transition">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-muted-foreground hover:text-coral transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-display font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="/eligibility-checker" className="text-muted-foreground hover:text-coral transition">
                Eligibility Checker
              </a>
            </li>
            <li>
              <a href="/ects-calculator" className="text-muted-foreground hover:text-coral transition">
                ECTS Calculator
              </a>
            </li>
            <li>
              <a href="#faq" className="text-muted-foreground hover:text-coral transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-display font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#privacy" className="text-muted-foreground hover:text-coral transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="text-muted-foreground hover:text-coral transition">
                Terms of Service
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
