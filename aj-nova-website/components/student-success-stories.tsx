'use client'

import { motion } from 'framer-motion'
import { Quote, MapPin, GraduationCap, Star } from 'lucide-react'
import Image from 'next/image'

interface Story {
  name: string
  university: string
  course: string
  location: string
  image: string
  quote: string
  rating: number
}

const stories: Story[] = [
  {
    name: 'Priya Sharma',
    university: 'Technical University of Munich',
    course: 'Master in Computer Science',
    location: 'Munich, Germany',
    image: '/images/student-hero.png',
    quote:
      'AJ NOVA made my dream of studying in Germany a reality. The APS support was exceptional and the university selection was spot on!',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    university: 'RWTH Aachen University',
    course: 'Master in Mechanical Engineering',
    location: 'Aachen, Germany',
    image: '/images/student-hero.png',
    quote:
      'From visa assistance to accommodation, everything was handled professionally. I highly recommend AJ NOVA!',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    university: 'Heidelberg University',
    course: 'Master in Data Science',
    location: 'Heidelberg, Germany',
    image: '/images/student-hero.png',
    quote:
      'The personalized counseling helped me choose the perfect program. Now I\'m studying at one of Europe\'s best universities!',
    rating: 5,
  },
]

export function StudentSuccessStories() {
  return (
    <section className="py-20 md:py-32 px-6 relative z-10 bg-gradient-to-b from-background to-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/20 bg-coral/5 text-coral text-sm font-semibold uppercase tracking-wider mb-4">
            <Star className="w-4 h-4 fill-coral" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Students Living Their Dreams
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real stories from students who successfully made it to top German universities with our guidance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-coral/10 to-peach/10">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Name Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{story.name}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-coral/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{story.university}</p>
                      <p className="text-muted-foreground text-xs">{story.course}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-coral/20" />
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6 italic">{story.quote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-6">Want to be our next success story?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-coral to-peach text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Your Journey Today
            <GraduationCap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}





