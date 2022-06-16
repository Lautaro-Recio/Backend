//const { options } = require('./db/ecommerce')
const { options } = require('./db/sqlite3')

const knex = require('knex')(options)




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


const mensajes= []
//Cuando un cliente se conecta hace esto
io.on("connection",(socket)=>{
    console.log("Usuario conectado",socket.id)
    //Una vez que se conectaron el cliente al servidor podemos empezar a enviar mensajes
    //socket.emit("mi mensaje",`Este es mi mensaje desde el servidor ${socket.id}`)
    //Sirve para enviar mensajes, el primer parametro es el identificador y el segundo es el mensaje

    //Este es un mensaje de cliente a servidor(Esta en el index.js, dice el usuario que se conecto)
    //Asi se mapea el mensaje desde el cliente
    socket.on("notification",(data)=>{
        console.log(data,socket.id)
    })
    
    //Asi envio mensajes a todos los conectados
   // io.sockets.emit("Nuevo cliente", `Se conencto un nuevo cliente${socket.id}`)
  
    //Mensajes para los nuevos usuarios
    socket.emit("mensajes",mensajes)

   //
    socket.on("MensajeAServidor",data=>{
        mensajes.push({usuario:socket.id,mensaje:data})
        console.log(mensajes)
        io.sockets.emit("mensajeAClientes", {socketId:socket.id,mensaje:data})
        knex("mensajes")
                .insert(mensajes) //insertamos el arreglo mensajes a la tabla products
                .then(() => console.log(`mensajes insertados`))
                .catch(err => console.log(`Error: ${err.message}`))
                .finally(() => knex.destroy())
   
                knex
                .from("mensajes") //tomamos datos desde products
                .select('*')  //* es igual a todos los datos
                .then(mensajesEnBD => { //con esto obtenemos un JSON y lo manejamos
                    console.log(mensajesEnBD)
                    console.log(`Total de productos: ${mensajesEnBD.length}`)
                    mensajesEnBD.forEach(msj => {
                        console.log(`mensajes: ${msj.mensaje} del usuario ${msj.usuario}`)
                    })
                })    //aca devolvemos los productos a partir de una promise, por eso el then
                .catch(err => console.log(`Error: ${err.message}`))
                .finally(() => knex.destroy())
            })
    })


