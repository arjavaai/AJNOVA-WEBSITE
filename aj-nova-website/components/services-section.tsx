'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Plane, FileCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
    {
        title: 'University Shortlisting',
        description: 'Curated list of public universities based on your profile and career goals.',
        icon: GraduationCap,
        href: '/services/admission'
    },
    {
        title: 'Visa Assistance',
        description: 'Expert guidance on documentation, blocked accounts, and interview prep.',
        icon: Plane,
        href: '/services/visa'
    },
    {
        title: 'Application Support',
        description: 'End-to-end application management for assured admissions.',
        icon: FileCheck,
        href: '/services/application'
    }
]

export function ServicesSection() {
    return (
        <section className="py-20 px-6 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                            Comprehensive <span className="text-coral">Services</span>
                        </h2>
                        <p className="text-slate-600 text-lg">
                            We guide you through every step of your journey to Germany, ensuring a hassle-free experience.
                        </p>
                    </div>
                    <Link
                        href="/services"
                        className="hidden md:inline-flex items-center font-semibold text-navy hover:text-coral transition-colors gap-2"
                    >
                        View all services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-coral/20 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-coral group-hover:text-white transition-colors duration-300 text-navy">
                                    <Icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-sm font-semibold text-coral opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center font-semibold text-navy hover:text-coral transition-colors gap-2"
                    >
                        View all services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
