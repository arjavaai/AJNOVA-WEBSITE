'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, GraduationCap, Award, TrendingUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  label: string
  suffix?: string
  icon: React.ElementType
}

const stats: Stat[] = [
  { value: 500, label: 'Students Counselled', suffix: '+', icon: Users },
  { value: 250, label: 'Admissions Secured', suffix: '+', icon: GraduationCap },
  { value: 95, label: 'Success Rate', suffix: '%', icon: Award },
  { value: 50, label: 'University Partners', suffix: '+', icon: TrendingUp },
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-16 md:py-24 px-6 relative z-10 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            Numbers That Speak
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of successful students who trusted AJ NOVA for their German education journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-coral/20 to-peach/20 rounded-full mb-4 group-hover:from-coral/30 group-hover:to-peach/30 transition-all">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-coral" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}




