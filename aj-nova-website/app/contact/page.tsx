"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/background-grid";
import { BeamButton } from "@/components/beam-button";
import { FlashlightCard } from "@/components/flashlight-card";
import { 
  GraduationCap, 
  FileCheck, 
  Building2, 
  Users, 
  ClipboardCheck,
  Calendar,
  Compass,
  Send,
  Check,
  Download,
  ArrowRight,
  Sparkles,
  CheckCircle
} from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "German University Admissions Experts",
    description: "Specialized knowledge of German higher education system"
  },
  {
    icon: FileCheck,
    title: "Complete Documentation Support",
    description: "End-to-end assistance with all required paperwork"
  },
  {
    icon: Building2,
    title: "Guidance for Public & Private Universities",
    description: "Access to 400+ programs across Germany"
  },
  {
    icon: Users,
    title: "Personalized Counselling",
    description: "One-on-one guidance tailored to your profile"
  }
];

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Check Eligibility",
    description: "Complete our quick assessment to see which programs match your profile"
  },
  {
    number: "02",
    icon: Calendar,
    title: "Schedule Consultation",
    description: "Book a free session with our expert counsellors"
  },
  {
    number: "03",
    icon: Compass,
    title: "Apply with Guidance",
    description: "Get step-by-step support through the entire application process"
  }
];

const resources = [
  {
    title: "Admission Checklist",
    description: "Complete guide to German university applications",
    filename: "admission-checklist.pdf"
  },
  {
    title: "SOP Samples",
    description: "Statement of Purpose templates and examples",
    filename: "sop-samples.pdf"
  },
  {
    title: "APS Guide",
    description: "Step-by-step APS certification walkthrough",
    filename: "aps-guide.pdf"
  }
];

const purposeOptions = [
  "General Inquiry",
  "Eligibility Assessment",
  "Consultation Request",
  "University Admission",
  "Visa Assistance",
  "APS Certification",
  "Documentation Help",
  "Other"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    purpose: "General Inquiry"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        purpose: "General Inquiry"
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-coral/20">
      <BackgroundGrid />
      <Navbar />

      {/* Hero Section */}
      <section id="contact" className="relative z-10 pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" />
                Your Journey Starts Here
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-6 text-foreground">
                Empowering Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-navy">
                  German Dream
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                AjNova is your trusted partner for studying in Germany. We simplify admissions, 
                documentation, and visa processes so you can focus on what matters—your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/eligibility-checker">
                  <BeamButton primary>
                    Check Eligibility <ArrowRight className="w-4 h-4" />
                  </BeamButton>
                </Link>
                <Link href="/dashboard/consultations">
                  <BeamButton>Book Consultation</BeamButton>
                </Link>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-coral/20 via-peach/10 to-transparent rounded-3xl blur-3xl" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-coral/10 to-transparent p-6 rounded-2xl border border-coral/20">
                    <GraduationCap className="w-10 h-10 text-coral mb-3" />
                    <p className="text-sm font-medium text-foreground">Expert Guidance</p>
                  </div>
                  <div className="bg-gradient-to-br from-navy/10 to-transparent p-6 rounded-2xl border border-navy/20">
                    <FileCheck className="w-10 h-10 text-navy mb-3" />
                    <p className="text-sm font-medium text-foreground">Full Support</p>
                  </div>
                  <div className="bg-gradient-to-br from-peach/20 to-transparent p-6 rounded-2xl border border-peach/30">
                    <Building2 className="w-10 h-10 text-coral mb-3" />
                    <p className="text-sm font-medium text-foreground">400+ Programs</p>
                  </div>
                  <div className="bg-gradient-to-br from-coral/10 to-transparent p-6 rounded-2xl border border-coral/20">
                    <Users className="w-10 h-10 text-navy mb-3" />
                    <p className="text-sm font-medium text-foreground">1:1 Counselling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Eligibility Teaser */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-coral/30 bg-gradient-to-r from-coral/10 via-peach/5 to-coral/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-coral/20 rounded-2xl flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-coral" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Find out if you qualify for German public universities
                </h3>
                <p className="text-muted-foreground">
                  Takes less than 60 seconds to complete our eligibility assessment
                </p>
              </div>
              <Link href="/eligibility-checker">
                <BeamButton primary className="whitespace-nowrap">
                  Start Now <ArrowRight className="w-4 h-4" />
                </BeamButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Snapshot Banner */}
      <section className="relative z-10 py-16 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="text-center p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="text-4xl md:text-5xl font-display font-bold text-coral mb-2">3,000+</div>
              <p className="text-muted-foreground font-medium">Students Placed</p>
            </div>
            <div className="text-center p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="text-4xl md:text-5xl font-display font-bold text-coral mb-2">12+</div>
              <p className="text-muted-foreground font-medium">Partner Universities</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-display font-bold text-coral mb-2">97%</div>
              <p className="text-muted-foreground font-medium">Visa Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Why Choose AjNova?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring expertise, dedication, and proven results to help you achieve your dream of studying in Germany.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <FlashlightCard key={index} className="p-6 h-full">
                  <div className="w-14 h-14 bg-peach/30 border border-peach/50 rounded-xl flex items-center justify-center mb-5 text-coral">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </FlashlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start your journey to Germany
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-coral/50 to-coral/20" />
                  )}
                  
                  <div className="relative bg-background border border-border rounded-2xl p-8 text-center hover:border-coral/30 transition-colors">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral text-white text-sm font-bold rounded-full">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 bg-peach/30 border border-peach/50 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 text-coral">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/eligibility-checker">
              <BeamButton primary>
                Get Started Now <ArrowRight className="w-4 h-4" />
              </BeamButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Block */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Let's Plan Your Study Journey Together
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Thank you for contacting AjNova!</h3>
                <p className="text-muted-foreground">Our team will reach out soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-foreground mb-2">
                      Purpose *
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                    >
                      {purposeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message / Inquiry
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all resize-none"
                    placeholder="Tell us about your study abroad goals..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-coral hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(242,92,69,0.39)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="relative z-10 py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Free Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download our comprehensive guides to kickstart your Germany journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {resources.map((resource, index) => (
              <FlashlightCard key={index} className="p-6">
                <div className="w-12 h-12 bg-coral/10 border border-coral/20 rounded-xl flex items-center justify-center mb-4 text-coral">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                <button className="inline-flex items-center gap-2 text-coral font-medium text-sm hover:underline">
                  Download PDF <ArrowRight className="w-4 h-4" />
                </button>
              </FlashlightCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
