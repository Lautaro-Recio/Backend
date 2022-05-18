const express = require("express")
const app = express()

const PORT = 8080
const frase= "Hola mundo como estan"
app.get("/api/rest",(req,res)=>{
    res.send(frase)
})
app.get("/api/letras/:num",(req,res)=>{
    const numOfletra = parseInt(req.params.num)
    console.log(numOfletra)
    res.json(frase[numOfletra-1])
})

app.get("/api/palabras/:num",(req,res)=>{
    //separa el contenido en el parametro que se le pase
    const ar_frase = frase.split(" ")
    const numOfpalabra = parseInt(req.params.num)
    console.log(numOfpalabra)
    res.json(ar_frase[numOfpalabra])
})

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))