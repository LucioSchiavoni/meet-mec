'use client'

import { useState, useEffect, useCallback } from 'react'
import { format, isBefore, startOfDay, parse } from 'date-fns'
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
  onDateTimeChange: (fecha: string, hora_ini: string, hora_fin: string) => void
}

export default function DateTimeSelection({ onDateTimeChange }: DateTimeSelectionProps) {
  const [fecha, setFecha] = useState<Date | undefined>(() => {
    const savedFecha = localStorage.getItem('fecha')
    return savedFecha ? parse(savedFecha, 'dd/MM/yyyy', new Date()) : undefined
  })
  const [hora_ini, setHoraIni] = useState(() => localStorage.getItem('hora_ini') || '')
  const [hora_fin, setHoraFin] = useState(() => localStorage.getItem('hora_fin') || '')

  const handleDateSelect = (date: Date | undefined) => {
    setFecha(date)
    if (date) {
      localStorage.setItem('fecha', format(date, 'dd/MM/yyyy'))
    } else {
      localStorage.removeItem('fecha')
    }
  }

  const handleTimeChange = (time: string, isStart: boolean) => {
    if (isStart) {
      setHoraIni(time)
      localStorage.setItem('hora_ini', time)
    } else {
      setHoraFin(time)
      localStorage.setItem('hora_fin', time)
    }
  }

  const updateParent = useCallback(() => {
    if (fecha && hora_ini && hora_fin) {
      const formattedDate = format(fecha, 'dd/MM/yyyy')
      onDateTimeChange(formattedDate, hora_ini, hora_fin)
    }
  }, [fecha, hora_ini, hora_fin, onDateTimeChange])

  useEffect(() => {
    updateParent()
  }, [updateParent])

  const today = startOfDay(new Date())

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="fecha">Fecha</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="fecha"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !fecha && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fecha ? format(fecha, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fecha}
              onSelect={handleDateSelect}
              initialFocus
              locale={es}
              disabled={(date) => isBefore(date, today)}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-2 flex-1">
          <Label htmlFor="hora_ini">Hora de inicio</Label>
          <Input
            id="hora_ini"
            type="time"
            value={hora_ini}
            onChange={(e) => handleTimeChange(e.target.value, true)}
          />
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <Label htmlFor="hora_fin">Hora de fin</Label>
          <Input
            id="hora_fin"
            type="time"
            value={hora_fin}
            onChange={(e) => handleTimeChange(e.target.value, false)}
          />
        </div>
      </div>
    </div>
  )
}