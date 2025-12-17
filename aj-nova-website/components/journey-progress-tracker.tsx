'use client'

import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type JourneyStageStatus = 'COMPLETED' | 'CURRENT' | 'UPCOMING'

interface JourneyStage {
  id: string
  name: string
  status: JourneyStageStatus
  order: number
}

interface JourneyProgressTrackerProps {
  currentStage?: string
  completedStages?: string[]
  className?: string
}

const DEFAULT_STAGES: JourneyStage[] = [
  { id: 'consultation', name: 'Consultation', status: 'UPCOMING', order: 1 },
  { id: 'eligibility', name: 'Assessment', status: 'UPCOMING', order: 2 },
  { id: 'aps', name: 'APS', status: 'UPCOMING', order: 3 },
  { id: 'documents', name: 'AI Docs', status: 'UPCOMING', order: 4 },
  { id: 'review', name: 'Final Review', status: 'UPCOMING', order: 5 },
  { id: 'submission', name: 'Submission', status: 'UPCOMING', order: 6 },
]

export function JourneyProgressTracker({
  currentStage,
  completedStages = [],
  className
}: JourneyProgressTrackerProps) {
  // Calculate stage statuses
  const stages = DEFAULT_STAGES.map(stage => {
    if (completedStages.includes(stage.id)) {
      return { ...stage, status: 'COMPLETED' as JourneyStageStatus }
    } else if (stage.id === currentStage) {
      return { ...stage, status: 'CURRENT' as JourneyStageStatus }
    }
    return stage
  })

  const completedCount = stages.filter(s => s.status === 'COMPLETED').length
  const progressPercentage = Math.round((completedCount / stages.length) * 100)

  return (
    <div className={cn("mb-6", className)}>
      {/* Progress message */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Your application progress is automatically saved. Continue from where you left off.
        </p>
        <span className="text-sm font-semibold text-primary">{progressPercentage}% Complete</span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Desktop: Horizontal stage tracker */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between gap-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              {/* Stage bubble */}
              <div className="flex flex-col items-center flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  stage.status === 'COMPLETED' && "bg-green-500 border-green-600",
                  stage.status === 'CURRENT' && "bg-blue-500 border-blue-600 ring-4 ring-blue-100",
                  stage.status === 'UPCOMING' && "bg-gray-200 border-gray-300"
                )}>
                  {stage.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <Circle className={cn(
                      "w-5 h-5",
                      stage.status === 'CURRENT' ? "text-white" : "text-gray-400"
                    )} />
                  )}
                </div>
                <p className={cn(
                  "text-xs mt-2 text-center font-medium",
                  stage.status === 'COMPLETED' && "text-green-700",
                  stage.status === 'CURRENT' && "text-blue-700",
                  stage.status === 'UPCOMING' && "text-gray-500"
                )}>
                  {stage.name}
                </p>
              </div>

              {/* Arrow connector (except after last stage) */}
              {index < stages.length - 1 && (
                <ArrowRight className={cn(
                  "w-4 h-4 flex-shrink-0 mx-1",
                  stage.status === 'COMPLETED' ? "text-green-500" : "text-gray-300"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Compact horizontal tracker */}
      <div className="block md:hidden">
        <div className="flex items-center gap-1">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                  stage.status === 'COMPLETED' && "bg-green-500 border-green-600",
                  stage.status === 'CURRENT' && "bg-blue-500 border-blue-600",
                  stage.status === 'UPCOMING' && "bg-gray-200 border-gray-300"
                )}>
                  {stage.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className={cn(
                      "w-3 h-3",
                      stage.status === 'CURRENT' ? "text-white" : "text-gray-400"
                    )} />
                  )}
                </div>
                <p className={cn(
                  "text-[10px] mt-1 text-center font-medium",
                  stage.status === 'COMPLETED' && "text-green-700",
                  stage.status === 'CURRENT' && "text-blue-700",
                  stage.status === 'UPCOMING' && "text-gray-500"
                )}>
                  {stage.name}
                </p>
              </div>
              {index < stages.length - 1 && (
                <div className={cn(
                  "h-0.5 w-2 flex-shrink-0",
                  stage.status === 'COMPLETED' ? "bg-green-500" : "bg-gray-300"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
