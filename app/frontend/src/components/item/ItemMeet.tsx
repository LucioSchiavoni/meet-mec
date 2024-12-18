import  { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getMeet } from "../../api/meet"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const localizer = momentLocalizer(moment)

interface MeetItem {
  id: string
  nombre_evento: string
  nombre_organizador: string
  fecha: string
  hora_ini: string
  hora_fin: string
  email: string
  observacion: string
}

const ItemMeet = () => {
  const [view, setView] = useState<'table' | 'calendar'>('calendar')

  const { data, error, isLoading } = useQuery<MeetItem[], Error>({
    queryKey: ['meet'],
    queryFn: getMeet
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data available</p>

  const formatDate = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DD')
  }

  const calendarEvents = data.map((item: MeetItem) => {
    const date = formatDate(item.fecha)
    return {
      title: item.nombre_evento,
      start: new Date(`${date}T${item.hora_ini}`),
      end: new Date(`${date}T${item.hora_fin}`),
    }
  })

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del Evento</TableHead>
          <TableHead>Organizador</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Hora Inicio</TableHead>
          <TableHead>Hora Fin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: MeetItem) => (
          <TableRow key={item.id}>
            <TableCell>{item.nombre_evento}</TableCell>
            <TableCell>{item.nombre_organizador}</TableCell>
            <TableCell>{formatDate(item.fecha)}</TableCell>
            <TableCell>{item.hora_ini}</TableCell>
            <TableCell>{item.hora_fin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const CalendarView = () => (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Eventos
          <div>
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              onClick={() => setView('table')}
              className="mr-2"
            >
              Tabla
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'outline'}
              onClick={() => setView('calendar')}
            >
              Calendario
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {view === 'table' ? <TableView /> : <CalendarView />}
      </CardContent>
    </Card>
  )
}

export default ItemMeet