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
      // Try to get slots from backend first
      const slots = availableSlots.filter(slot => {
        const slotDate = new Date(slot.date)
        slotDate.setHours(0, 0, 0, 0)
        const compareDate = new Date(selectedDay)
        compareDate.setHours(0, 0, 0, 0)
        return slotDate.getTime() === compareDate.getTime() && slot.available
      })
      
      // If no slots from backend, generate default time slots for weekdays
      if (slots.length === 0) {
        const isWeekend = selectedDay.getDay() === 0 || selectedDay.getDay() === 6
        
        if (!isWeekend) {
          // Generate default time slots from 9 AM to 5 PM
          const defaultSlots: AvailableSlot[] = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00'
          ].map(time => ({
            date: selectedDay,
            time: time,
            counsellorId: counsellors[0]?.id || 'default',
            available: true
          }))
          
          setDaySlots(defaultSlots)
        } else {
          setDaySlots([])
        }
      } else {
        setDaySlots(slots)
      }
    } else {
      setDaySlots([])
    }
  }, [selectedDay, availableSlots, counsellors])

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
    if (day.isPast) return
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
      <Card className="max-w-sm">
        <CardHeader className="pb-2 px-3 pt-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Select Date</CardTitle>
            <div className="flex items-center gap-0.5">
              <Button variant="outline" size="sm" onClick={previousMonth} className="h-6 w-6 p-0">
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <span className="text-[10px] font-medium min-w-[90px] text-center">
                {monthNames[currentMonth.getMonth()].substring(0, 3)} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth} className="h-6 w-6 p-0">
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-0.5">
            {/* Day headers */}
            {dayNames.map(day => (
              <div key={day} className="text-center text-[10px] font-medium text-muted-foreground py-1">
                {day.charAt(0)}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isSelected = selectedDay && 
                day.date.toDateString() === selectedDay.toDateString()
              const isCurrentMonth = day.date.getMonth() === currentMonth.getMonth()
              
              return (
                <button
                  key={index}
                  onClick={() => selectDay(day)}
                  disabled={day.isPast}
                  className={cn(
                    "aspect-square text-[10px] rounded transition-colors relative min-h-[28px]",
                    "hover:bg-accent disabled:cursor-not-allowed",
                    day.isToday && "ring-1 ring-primary",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                    day.isPast && "text-muted-foreground opacity-50",
                    !day.isPast && isCurrentMonth && !isSelected && "bg-green-50 hover:bg-green-100",
                    !isCurrentMonth && "opacity-30"
                  )}
                >
                  <div className="flex items-center justify-center h-full">
                    <span>{day.date.getDate()}</span>
                  </div>
                </button>
              )
            })}
          </div>
          
          <div className="mt-2 flex items-center gap-2 text-[9px] text-muted-foreground">
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded bg-green-100 border border-green-200" />
              <span>Avail</span>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded bg-primary" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded ring-1 ring-primary" />
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Time Slots */}
      {selectedDay && (
        <Card className="max-w-sm">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <CalendarIcon className="w-3 h-3" />
              {selectedDay.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </CardTitle>
            <CardDescription className="text-[10px]">
              {daySlots.length} slot{daySlots.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            {daySlots.length > 0 ? (
              <div className="grid grid-cols-4 gap-1.5">
                {daySlots.map((slot, index) => {
                  const isSelected = selectedTime === slot.time
                  
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "h-8 text-[10px] p-0",
                        !isSelected && "hover:border-primary"
                      )}
                      onClick={() => onSelectSlot(slot.date, slot.time, slot.counsellorId)}
                    >
                      {slot.time}
                    </Button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Clock className="w-6 h-6 mx-auto mb-1 opacity-20" />
                <p className="text-[10px]">No slots</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
