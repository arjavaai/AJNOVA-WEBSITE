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
  const [activeStep, setActiveStep] = useState<number | null>(1)

  const toggleStep = (id: number) => {
    setActiveStep(activeStep === id ? null : id)
  }

  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-32 px-6 relative z-10 bg-card overflow-hidden">
      <div className="max-w-4xl mx-auto">
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
            Follow our proven roadmap to your dream university in Germany
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === step.id
            const isCompleted = activeStep ? step.id < activeStep : false

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'rounded-2xl border-2 transition-all duration-300 overflow-hidden',
                  isActive
                    ? 'border-coral bg-coral/5 shadow-lg'
                    : 'border-border bg-background hover:border-coral/30 hover:bg-coral/5'
                )}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  {/* Step Number/Icon */}
                  <div
                    className={cn(
                      'flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-br from-coral to-peach text-white'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground group-hover:bg-coral/20 group-hover:text-coral'
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>

                  {/* Header Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={cn(
                          'font-bold text-lg md:text-xl transition-colors',
                          isActive ? 'text-coral' : 'text-foreground'
                        )}
                      >
                        {step.title}
                      </h3>
                      <span className="shrink-0 text-xs md:text-sm text-muted-foreground font-medium px-3 py-1 bg-white/50 rounded-full border border-black/5">
                        {step.duration}
                      </span>
                    </div>
                    {!isActive && (
                      <p className="text-sm text-muted-foreground mt-1 truncate hidden sm:block">
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn('flex-shrink-0', isActive ? 'text-coral' : 'text-muted-foreground')}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 md:pl-24">
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="bg-white/50 rounded-xl p-5 border border-black/5">
                          <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-coral" />
                            What we do in this step:
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-3">
                            {step.details.map((detail, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-slate-600"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-coral mt-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

