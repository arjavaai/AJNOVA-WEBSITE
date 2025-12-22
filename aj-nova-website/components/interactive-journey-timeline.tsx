'use client'

import { useState, createElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardCheck,
  FileCheck,
  Award,
  Plane,
  GraduationCap,
  Home,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ElementType
  duration: string
  details: string[]
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Profile Assessment',
    description: 'We evaluate your academic background and career goals',
    icon: ClipboardCheck,
    duration: '1-2 days',
    details: [
      'Free preliminary profile evaluation',
      'University shortlisting based on your profile',
      'Course recommendations',
      'Eligibility check for top universities',
    ],
  },
  {
    id: 2,
    title: 'Document Preparation',
    description: 'Get your documents ready for applications',
    icon: FileCheck,
    duration: '2-3 weeks',
    details: [
      'SOP, LOR, and CV crafting',
      'Document translation and notarization',
      'Academic transcript preparation',
      'Portfolio development (if required)',
    ],
  },
  {
    id: 3,
    title: 'APS Certification',
    description: 'Complete your Academic Evaluation Centre process',
    icon: Award,
    duration: '2-3 months',
    details: [
      'APS application guidance',
      'Interview preparation and mock sessions',
      'Document verification support',
      'Certificate procurement',
    ],
  },
  {
    id: 4,
    title: 'University Applications',
    description: 'Apply to your selected universities',
    icon: GraduationCap,
    duration: '1-2 months',
    details: [
      'Application submission to multiple universities',
      'Portal management and tracking',
      'Deadline management',
      'Follow-ups and correspondence',
    ],
  },
  {
    id: 5,
    title: 'Visa Processing',
    description: 'Get your student visa approved',
    icon: Plane,
    duration: '2-3 months',
    details: [
      'Blocked account opening (Expatrio/Coracle)',
      'Visa appointment booking',
      'Document preparation and verification',
      'Interview preparation',
    ],
  },
  {
    id: 6,
    title: 'Pre-Departure',
    description: 'Get ready for your journey to Germany',
    icon: Home,
    duration: '1 month',
    details: [
      'Accommodation arrangements',
      'Flight booking assistance',
      'Pre-departure orientation',
      'Student community connection',
    ],
  },
]

export function InteractiveJourneyTimeline() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-20 md:py-32 px-6 relative z-10 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/20 bg-coral/5 text-coral text-sm font-semibold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Your Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            6 Simple Steps to Success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Click on any step to explore what we do for you at each stage
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              const isCompleted = step.id < activeStep

              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    'w-full text-left group relative',
                    'transition-all duration-300',
                    isActive && 'scale-[1.02]'
                  )}
                >
                  <div
                    className={cn(
                      'p-6 rounded-2xl border-2 transition-all duration-300',
                      isActive
                        ? 'border-coral bg-coral/5 shadow-lg'
                        : 'border-border bg-background hover:border-coral/30 hover:bg-coral/5'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number/Icon */}
                      <div
                        className={cn(
                          'flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                          isActive
                            ? 'bg-gradient-to-br from-coral to-peach text-white'
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-muted text-muted-foreground group-hover:bg-coral/20 group-hover:text-coral'
                        )}
                      >
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={cn(
                              'font-bold text-lg transition-colors',
                              isActive ? 'text-coral' : 'text-foreground'
                            )}
                          >
                            {step.title}
                          </h3>
                          <span className="text-xs text-muted-foreground font-medium px-3 py-1 bg-muted rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>

                      {/* Arrow Indicator */}
                      <motion.div
                        animate={{ x: isActive ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn('flex-shrink-0', isActive ? 'text-coral' : 'text-transparent')}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div
                        className={cn(
                          'w-0.5 h-8 transition-colors duration-300',
                          isCompleted ? 'bg-green-500' : 'bg-border'
                        )}
                      />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Details Panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {steps.map(
                (step) =>
                  activeStep === step.id && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 shadow-xl"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-coral to-peach rounded-2xl flex items-center justify-center text-white">
                          {createElement(step.icon, { className: 'w-8 h-8' })}
                        </div>
                        <div>
                          <div className="text-sm text-coral font-semibold mb-1">Step {step.id}</div>
                          <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-coral" />
                          What we do:
                        </h4>
                        <ul className="space-y-3">
                          {step.details.map((detail, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-coral mt-2 flex-shrink-0" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Timeline:</span> {step.duration}
                          </div>
                          {activeStep < steps.length && (
                            <button
                              onClick={() => setActiveStep(activeStep + 1)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors text-sm font-medium"
                            >
                              Next Step
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

