import  express from "express"
import db from "./mongo/db.js"
import usersPath from "./mongo/users.js"

import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express()
const httpServer = new createServer(app)
const io = new Server(httpServer)
import faker from "faker" 
import normalizr from "normalizr" 

faker.locale = "es"
const{commerce,image} = faker
console.log(faker.commerce.productName())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine","ejs")

const productos =[]
for(let i =0; i<5;i++ ){
    productos.push({product:faker.commerce.productName(),price:faker.commerce.price(),foto:faker.image.fashion()})
}

app.get("/api/productos-test",(req,res)=>{
    const data= {
        productos
    }

    res.render("index",data)
})






app.get("/",(req,res)=>{
  
    res.render("chatContainer")
})

const PORT = 8080
httpServer.listen(PORT,()=>console.log(`servidor escuchando en puerto ${PORT}`))


io.on("connection",socket => {
    
    socket.on("entrando al chat",(data)=>{
        async function buscar(){
            try {
                let usersMongo = await usersPath.find({}, { __v: 0 }).lean()
                io.sockets.emit("mensajesFirebase",usersMongo)
            } catch (error) {
                console.log(`Error al listar todo`)
            }
        }
        buscar()
        socket.on("mensajes",(dataMsj)=>{
            console.log(`El mensaje es ${dataMsj}`)
            let usuario=data
            usuario.text=dataMsj
            const mensajesSchema= new normalizr.schema.Entity("mensajes")
            const autorSchema= new normalizr.schema.Entity("autores")

            const schemaPrincipal= {
                author:autorSchema,
                mensajes:mensajesSchema
            }
            const normalizedMsjs= normalizr.normalize(usuario,schemaPrincipal)
            console.log(normalizedMsjs)
            async function escribir(){
                try {
                    let doc = await usersPath.create(normalizedMsjs.entities);
                   
                    return doc
                    } catch (error) {
                        console.log(`Error al guardar ${error}`)
                    }
            }
            
            io.sockets.emit("users",escribir(),dataMsj)
        })
    
    })


    
  
    socket.on("disconnect",(reason)=>{
        //Encontrar al usuario que envio el mensaje comparando el id del usuario con el id del socket
        const user = users.find(user => user.id===socket.id)


        if (user){
            socket.broadcast.emit("notificacion", `${user.username} se ha ido del chat`)
        }
        io.sockets.emit("usuarios",users)

    })
    
})


