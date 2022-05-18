const express = require("express")
const app = express()

const PORT = 8080
let visitantes =0
//Sirve para obtener la url
app.get("/",(req,res)=>{
    //send sirve para enviar una respuesta a la peticion
    return res.send(`<h1 style= color:blue >Bienvenidos al servidor express</h1>`)
})

app.get("/visitas",(req,res)=>{
    //send sirve para enviar una respuesta a la peticion
    return res.send(`la cantidad de visitantes es ${visitantes}`)
})
app.get("/fyh",(req,res)=>{
    visitantes ++
    return res.send(new Date())
})
// Con listen escucha al servidor 
const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
//Sirve para manejar un error en caso de que lo haya
app.on("error",error=> console.log(`Error desconocido ${error}`))