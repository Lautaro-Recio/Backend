import  express from "express"
import db from "./mongo/db.js"
import usersPath from "./mongo/users.js"
import fs from "fs"
import { createServer } from 'http';
import { Server } from 'socket.io';
import { normalize, schema, } from 'normalizr'
import faker from "faker" 

const app = express()
const httpServer = new createServer(app)
const io = new Server(httpServer)

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
                    console.log("Lectura de users")
                    let usersMongo = await usersPath.find({}).lean()
                    console.log("usersMongo")

                   /*  // Definimos un esquema de autor
                    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
                   
                    // Definimos un esquema de mensaje
                    const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })
                   
                    // Definimos un esquema de posts
                    const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
                   
                    const normalizarMensajes = normalize(usersMongo, schemaMensajes)
                    
                    */

                    /* 
                        Entidad principal user
                        dentro esta la entidad author
                        dentro esta la entidad text
                    */
                        const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });
                        const mensajesSchema= new schema.Entity("mensajes", { author: schemaAuthor }, { idAttribute: 'id' })
                        
                        const normalizedMsjs= new schema.Entity("usersMensajes",{ mensajes: [mensajesSchema] }, { idAttribute: 'id' })
                   
                        const normalizarMensajes = normalize(usersMongo, normalizedMsjs)
                        



                   
                    
                    console.log("normalizado")                
                    console.log(normalizarMensajes)
                    
                    
                    
                    
                    
                    
                    io.sockets.emit("mensajesFirebase",normalizarMensajes)

                    return normalizarMensajes
                } catch (error) {
                    console.log(`Error al listar todo: ${error}`)
                }
            }
            buscar()
            socket.on("mensajes",(dataMsj)=>{
                console.log(`El mensaje es ${dataMsj}`)
                let usuario=data
                usuario.text=dataMsj
                
                io.sockets.emit("users",usuario)
                async function escribir(){
                    try {
                        console.log("creado")
                        let doc = await usersPath.create(usuario);
                        return doc
    
                    } catch (error) {
                        console.log(`Error al guardar ${error}`)
                    }
                }
                escribir()

                    
            })
        
        })
    
    
        
      
    
        
    })
    
    

