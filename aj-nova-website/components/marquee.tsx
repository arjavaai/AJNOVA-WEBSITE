"use client"

import type React from "react"

import { motion } from "framer-motion"

interface MarqueeProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({ children, direction = "left", speed = 20 }: MarqueeProps) {
  return (
    <div className="relative flex overflow-hidden w-full">
      {/* Left/Right Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap py-4"
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: speed }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  )
}
