"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Target, Users, Award, TrendingUp, CheckCircle } from "lucide-react";

const stats = [
  { value: "3,000+", label: "Students Placed" },
  { value: "12+", label: "Partner Universities" },
  { value: "97%", label: "Visa Success Rate" },
  { value: "500+", label: "Successful Applications" }
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to making German university education accessible to Indian students through expert guidance and innovative technology."
  },
  {
    icon: Users,
    title: "Student-Centric",
    description: "Every student is unique. We provide personalized counselling and support tailored to your specific goals and background."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in our services, from document quality to application accuracy."
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description: "Clear communication, honest advice, and real-time tracking keep you informed every step of the way."
  }
];

const achievements = [
  "Founded with a vision to simplify German university admissions",
  "Successfully placed 3,000+ students in top German universities",
  "Partnerships with 12+ leading German universities",
  "97% visa success rate - industry-leading",
  "AI-powered document generation system",
  "24/7 student support and guidance"
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-blue-500">AJ NOVA</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Empowering students to achieve their dreams of studying in Germany through expert guidance, innovative technology, and personalized support.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  AJ NOVA was founded with a simple yet powerful vision: to make the dream of studying in Germany accessible to every deserving Indian student. We recognized that while Germany offers world-class education at affordable costs, the application process can be complex and overwhelming.
                </p>
                <p>
                  What started as a small consulting service has grown into a comprehensive digital platform that combines expert counselling with cutting-edge AI technology. We've successfully guided thousands of students through every step of their journey - from eligibility assessment to settling in Germany.
                </p>
                <p>
                  Today, AJ NOVA stands as a trusted partner for students aspiring to study in Germany. Our team of experienced counsellors, combined with our innovative technology platform, ensures that every student receives personalized guidance and has the best chance of success.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                >
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 text-center group"
              >
                <value.icon className="w-16 h-16 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose AJ NOVA?
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Expert Guidance",
                description: "Our team of experienced counsellors has in-depth knowledge of the German education system and admission requirements."
              },
              {
                title: "AI-Powered Tools",
                description: "Leverage our cutting-edge AI technology to generate professional documents like SOPs, LORs, and resumes in minutes."
              },
              {
                title: "End-to-End Support",
                description: "From eligibility checking to post-arrival services, we're with you every step of the way."
              },
              {
                title: "Transparent Process",
                description: "Track your application progress in real-time and stay informed with instant updates."
              },
              {
                title: "Proven Track Record",
                description: "With a 97% visa success rate and 3,000+ students placed, we have a history of delivering results."
              },
              {
                title: "Personalized Approach",
                description: "No two students are alike. We tailor our services to match your unique profile and goals."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of successful students who trusted AJ NOVA for their German university admission
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard/eligibility"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Check Eligibility
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
