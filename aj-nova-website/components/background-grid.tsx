"use client"

import { motion } from "framer-motion"

export function BackgroundGrid() {
  const columns = Array.from({ length: 12 })

  return (
    <div className="fixed inset-0 z-0 flex justify-between pointer-events-none opacity-40">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
          className="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
        />
      ))}
    </div>
  )
}
