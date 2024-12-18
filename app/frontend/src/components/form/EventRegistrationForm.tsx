import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import DateTimeSelection from './DateTimeSelection'
import AdditionalFields from './AdditionalFields'
import { useMutation } from '@tanstack/react-query'
import { createMeet } from '../../api/meet'
import { useToast } from "../../hooks/use-toast"
import { Toaster } from "../ui/toaster"

interface FormData {
  nombre_evento: string
  nombre_organizador: string
  fecha: string
  hora_ini: string
  hora_fin: string
  email: string
  observacion: string
}

export default function EventRegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nombre_evento: '',
    nombre_organizador: '',
    fecha: '',
    hora_ini: '',
    hora_fin: '',
    email: '',
    observacion: ''
  })
  const { toast } = useToast()

  const handleDateTimeChange = (fecha: string, start: string, end: string) => {
    setFormData(prev => ({ ...prev, fecha: fecha , hora_ini: start, hora_fin: end }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const mutation = useMutation({
    mutationFn: createMeet,
    onSuccess: (success:any) => {
      toast({
        title: "Éxito",
        description: success.message,
        variant: "default",
      })
      setFormData({
        nombre_evento: '',
        nombre_organizador: '',
        fecha: '',
        hora_ini: '',
        hora_fin: '',
        email: '',
        observacion: ''
      })
      setStep(1)
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Hubo un problema al registrar el evento. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
     mutation.mutate(formData)
  }

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault() 
    setStep(step + 1)
  }

  return (
    <>
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
          <CardFooter className="flex justify-between gap-7">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Anterior
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={handleNextStep}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit" className='ml-4' disabled={mutation.isPending}>
                {mutation.isPending ? "Registrando..." : "Registrar Evento"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </>
  )
}