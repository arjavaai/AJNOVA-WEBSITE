"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Building2, Activity, ArrowLeft, ArrowRight } from "lucide-react"

const rotatingCards = [
  {
    id: 1,
    title: "Smart Document Generation",
    desc: "Our AI engine analyzes your profile and drafts perfect SOPs and LORs in seconds, not weeks.",
    gradientFrom: "#0A2342",
    gradientTo: "#1B3A57",
    icon: FileText,
  },
  {
    id: 2,
    title: "Smart University Selection",
    desc: "Get personalized guidance to find the best-fit German universities for your profile and goals.",
    gradientFrom: "#F25C45",
    gradientTo: "#E84A2F",
    icon: Building2,
  },
  {
    id: 3,
    title: "Real-time Tracker",
    desc: "Live status updates on your application, blocked account, and visa processing.",
    gradientFrom: "#1B3A57",
    gradientTo: "#F25C45",
    icon: Activity,
  },
]

export function RotatingFeature() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      nextCard()
    }, 5000)
    return () => clearInterval(timer)
  }, [index])

  const nextCard = () => setIndex((prev) => (prev + 1) % rotatingCards.length)
  const prevCard = () => setIndex((prev) => (prev - 1 + rotatingCards.length) % rotatingCards.length)

  const CurrentIcon = rotatingCards[index].icon

  return (
    <div className="relative w-full max-w-lg mx-auto h-[400px]" style={{ perspective: "1000px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="w-full h-full rounded-3xl bg-card border border-border p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Background Gradient Blob */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 transition-colors duration-500"
              style={{
                background: `linear-gradient(to bottom right, ${rotatingCards[index].gradientFrom}, ${rotatingCards[index].gradientTo})`,
              }}
            />

            <div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                style={{
                  background: `linear-gradient(to bottom right, ${rotatingCards[index].gradientFrom}, ${rotatingCards[index].gradientTo})`,
                  boxShadow: "0 10px 25px -5px rgba(242, 92, 69, 0.2)",
                }}
              >
                <CurrentIcon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground mb-4">{rotatingCards[index].title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{rotatingCards[index].desc}</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                {rotatingCards.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-navy" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevCard()
                  }}
                  className="p-2 rounded-full hover:bg-muted transition text-muted-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextCard()
                  }}
                  className="p-2 rounded-full hover:bg-muted transition text-muted-foreground"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
