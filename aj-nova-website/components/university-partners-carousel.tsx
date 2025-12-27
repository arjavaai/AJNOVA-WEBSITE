'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Building2, MapPin, Users, Trophy } from 'lucide-react'
import { Marquee } from './marquee'

interface University {
  name: string
  location: string
  ranking: string
  students: string
  specialty: string
}

const universities: University[] = [
  {
    name: 'Technical University of Munich',
    location: 'Munich',
    ranking: '#1 in Germany',
    students: '45,000+',
    specialty: 'Engineering & Technology',
  },
  {
    name: 'RWTH Aachen University',
    location: 'Aachen',
    ranking: 'Top 100 Worldwide',
    students: '47,000+',
    specialty: 'Engineering',
  },
  {
    name: 'Heidelberg University',
    location: 'Heidelberg',
    ranking: 'Top 50 Worldwide',
    students: '30,000+',
    specialty: 'Medicine & Sciences',
  },
  {
    name: 'Humboldt University',
    location: 'Berlin',
    ranking: 'Top 120 Worldwide',
    students: '35,000+',
    specialty: 'Humanities & Social Sciences',
  },
  {
    name: 'University of Freiburg',
    location: 'Freiburg',
    ranking: 'Top 150 Worldwide',
    students: '25,000+',
    specialty: 'Natural Sciences',
  },
  {
    name: 'TU Berlin',
    location: 'Berlin',
    ranking: 'Top 200 Worldwide',
    students: '35,000+',
    specialty: 'Technology & Engineering',
  },
  {
    name: 'University of Mannheim',
    location: 'Mannheim',
    ranking: '#1 for Business',
    students: '12,000+',
    specialty: 'Business & Economics',
  },
  {
    name: 'Karlsruhe Institute of Technology',
    location: 'Karlsruhe',
    ranking: 'Top 200 Worldwide',
    students: '25,000+',
    specialty: 'Technology & Research',
  },
]

function UniversityCard({ university }: { university: University }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 min-w-[320px] mx-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-coral/20 to-peach/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-coral" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm leading-tight">{university.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
              <MapPin className="w-3 h-3" />
              {university.location}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background rounded-lg p-3">
          <div className="flex items-center gap-2 text-coral mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-semibold">Ranking</span>
          </div>
          <p className="text-foreground text-sm font-bold">{university.ranking}</p>
        </div>
        <div className="bg-background rounded-lg p-3">
          <div className="flex items-center gap-2 text-coral mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold">Students</span>
          </div>
          <p className="text-foreground text-sm font-bold">{university.students}</p>
        </div>
      </div>

      {/* Specialty */}
      <div className="flex items-center gap-2 p-3 bg-coral/5 border border-coral/20 rounded-lg">
        <Building2 className="w-4 h-4 text-coral flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Specialty: </span>
          {university.specialty}
        </p>
      </div>
    </motion.div>
  )
}

export function UniversityPartnersCarousel() {
  return (
    <section className="py-20 md:py-32 relative z-10 bg-gradient-to-b from-card to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/20 bg-coral/5 text-coral text-sm font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4" />
            University Partners
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Top German Universities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We have partnerships with 50+ prestigious German universities across various fields of study
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:40s]">
          {universities.map((university, index) => (
            <UniversityCard key={index} university={university} />
          ))}
        </Marquee>

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 px-6"
      >
        <p className="text-muted-foreground mb-6 text-lg">
          Not sure which university is right for you?
        </p>
        <a
          href="/eligibility-checker"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-coral to-peach text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Get Personalized University Recommendations
          <GraduationCap className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  )
}





