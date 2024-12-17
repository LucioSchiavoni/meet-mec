'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface DateTimeSelectionProps {
  onDateTimeChange: (start: string, end: string) => void
}

export default function DateTimeSelection({ onDateTimeChange }: DateTimeSelectionProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleDateSelect = (date: Date | undefined, isStart: boolean) => {
    if (isStart) {
      setStartDate(date)
      if (endDate && date && date > endDate) {
        setEndDate(date)
      }
    } else {
      setEndDate(date)
      if (startDate && date && date < startDate) {
        setStartDate(date)
      }
    }
  }

  const handleTimeChange = (time: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(time)
    } else {
      setEndTime(time)
    }
  }

  React.useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      const start = `${format(startDate, 'dd/MM/yyyy')} - ${startTime}`
      const end = `${format(endDate, 'dd/MM/yyyy')} - ${endTime}`
      onDateTimeChange(start, end)
    }
  }, [startDate, endDate, startTime, endTime, onDateTimeChange])

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>Fecha y hora de inicio</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => handleDateSelect(date, true)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value, true)}
            className="w-[150px]"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Fecha y hora de fin</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => handleDateSelect(date, false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => handleTimeChange(e.target.value, false)}
            className="w-[150px]"
          />
        </div>
      </div>
    </div>
  )
}

