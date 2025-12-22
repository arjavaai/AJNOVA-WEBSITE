"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Target, Eye, CheckCircle, BookOpen, Award, Users, Globe, TrendingUp, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Empowering Dreams Since Day One</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-6 tracking-tight">
              About <span className="text-coral">AJ NOVA</span>
            </h1>
            <p className="text-2xl md:text-3xl text-navy/80 font-semibold mb-8 max-w-3xl mx-auto">
              Structured Guidance for Studying in Germany
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 rounded-full mb-4">
                <Globe className="w-4 h-4 text-coral" />
                <span className="text-sm font-medium text-coral">Who We Are</span>
              </div>
              <p className="text-lg text-navy/80 leading-relaxed mb-6">
                AJ NOVA is a Germany-based student guidance platform supporting international students through the German university application journey with clarity, structure, and confidence.
              </p>
              <p className="text-lg text-navy/80 leading-relaxed">
                Germany offers world-class education and long-term opportunities, but the process—from admissions to settling in—can feel complex. AJ NOVA simplifies the journey through expert guidance, structured workflows, and thoughtfully designed systems, while keeping students and families informed at every stage.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-coral to-coral/80 rounded-2xl text-white shadow-lg">
                <Users className="w-10 h-10 mb-3 opacity-90" />
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm opacity-90">Students Guided</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-navy to-navy/80 rounded-2xl text-white shadow-lg">
                <Award className="w-10 h-10 mb-3 opacity-90" />
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-peach to-coral/30 rounded-2xl text-navy shadow-lg">
                <TrendingUp className="w-10 h-10 mb-3 text-coral" />
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm">Partner Universities</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-navy/10 to-coral/10 rounded-2xl text-navy shadow-lg">
                <Heart className="w-10 h-10 mb-3 text-coral" />
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm">Student Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-coral/5 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/10 rounded-full mb-4">
              <Target className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-navy">Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6">
              Our Focus
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-coral/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xl text-navy/80 leading-relaxed text-center max-w-4xl mx-auto">
                AJ NOVA is built exclusively around the <span className="font-semibold text-coral">German higher education system</span> and its official processes. We help students understand requirements, evaluate their profile realistically, and prepare a clear, step-by-step plan aligned with university and process expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Support Students */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 rounded-full mb-4">
              <Users className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Student Support</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6">
              How We Support Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-peach/30 rounded-2xl p-8 shadow-lg border border-coral/10">
              <BookOpen className="w-12 h-12 text-coral mb-4" />
              <p className="text-lg text-navy/80 leading-relaxed">
                AJ NOVA supports students across key stages of the German study journey—from preliminary profile assessment and application guidance to documentation, financial preparation, and post-arrival support in Germany.
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-8 shadow-lg border border-navy">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Our Commitment</h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Our role is to guide, prepare, and support—not to promise outcomes. Final decisions are made by universities and relevant official authorities based on their criteria and document verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-navy/5 to-transparent relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,92,69,0.1),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Our Approach</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Realistic & Transparent",
                description: "We do not guarantee admissions or visa outcomes. We focus on informed decisions and proper preparation.",
                icon: Target,
                gradient: "from-coral to-coral/80"
              },
              {
                title: "Human-Led, System-Supported",
                description: "Smart systems assist with organization and drafting, while critical documents and decisions are reviewed and refined by experienced advisors.",
                icon: Users,
                gradient: "from-navy to-navy/80"
              },
              {
                title: "End-to-End Clarity",
                description: "We provide structured support from the first consultation through key milestones, including post-arrival guidance where needed.",
                icon: CheckCircle,
                gradient: "from-peach to-coral/50"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-coral/10 hover:border-coral/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-navy/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/10 rounded-full mb-4">
              <Award className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-navy">Our Purpose</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-coral to-coral/80 text-white shadow-2xl hover:shadow-coral/30 transition-all duration-500 hover:scale-105">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Target className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Mission</h2>
                <p className="text-lg text-white/95 leading-relaxed">
                  To provide clear, structured, and honest guidance for students pursuing higher education in Germany.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-navy to-navy/90 text-white shadow-2xl hover:shadow-navy/30 transition-all duration-500 hover:scale-105">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-coral/30 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Eye className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Vision</h2>
                <p className="text-lg text-white/95 leading-relaxed">
                  To become a trusted, student-first platform that simplifies the Germany study journey through transparency, process quality, and long-term support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-coral/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(10,35,66,0.05),transparent_60%)]" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border-2 border-coral/20 relative overflow-hidden">
            {/* Decorative Quote Mark */}
            <div className="absolute -top-6 -left-6 text-[150px] font-serif text-coral/10 leading-none">"</div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral to-coral/80 flex items-center justify-center">
                  <BookOpen className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Founder's Note</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-px w-12 bg-coral"></div>
                    <span className="text-sm text-coral font-medium">A Personal Message</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-navy/80 leading-relaxed italic">
                  AJ NOVA was created after first-hand exposure to the challenges students face in international admissions—unclear requirements, inconsistent guidance, and avoidable stress.
                </p>
                <p className="text-xl text-navy/80 leading-relaxed font-medium">
                  The goal is simple: to replace confusion with clarity and pressure with structure, while respecting each student's academic journey.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-coral/20">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-coral" />
                  <span className="text-navy/60 italic">Building bridges to your German dream, one student at a time.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-navy via-navy/95 to-navy/90 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-coral/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-coral" />
                <span className="text-sm font-medium text-coral">Ready to Begin?</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Start Your Journey with <span className="text-coral">AJ NOVA</span>
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you're planning your applications or preparing to settle in Germany, AJ NOVA is here to guide you step by step.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-coral/50 hover:scale-105"
                >
                  <span>Book a Consultation</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <span>Explore Services</span>
                  <Eye className="w-5 h-5" />
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
