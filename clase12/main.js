const express= require("express")
const {Server:HttpServer} =require("http")
const {Server:IOServer} =require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.set("views", "./views")
app.set("view engine","ejs")

let users=[]
let mensajes=[]

app.get("/login",(req,res)=> res.render ("login"))


app.post("/login",(req,res)=> {
    //Tomamos el nombre de usuario
    const {username} = req.body

    //redireccionar a esta pagina con el parametro del username
    return res.redirect(`/chat?username=${username}`)
})


app.get("/chat",(req,res)=>res.render("chat"))




const PORT = 8080
httpServer.listen(PORT,()=>console.log(`servidor escuchando en puerto ${PORT}`))

io.on("connection",socket => {
    console.log(`Nuevo usuario conectado${socket.id}` )
    
    //Cachando el username
    socket.on("entrando al chat",(data)=>{
        //Tomamos el nombre de usuario

        const username = data.username

        users.push({
            id:socket.id,
            username:username,
            avatarId:Math.ceil(Math.random()*6)
        })
        socket.emit("notificacion",`Bienvenido ${username}`)
        
        //Envia el mensaje a todos excepto al que envio el mensaje
        socket.broadcast.emit("notificacion",` ${username} Se unio al chat`)
        io.sockets.emit("usuarios",users)

    })
    socket.on("mensajeEnviado",(data)=>{
        const hora = new Date()
        //Encontrar al usuario que envio el mensaje comparando el id del usuario con el id del socket
        const user = users.find(user => user.id===socket.id)

        const mensaje ={
            text: data,
            time: `${hora.getHours()}:${hora.getMinutes()}`,
            user
        }
        mensajes.push(mensaje)
        
        socket.emit("miMensaje",mensaje)
        socket.broadcast.emit("mensajes",mensaje)

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