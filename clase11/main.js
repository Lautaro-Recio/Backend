const express = require("express")
//Asi se renombra una variable
const {Server:IOserver} = require("socket.io")
const {Server:HttpServer}=require("http")

const app=express()
const httpServ=new HttpServer(app)

//IOserver necesita un servidor http para levantarlo 
const io= new IOserver(httpServ)

const PORT = 8080
app.use(express.static("./public"))
httpServ.listen(PORT,()=>{
    console.log(`Server levantado en el puero ${PORT}`)
})

io.on("connection",(socket)=>{
    console.log("Usuario conectado",socket.id)
    //Una vez que se conectaron el cliente al servidor podemos empezar a enviar mensajes
    socket.emit("mi mensaje",`Este es mi mensaje desde el servidor${socket.id}`)
    //Sirve para enviar mensajes, el primer parametro es el identificador y el segundo es el mensaje

    //Asi envio mensajes a todos los conectados
    io.sockets.emit("Nuevo cliente", `Se conencto un nuevo cliente${socket.id}`)
})