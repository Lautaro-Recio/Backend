import express from "express";
import { Request,Response, Express } from "express";
//TIPADO PARA TYPESCRIPT
import Persona from "./persona";
import { getTime } from "./lib/utils";
const app: Express = express()

const p: Persona =new Persona("lautaro","Recio")
app.get("/",(req:Request,res:Response)=>{
    return res.send({
        time:getTime(),
        name: p.getfullName()
    })
})

const PORT:number = 8080

app.listen(PORT, ()=> console.log(`Servidor escuchando en el puerto ${PORT}`))