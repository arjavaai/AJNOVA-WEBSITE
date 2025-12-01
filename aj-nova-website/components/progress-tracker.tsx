'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react'
import { ProgressStage, StageStatus } from '@/lib/dashboard-types'
import { cn } from '@/lib/utils'

interface ProgressTrackerProps {
  stages: ProgressStage[]
  className?: string
}

export function ProgressTracker({ stages, className }: ProgressTrackerProps) {
  const sortedStages = [...stages].sort((a, b) => a.order - b.order)
  const completedCount = stages.filter(s => s.status === 'COMPLETED').length
  const progressPercentage = Math.round((completedCount / stages.length) * 100)

  function getStatusIcon(status: StageStatus) {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />
      case 'IN_PROGRESS':
        return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
      case 'NEEDS_ACTION':
        return <AlertCircle className="w-6 h-6 text-amber-600" />
      default:
        return <Circle className="w-6 h-6 text-gray-300" />
    }
  }

  function getStatusColor(status: StageStatus): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-600'
      case 'IN_PROGRESS':
        return 'bg-blue-600'
      case 'NEEDS_ACTION':
        return 'bg-amber-600'
      default:
        return 'bg-gray-300'
    }
  }

  function getStatusLabel(status: StageStatus): string {
    switch (status) {
      case 'COMPLETED':
        return 'Completed'
      case 'IN_PROGRESS':
        return 'In Progress'
      case 'NEEDS_ACTION':
        return 'Needs Action'
      default:
        return 'Pending'
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Application Progress</CardTitle>
            <CardDescription>Track your journey to studying in Germany</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Desktop/Tablet: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute top-[30px] left-0 right-0 h-0.5 bg-gray-200" />
            <div 
              className="absolute top-[30px] left-0 h-0.5 bg-blue-600 transition-all duration-500"
              style={{ width: `${(completedCount / (stages.length - 1)) * 100}%` }}
            />

            {/* Stages */}
            <div className="relative grid grid-cols-6 gap-2">
              {sortedStages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center">
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 w-[60px] h-[60px] rounded-full flex items-center justify-center",
                    "border-4 border-white shadow-lg transition-all duration-300",
                    stage.status === 'COMPLETED' && "bg-green-50",
                    stage.status === 'IN_PROGRESS' && "bg-blue-50",
                    stage.status === 'NEEDS_ACTION' && "bg-amber-50",
                    stage.status === 'PENDING' && "bg-gray-50"
                  )}>
                    {getStatusIcon(stage.status)}
                  </div>

                  {/* Stage Info */}
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium mb-1">{stage.name}</p>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        stage.status === 'COMPLETED' && "border-green-600 text-green-700",
                        stage.status === 'IN_PROGRESS' && "border-blue-600 text-blue-700",
                        stage.status === 'NEEDS_ACTION' && "border-amber-600 text-amber-700",
                        stage.status === 'PENDING' && "border-gray-400 text-gray-600"
                      )}
                    >
                      {getStatusLabel(stage.status)}
                    </Badge>
                    {stage.completionDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(stage.completionDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="block md:hidden space-y-4">
          {sortedStages.map((stage, index) => (
            <div key={stage.id} className="flex gap-4">
              {/* Icon and Connector */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md",
                  stage.status === 'COMPLETED' && "bg-green-50",
                  stage.status === 'IN_PROGRESS' && "bg-blue-50",
                  stage.status === 'NEEDS_ACTION' && "bg-amber-50",
                  stage.status === 'PENDING' && "bg-gray-50"
                )}>
                  {getStatusIcon(stage.status)}
                </div>
                {index < sortedStages.length - 1 && (
                  <div className={cn(
                    "w-0.5 flex-1 min-h-[40px]",
                    sortedStages[index + 1].status === 'COMPLETED' ? "bg-green-600" : "bg-gray-200"
                  )} />
                )}
              </div>

              {/* Stage Info */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{stage.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      stage.status === 'COMPLETED' && "border-green-600 text-green-700",
                      stage.status === 'IN_PROGRESS' && "border-blue-600 text-blue-700",
                      stage.status === 'NEEDS_ACTION' && "border-amber-600 text-amber-700",
                      stage.status === 'PENDING' && "border-gray-400 text-gray-600"
                    )}
                  >
                    {getStatusLabel(stage.status)}
                  </Badge>
                </div>
                {stage.completionDate && (
                  <p className="text-xs text-muted-foreground">
                    Completed {new Date(stage.completionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
