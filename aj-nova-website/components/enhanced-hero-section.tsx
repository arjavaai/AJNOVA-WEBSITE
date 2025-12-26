'use client'

import { BeamButton } from './beam-button'
import { ArrowRight, Sparkles, MessageCircle, GraduationCap, Heart, Plane, CheckCircle, Globe, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function EnhancedHeroSection() {
  return (
    <section className="relative pt-20 pb-8 lg:pt-36 lg:pb-12 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 mb-4 lg:mb-6 text-coral font-medium">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="tracking-wide uppercase text-xs lg:text-sm font-semibold">Start Your Journey Today</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-navy leading-tight mb-4 lg:mb-6 tracking-tight">
              The Best Platform <br className="hidden sm:block" />
              to Enroll in Top <br className="hidden sm:block" />
              <span className="text-coral">German Universities</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-6 lg:mb-10 max-w-lg leading-relaxed">
              Our mission is to help students find the best courses and universities in Germany — tuition free and expert guided.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
              <BeamButton primary className="h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold rounded-lg shadow-xl shadow-coral/20 w-full sm:w-auto justify-center" href="/contact">
                Get Started <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </BeamButton>
              <BeamButton className="h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold rounded-lg bg-white border-2 border-slate-200 hover:border-navy hover:bg-slate-50 text-navy w-full sm:w-auto justify-center" href="/about">
                Learn More
              </BeamButton>
            </div>
          </motion.div>

          {/* Right Content - Single Image with Decorations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[650px] flex items-center justify-center order-1 lg:order-2"
          >
            {/* Soft Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-coral/10 rounded-full blur-3xl opacity-60" />

            {/* Simple Mobile Decoration */}
            <svg className="lg:hidden absolute w-full h-full pointer-events-none z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                cx="80" cy="80" r="3" fill="#f25c45" opacity="0.4"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.5 }}
              />
              <motion.circle 
                cx="320" cy="100" r="3" fill="#f3d6cb" opacity="0.4"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.6 }}
              />
              <motion.circle 
                cx="50" cy="300" r="3" fill="#0a2342" opacity="0.3"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.7 }}
              />
              <motion.circle 
                cx="350" cy="320" r="3" fill="#f25c45" opacity="0.4"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.8 }}
              />
            </svg>

            {/* Background Hand-Drawn Loops (Enhanced) - Hidden on mobile for cleaner look */}
            <svg className="hidden lg:block absolute w-[130%] h-[130%] pointer-events-none z-0" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="roughen">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
              </defs>

              {/* Large Outer Loops - Left */}
              <motion.path
                d="M180 250 C 70 200, 50 500, 170 450"
                stroke="#f25c45" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.25" fill="none"
                filter="url(#roughen)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.4 }}
              />

              {/* Large Outer Loops - Right */}
              <motion.path
                d="M520 250 C 630 200, 650 500, 530 450"
                stroke="#f25c45" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.25" fill="none"
                filter="url(#roughen)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.4 }}
              />

              {/* Medium Inner Loops - Left */}
              <motion.path
                d="M200 270 C 100 230, 100 470, 200 430"
                stroke="#f3d6cb" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" fill="none"
                filter="url(#roughen)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.6 }}
              />

              {/* Medium Inner Loops - Right */}
              <motion.path
                d="M500 270 C 600 230, 600 470, 500 430"
                stroke="#f3d6cb" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" fill="none"
                filter="url(#roughen)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.6 }}
              />



              {/* Small Decorative Circles */}
              <motion.circle cx="200" cy="180" r="4" fill="#f25c45" opacity="0.3"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
              />
              <motion.circle cx="500" cy="180" r="4" fill="#f25c45" opacity="0.3"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
              />
              <motion.circle cx="200" cy="520" r="4" fill="#0a2342" opacity="0.3"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }}
              />
              <motion.circle cx="500" cy="520" r="4" fill="#0a2342" opacity="0.3"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }}
              />
            </svg>

            {/* Mobile-only Simple Floating Icons */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="lg:hidden absolute top-8 right-8 z-20 text-coral opacity-60"
            >
              <Sparkles className="w-5 h-5 fill-coral" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, -180, -270, -360]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="lg:hidden absolute bottom-12 left-8 z-20 text-yellow-400 opacity-60"
            >
              <Sparkles className="w-4 h-4 fill-yellow-300" />
            </motion.div>

            {/* Floating Icons with Enhanced Animations - Hidden on small screens */}

            {/* Top Right - Star */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 12, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute top-8 right-12 z-20"
            >
              <div className="relative">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 5 L 30 18 L 45 18 L 33 28 L 38 42 L 25 32 L 12 42 L 17 28 L 5 18 L 20 18 Z"
                    stroke="#f25c45" strokeWidth="2.5" fill="#fff" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* Top Left - Graduation Cap */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                x: [0, -5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:block absolute top-16 left-8 z-20"
            >
              <div className="bg-white p-3 rounded-2xl shadow-xl border-2 border-navy/10">
                <GraduationCap className="w-8 h-8 text-navy" />
              </div>
            </motion.div>

            {/* Middle Left - Heart */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute top-1/3 left-6 z-20"
            >
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-3 rounded-2xl shadow-lg border-2 border-red-100">
                <Heart className="w-7 h-7 text-red-500 fill-red-500" />
              </div>
            </motion.div>

            {/* Middle Right - Plane */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, -8, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="hidden lg:block absolute top-1/4 right-6 z-20"
            >
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-3 rounded-2xl shadow-lg border-2 border-blue-100">
                <Plane className="w-7 h-7 text-blue-600" />
              </div>
            </motion.div>

            {/* Bottom Left - Chat Bubble */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="hidden lg:block absolute bottom-32 left-10 z-20"
            >
              <div className="bg-white p-3 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl shadow-xl border-2 border-coral/20">
                <MessageCircle className="w-8 h-8 text-coral fill-coral/10" />
              </div>
            </motion.div>

            {/* Bottom Right - Check Circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="hidden lg:block absolute bottom-24 right-16 z-20"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-2xl shadow-lg border-2 border-green-100">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </motion.div>

            {/* Top Center - Globe */}
            <motion.div
              animate={{
                rotate: [0, 360],
                y: [0, -8, 0]
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
              }}
              className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-full shadow-lg border-2 border-indigo-100">
                <Globe className="w-7 h-7 text-indigo-600" />
              </div>
            </motion.div>

            {/* Middle Right - Trending Up */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 8, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="hidden lg:block absolute bottom-1/3 right-4 z-20"
            >
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-2xl shadow-lg border-2 border-orange-100">
                <TrendingUp className="w-7 h-7 text-orange-600" />
              </div>
            </motion.div>

            {/* Sparkles - Multiple Small Ones */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute top-1/2 left-12 z-20 text-yellow-400"
            >
              <Sparkles className="w-6 h-6 fill-yellow-300" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute top-2/3 right-20 z-20 text-pink-400"
            >
              <Sparkles className="w-5 h-5 fill-pink-300" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:block absolute bottom-1/2 right-8 z-20 text-coral"
            >
              <Sparkles className="w-4 h-4 fill-coral" />
            </motion.div>

            {/* Main Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                src="/images for the website/Image 16.png"
                alt="Happy student"
                width={600}
                height={800}
                className="object-contain max-h-full w-auto drop-shadow-2xl lg:-translate-x-24"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
