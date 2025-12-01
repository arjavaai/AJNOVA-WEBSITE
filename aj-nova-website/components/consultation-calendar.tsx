'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react'
import { CalendarDay, AvailableSlot, Counsellor } from '@/lib/consultation-types'
import { cn } from '@/lib/utils'

interface ConsultationCalendarProps {
  availableSlots: AvailableSlot[]
  counsellors: Counsellor[]
  onSelectSlot: (date: Date, time: string, counsellorId: string) => void
  selectedDate?: Date
  selectedTime?: string
}

export function ConsultationCalendar({ 
  availableSlots, 
  counsellors,
  onSelectSlot,
  selectedDate,
  selectedTime
}: ConsultationCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [selectedDay, setSelectedDay] = useState<Date | null>(selectedDate || null)
  const [daySlots, setDaySlots] = useState<AvailableSlot[]>([])

  useEffect(() => {
    generateCalendar()
  }, [currentMonth])

  useEffect(() => {
    if (selectedDay) {
      const slots = availableSlots.filter(slot => {
        const slotDate = new Date(slot.date)
        slotDate.setHours(0, 0, 0, 0)
        const compareDate = new Date(selectedDay)
        compareDate.setHours(0, 0, 0, 0)
        return slotDate.getTime() === compareDate.getTime() && slot.available
      })
      setDaySlots(slots)
    } else {
      setDaySlots([])
    }
  }, [selectedDay, availableSlots])

  function generateCalendar() {
    const days: CalendarDay[] = []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Add days from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay()
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(firstDay)
      date.setDate(date.getDate() - i)
      days.push({
        date,
        hasAvailableSlots: false,
        slotsCount: 0,
        isToday: false,
        isPast: true
      })
    }
    
    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isPast = date < today
      
      // Count available slots for this day
      const slotsForDay = availableSlots.filter(slot => {
        const slotDate = new Date(slot.date)
        slotDate.setHours(0, 0, 0, 0)
        const compareDate = new Date(date)
        compareDate.setHours(0, 0, 0, 0)
        return slotDate.getTime() === compareDate.getTime() && slot.available
      })
      
      days.push({
        date,
        hasAvailableSlots: !isWeekend && !isPast && slotsForDay.length > 0,
        slotsCount: slotsForDay.length,
        isToday: date.getTime() === today.getTime(),
        isPast: isPast || isWeekend
      })
    }
    
    // Add days from next month to fill last week
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay)
      date.setDate(date.getDate() + i)
      days.push({
        date,
        hasAvailableSlots: false,
        slotsCount: 0,
        isToday: false,
        isPast: false
      })
    }
    
    setCalendarDays(days)
  }

  function previousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDay(null)
  }

  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDay(null)
  }

  function selectDay(day: CalendarDay) {
    if (day.isPast || !day.hasAvailableSlots) return
    setSelectedDay(day.date)
  }

  function getCounsellorName(counsellorId: string): string {
    const counsellor = counsellors.find(c => c.id === counsellorId)
    return counsellor?.name || 'Available'
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Select Date</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[150px] text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardDescription>Select a date to view available time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isSelected = selectedDay && 
                day.date.toDateString() === selectedDay.toDateString()
              
              return (
                <button
                  key={index}
                  onClick={() => selectDay(day)}
                  disabled={day.isPast || !day.hasAvailableSlots}
                  className={cn(
                    "aspect-square p-2 text-sm rounded-lg transition-colors relative",
                    "hover:bg-accent disabled:cursor-not-allowed",
                    day.isToday && "ring-2 ring-primary",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                    day.isPast && "text-muted-foreground opacity-50",
                    !day.hasAvailableSlots && !day.isPast && "opacity-30",
                    day.hasAvailableSlots && !isSelected && "bg-green-50 hover:bg-green-100",
                    day.date.getMonth() !== currentMonth.getMonth() && "opacity-30"
                  )}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span>{day.date.getDate()}</span>
                    {day.hasAvailableSlots && !isSelected && (
                      <span className="text-[10px] text-green-600 font-medium">
                        {day.slotsCount} slots
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-primary" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded ring-2 ring-primary" />
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Time Slots */}
      {selectedDay && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {selectedDay.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
            <CardDescription>
              {daySlots.length} time slot{daySlots.length !== 1 ? 's' : ''} available
            </CardDescription>
          </CardHeader>
          <CardContent>
            {daySlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {daySlots.map((slot, index) => {
                  const isSelected = selectedTime === slot.time
                  
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "h-auto py-3 flex-col items-start",
                        !isSelected && "hover:border-primary"
                      )}
                      onClick={() => onSelectSlot(slot.date, slot.time, slot.counsellorId)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{slot.time}</span>
                      </div>
                      <span className="text-xs opacity-80">
                        {getCounsellorName(slot.counsellorId)}
                      </span>
                    </Button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No available time slots for this date</p>
                <p className="text-sm mt-1">Please select another date</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
