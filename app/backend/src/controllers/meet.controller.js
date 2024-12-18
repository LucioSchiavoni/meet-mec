import prisma from '../config/db.js'
import moment from 'moment'



export const createMeet = async (req, res) => { 
    const { nombre_evento, nombre_organizador, fecha, hora_ini, hora_fin, email, observacion} = req.body;
    try {
        const formattedDate = moment(fecha, "DD/MM/YYYY").toISOString();
        const create = await prisma.eventos.create({
            data:{
                nombre_evento: nombre_evento,
                nombre_organizador: nombre_organizador,
                fecha: formattedDate,
                hora_ini: hora_ini,
                hora_fin: hora_fin,
                email: email,
                observacion: observacion
            }
        })
       return res.json({success: "Evento creado con éxito", data: create})
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


