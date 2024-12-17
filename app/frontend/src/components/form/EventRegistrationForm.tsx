
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import DateTimeSelection from './DateTimeSelection'
import AdditionalFields from './AdditionalFields'

interface FormData {
  nombre_evento: string
  nombre_organizador: string
  fecha_init: string
  fecha_fin: string
  email: string
  observacion: string
}

export default function EventRegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nombre_evento: '',
    nombre_organizador: '',
    fecha_init: '',
    fecha_fin: '',
    email: '',
    observacion: ''
  })

  const handleDateTimeChange = (start: string, end: string) => {
    setFormData(prev => ({ ...prev, fecha_init: start, fecha_fin: end }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
    
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Registro de Evento</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <DateTimeSelection onDateTimeChange={handleDateTimeChange} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <AdditionalFields formData={formData} onChange={handleInputChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              Anterior
            </Button>
          )}
          {step < 2 ? (
            <Button type="button" onClick={() => setStep(step + 1)}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit">Registrar Evento</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}

