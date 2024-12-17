import prisma from '../config/db.js'
import moment from 'moment'



export const createMeet = async (req, res) => { 
    const { nombre_evento, nombre_organizador, fecha_fin, fecha_init, email, observacion} = req.body;
    try {

        if (!moment(fecha_init, moment.ISO_8601, true).isValid() || !moment(fecha_fin, moment.ISO_8601, true).isValid()) {
            return res.status(400).json({ error: "Invalid fecha_init or fecha_fin. Expected ISO-8601 DateTime." });
        }

        const create = await prisma.eventos.create({
            data:{
                nombre_evento: nombre_evento,
                nombre_organizador: nombre_organizador,
                fecha_init: fecha_init,
                fecha_fin: fecha_fin,
                email: email,
                observacion: observacion
            }
        })
        res.json({success: "Evento creado con éxito", data: create})
    } catch (error) {
        res.json({error: error.message})
    }
}


export const getMeet = async (req, res) => {
    try {
        const get = await prisma.eventos.findMany();
        res.json(get)
    } catch (error) {
        res.json({error: error.message})
    }
}


