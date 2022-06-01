const express= require("express")
const fs= require("fs")
const {Server:HttpServer} =require("http")
const {Server:IOServer} =require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let products=[]

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine","ejs")

let users=[]

app.get("/",(req,res)=>{
    const bienvenidos="Bienvenidos al formulario de carga de productos"
    const data= {
        bienvenidos,
    }
    res.render("index",data)
})

const PORT = 8080
httpServer.listen(PORT,()=>console.log(`servidor escuchando en puerto ${PORT}`))

io.on("connection",socket => {
    
    socket.on("entrando al chat",(data)=>{
        io.sockets.emit("products",products)
        const gmail=data
        socket.on("mensajes",(data)=>{
            console.log(`El mensaje es ${data}`)
            const mensaje=data
            const now = new Date()
            users.push({
                id:socket.id,
                date:`${now.getDay()}/${now.getMonth()}/${now.getFullYear()}. ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}  `,
                gmail,
                mensaje
            })

            const string = JSON.stringify(users)
            const escribir= (resolve,reject)=>{
                try{
                    fs.promises.writeFile("./mensajes.txt", string)
                }catch{
                    console.log("error")

                }
            }

            escribir()
            io.sockets.emit("users",users)
        })
    
    })


    socket.on("prodsEnviados",(data)=>{
        //Encontrar al usuario que envio el mensaje comparando el id del usuario con el id del socket
        products.push(data)

        io.sockets.emit("products",products)

    })
  
    socket.on("disconnect",(reason)=>{
        //Encontrar al usuario que envio el mensaje comparando el id del usuario con el id del socket
        const user = users.find(user => user.id===socket.id)

        users= users.filter(user => user.id !== socket.id)

        if (user){
            socket.broadcast.emit("notificacion", `${user.username} se ha ido del chat`)
        }
        io.sockets.emit("usuarios",users)

    })
    
})