import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import meetRouter from './src/routes/meet.routes.js';
dotenv.config();


const app = express();


const PORT = process.env.PORT;


const opcionesCors = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}


app.use(cors(opcionesCors));
app.use(express.json());
app.use("/", meetRouter)


app.get("/", (req,res) => {
    res.json("====Index===")

})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})