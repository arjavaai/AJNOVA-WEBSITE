"use client"

import type React from "react"

import { useMotionTemplate, useMotionValue, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlashlightCardProps {
  children: React.ReactNode
  className?: string
}

export function FlashlightCard({ children, className }: FlashlightCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        "group relative border border-border bg-card overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300",
        className,
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(242, 92, 69, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
