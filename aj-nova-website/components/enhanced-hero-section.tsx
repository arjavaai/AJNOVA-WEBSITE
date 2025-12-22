'use client'

import { TextReveal } from './text-reveal'
import { BeamButton } from './beam-button'
import { ArrowRight, Play, TrendingUp, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const quickStats = [
  { value: '500+', label: 'Students', icon: Users },
  { value: '95%', label: 'Success Rate', icon: TrendingUp },
  { value: '50+', label: 'Universities', icon: Award },
]

export function EnhancedHeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-semibold uppercase tracking-wider mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Accepting 2025 Applications
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 md:mb-8 text-foreground">
            <TextReveal text="Gateway to" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-coral">
              German Universities
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-lg leading-relaxed">
            AI-powered admissions, personalized counselling, and comprehensive support. Your future in Germany starts
            here.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 md:mb-10">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-coral/10 rounded-lg mb-2">
                    <Icon className="w-5 h-5 text-coral" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <BeamButton primary className="w-full sm:w-auto justify-center" href="/eligibility-checker">
              Start Assessment <ArrowRight className="w-4 h-4" />
            </BeamButton>
            <BeamButton className="w-full sm:w-auto justify-center" href="/contact">
              Book Consultation
            </BeamButton>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-peach border-2 border-background"
                  />
                ))}
              </div>
              <span>500+ happy students</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★★★★★</span>
              <span>4.9/5 rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Image/Video Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-coral/20 to-peach/20">
                <Image
                  src="/images/student-hero.png"
                  alt="Student studying in Germany"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Play Button Overlay for Video (Optional) */}
                {!isVideoPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-coral ml-1" fill="currentColor" />
                    </div>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Floating Card 1 - Success Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-6 top-20 bg-card border border-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 - University Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -right-6 bottom-20 bg-card border border-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-xs text-muted-foreground">Universities</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-peach/10 rounded-full blur-3xl" />
          </div>

          {/* Secondary Image - Germany Lifestyle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background"
          >
            <Image
              src="/images/germany-lifestyle.png"
              alt="Life in Germany"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


