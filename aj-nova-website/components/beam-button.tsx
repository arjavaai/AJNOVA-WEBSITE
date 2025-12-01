"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface BeamButtonProps {
  children: React.ReactNode
  primary?: boolean
  className?: string
  onClick?: () => void
}

export function BeamButton({ children, primary = false, className, onClick }: BeamButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group overflow-hidden rounded-full px-8 py-3 font-medium transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0",
        primary
          ? "bg-coral text-white shadow-[0_4px_14px_0_rgba(242,92,69,0.39)]"
          : "bg-card text-foreground border border-border hover:bg-muted shadow-sm",
        className,
      )}
    >
      {primary && (
        <span className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:animate-beam" />
          </span>
        </span>
      )}
      <span className="relative flex items-center gap-2 z-10">{children}</span>
    </button>
  )
}
