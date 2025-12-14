"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  GraduationCap,
  FileText,
  Building,
  CreditCard,
  Plane,
  Shield,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  Target
} from "lucide-react";

const serviceCategories = [
  {
    title: "Consultation Services",
    icon: Users,
    services: [
      "Free initial consultation",
      "Eligibility assessment",
      "Course and university selection guidance",
      "Application strategy planning",
      "One-on-one counselling sessions"
    ]
  },
  {
    title: "Documentation Services",
    icon: FileText,
    services: [
      "Profile creation assistance",
      "APS form submission support",
      "AI-powered SOP generation",
      "Letter of Recommendation (LOR)",
      "Resume/CV creation",
      "Cover Letter writing",
      "Document review and editing"
    ]
  },
  {
    title: "Application Services",
    icon: GraduationCap,
    services: [
      "University application submission",
      "Application tracking dashboard",
      "Document management",
      "Real-time status updates",
      "Admission follow-ups"
    ]
  },
  {
    title: "Financial Services",
    icon: CreditCard,
    services: [
      "Blocked Account assistance",
      "Health Insurance guidance",
      "Education loan support",
      "Financial planning advice",
      "Scholarship guidance"
    ]
  },
  {
    title: "On-Arrival Services",
    icon: Plane,
    services: [
      "Airport pickup arrangements",
      "Bank account opening assistance",
      "SIM card procurement",
      "Accommodation support",
      "City registration help"
    ]
  },
  {
    title: "Additional Services",
    icon: Shield,
    services: [
      "Flight booking assistance",
      "Visa application support",
      "Pre-departure orientation",
      "Post-arrival support",
      "APS verification guidance"
    ]
  }
];

const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Book a free consultation to discuss your goals and assess eligibility"
  },
  {
    step: 2,
    title: "Documentation",
    description: "Create profile, generate AI-powered documents, and prepare application materials"
  },
  {
    step: 3,
    title: "Application",
    description: "Submit applications to selected universities and track progress"
  },
  {
    step: 4,
    title: "Financial Setup",
    description: "Set up blocked account, health insurance, and other financial requirements"
  },
  {
    step: 5,
    title: "On-Arrival Support",
    description: "Receive support for arrival, accommodation, and settling in Germany"
  }
];

const features = [
  {
    icon: Target,
    title: "Expert Guidance",
    description: "Personalized counselling from experienced advisors who know the German admission process inside out"
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description: "Our AI-powered tools and streamlined processes save you weeks of work"
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "Comprehensive support with dedicated counsellors guiding you through every step"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-blue-500">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive support for your German study journey - from initial consultation to settling in Germany
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
              <div
                key={category.title}
                className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group"
              >
                <category.icon className="w-16 h-16 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold text-white mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.services.map((service) => (
                    <li key={service} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20" />

            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-black flex items-center justify-center mb-4 relative z-10">
                    <span className="text-3xl font-bold text-blue-500">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-10 -right-12 w-8 h-8 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-2xl border border-gray-800 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Book your free consultation today and take the first step towards your German university dream
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard/eligibility"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Check Eligibility
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-gray-700"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
