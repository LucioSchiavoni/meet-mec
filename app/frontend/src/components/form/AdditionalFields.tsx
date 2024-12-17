import React from 'react'
import { Input } from '../ui/input'	
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface AdditionalFieldsProps {
  formData: {
    nombre_evento: string
    nombre_organizador: string
    email: string
    observacion: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function AdditionalFields({ formData, onChange }: AdditionalFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre_evento">Nombre del evento</Label>
        <Input
          id="nombre_evento"
          name="nombre_evento"
          value={formData.nombre_evento}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nombre_organizador">Nombre del organizador</Label>
        <Input
          id="nombre_organizador"
          name="nombre_organizador"
          value={formData.nombre_organizador}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="observacion">Observación</Label>
        <Textarea
          id="observacion"
          name="observacion"
          value={formData.observacion}
          onChange={onChange}
          rows={4}
        />
      </div>
    </div>
  )
}

