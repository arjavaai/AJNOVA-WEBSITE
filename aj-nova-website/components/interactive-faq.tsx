'use client'

import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the APS certificate and why is it required?',
    answer:
      'APS (Academic Evaluation Centre) certificate is a mandatory document for Indian students applying to German universities. It verifies the authenticity of your academic credentials and evaluates your knowledge through an interview. We provide complete support for APS preparation, including mock interviews and document preparation.',
    category: 'Requirements',
  },
  {
    question: 'How long does the entire process take from start to departure?',
    answer:
      'The complete process typically takes 8-12 months. This includes profile assessment (1-2 days), document preparation (2-3 weeks), APS certification (2-3 months), university applications (1-2 months), visa processing (2-3 months), and pre-departure arrangements (1 month). We help you plan and manage timelines efficiently.',
    category: 'Timeline',
  },
  {
    question: 'What are the tuition fees for German universities?',
    answer:
      'Most public universities in Germany charge no tuition fees or minimal semester fees (€150-€350 per semester). You\'ll need to budget for living expenses (€850-€1,200/month), blocked account (€11,208 for visa), and initial setup costs. Private universities may charge tuition fees.',
    category: 'Costs',
  },
  {
    question: 'Do I need to know German to study in Germany?',
    answer:
      'For English-taught programs, you typically need IELTS/TOEFL scores. However, learning basic German (A1-B1 level) is highly recommended for daily life and can improve your job prospects. Some programs, especially at Bachelor\'s level, require German proficiency (C1 level).',
    category: 'Language',
  },
  {
    question: 'What is a blocked account and how do I open one?',
    answer:
      'A blocked account (Sperrkonto) is a special bank account where you deposit funds (currently €11,208) to prove you can support yourself in Germany. We help you open accounts with Expatrio or Coracle with just one click, and guide you through the entire process.',
    category: 'Requirements',
  },
  {
    question: 'Can I work while studying in Germany?',
    answer:
      'Yes! International students can work 120 full days or 240 half days per year. Many students work part-time (10-20 hours/week) to support themselves. Germany offers excellent opportunities for working students, with average wages of €10-15 per hour.',
    category: 'Work',
  },
  {
    question: 'What documents do I need for university applications?',
    answer:
      'Required documents typically include: Academic transcripts and certificates, APS certificate, CV/Resume, Statement of Purpose (SOP), Letters of Recommendation (LOR), IELTS/TOEFL scores (for English programs), Passport copy, and program-specific requirements. We help you prepare all documents professionally.',
    category: 'Requirements',
  },
  {
    question: 'How much does your service cost?',
    answer:
      'We offer transparent pricing with different packages based on your needs. Our services include free preliminary assessment, and paid packages cover complete end-to-end support including document preparation, university applications, visa assistance, and accommodation. Contact us for detailed pricing.',
    category: 'Services',
  },
  {
    question: 'What is your success rate?',
    answer:
      'We maintain a 95% success rate for university admissions and visa approvals. We have helped 500+ students secure admissions to top German universities. Our comprehensive support and experienced counselors ensure the highest chances of success for our students.',
    category: 'Services',
  },
  {
    question: 'When should I start the application process?',
    answer:
      'Ideally, start 12-18 months before your intended intake. German universities have two main intakes: Winter Semester (October) and Summer Semester (April). Application deadlines are usually 6-8 months before the semester starts. Early preparation significantly improves your chances.',
    category: 'Timeline',
  },
]

const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))]

export function InteractiveFAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="py-20 md:py-32 px-6 relative z-10 bg-gradient-to-b from-background to-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/20 bg-coral/5 text-coral text-sm font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Got questions? We've got answers. Find everything you need to know about studying in Germany.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base rounded-xl border-2 focus-visible:ring-coral"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-coral to-peach text-white shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:border-coral/30 hover:text-coral'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-coral/5 transition-colors">
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-coral text-sm font-bold">Q</span>
                      </div>
                      <span className="font-semibold text-foreground">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="flex items-start gap-3 pl-9">
                      <div className="text-muted-foreground leading-relaxed">{faq.answer}</div>
                    </div>
                    <div className="pl-9 mt-3">
                      <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs font-medium rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </section>
  )
}

