const express = require("express")
const session = require("express-session")
const app = express()

const PORT=8080
const usuarios=[]
app.set("views","./views")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(session({
    secret:"qwerty",
    resave:true,
    saveUninitialized:true
}))
app.get("/",(req,res)=>{
    const bienvenidos="Bienvenidos al formulario de carga de productos"
    const data= {
        bienvenidos
    }
    res.render("index",data)
})



app.post("/usuario",(req,res)=>{
    console.log(req.body)
    const { usuario, contraseña} = req.body
    const user = {
        user:usuario,
        password:contraseña,
        
    }
    usuarios.push(user)
    return res.json(user)
})

app.post("/login",(req,res)=>{
    const { usuario, contraseña} = req.body
    const user = user.find(user => user.user === usuario && user.password === contraseña )


    req.session.user={
        user: user.username,
        password: user.password
    }

    return res.json(user)
})





//Esto siempre al fondo

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))