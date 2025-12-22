"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  GraduationCap,
  FileText,
  CreditCard,
  Plane,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Sparkles,
  AlertCircle,
  BookOpen,
  Home
} from "lucide-react";

const serviceCategories = [
  {
    title: "Academic & Application Support Services",
    description: "Comprehensive guidance for your university application journey",
    icon: GraduationCap,
    gradient: "from-coral to-coral/80",
    services: [
      {
        name: "APS Preparation & Guidance",
        description: "Complete support for APS certificate application and interview preparation"
      },
      {
        name: "University Application & uni-assist Process Guidance",
        description: "Step-by-step assistance with university applications and uni-assist procedures"
      },
      {
        name: "Statement of Purpose (SOP) Drafting Support",
        description: "Professional guidance to craft compelling SOPs that highlight your strengths"
      },
      {
        name: "Letter of Recommendation (LOR) Drafting Support",
        description: "Assistance in structuring effective recommendation letters"
      },
      {
        name: "Resume / CV Preparation Support",
        description: "Create professional academic CVs tailored for German universities"
      },
      {
        name: "Cover Letter Drafting Support",
        description: "Personalized cover letters aligned with program requirements"
      }
    ]
  },
  {
    title: "Financial & Insurance Guidance Services",
    description: "Navigate financial requirements with confidence",
    icon: CreditCard,
    gradient: "from-navy to-navy/80",
    services: [
      {
        name: "Blocked Account Guidance & Support",
        description: "Complete assistance with blocked account setup and documentation"
      },
      {
        name: "Education Loan Guidance",
        description: "Information and support for education loan options and applications"
      },
      {
        name: "Health Insurance Guidance",
        description: "Help selecting and activating appropriate health insurance coverage"
      }
    ]
  },
  {
    title: "Post-Arrival Support Services in Germany",
    description: "Smooth transition and settling into your new life in Germany",
    icon: Plane,
    gradient: "from-peach to-coral/50",
    services: [
      {
        name: "Airport Pickup Guidance & Coordination",
        description: "Assistance coordinating safe airport pickup and initial transportation"
      },
      {
        name: "SIM Card Guidance & Activation Support",
        description: "Help with local SIM card selection and activation process"
      },
      {
        name: "Accommodation Support & Settling-in Guidance",
        description: "Support finding accommodation and settling into your new home"
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-transparent to-navy/5" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Comprehensive Support & Guidance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-6 tracking-tight">
              Our <span className="text-coral">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
              Expert guidance for your German study journey - from application to arrival
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-navy">Complete Service Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6">
              What We Offer
            </h2>
            <p className="text-lg text-navy/70 max-w-2xl mx-auto">
              Structured guidance and support services for every stage of your journey
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, idx) => (
              <div
                key={category.title}
                className="group"
              >
                {/* Category Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <category.icon className="w-9 h-9 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-navy mb-2">
                        {category.title}
                      </h3>
                      <p className="text-navy/70 text-lg">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-coral/50 via-coral/20 to-transparent"></div>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-22">
                  {category.services.map((service, serviceIdx) => (
                    <div
                      key={serviceIdx}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover/item:bg-coral group-hover/item:scale-110 transition-all duration-300">
                        <CheckCircle className="w-4 h-4 text-coral group-hover/item:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1.5 group-hover/item:text-coral transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-sm text-navy/60 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-coral/5 to-transparent relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,92,69,0.05),transparent_70%)]" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-coral" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-2">
                Important Note
              </h2>
              <div className="h-1 w-16 bg-coral rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-4 pl-0 md:pl-20 border-l-4 border-coral/30 pl-6">
            <p className="text-lg text-navy/80 leading-relaxed">
              All listed services are positioned as <span className="font-semibold text-coral">guidance and support only</span>. AJ NOVA does not guarantee admissions, visas, financial approvals, or service outcomes.
            </p>
            <p className="text-lg text-navy/80 leading-relaxed">
              Final decisions and confirmations are made by <span className="font-semibold text-navy">universities, financial institutions, service providers, and official authorities</span>.
            </p>
            <div className="flex items-start gap-3 pt-4 mt-4">
              <Shield className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
              <p className="text-navy/70 italic">
                Our commitment is to provide clear, honest guidance and structured support throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-navy via-navy/95 to-navy/90 shadow-xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-coral/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/20 rounded-full mb-6">
                <Users className="w-4 h-4 text-coral" />
                <span className="text-sm font-medium text-coral">Start Your Journey Today</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Get <span className="text-coral">Started?</span>
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Book your free consultation today and take the first step towards your German university dream
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-coral/50 hover:scale-105"
                >
                  <span>Book Free Consultation</span>
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="/dashboard/eligibility"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
