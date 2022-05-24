const express = require("express")
const app = express()



app.set("views","./views")
//Aca estoy utilizando pug
//app.set("view engine","pug")
//Aca estoy utilizando ejs
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/datos",(req,res)=>{
    const min=req.query.min
    const max=req.query.max
    const nivel=req.query.nivel
    const color="blue"

    const titulo=req.query.titulo
    const data = {
        //Variables para poner en el hbs
        titulo,
        nivel,
        min,
        max,
        color,
    }
    //Aca le indico a esta ruta que se le envie el archivo main dentro de la carpeta layout
    return res.render("hello",data)
})
const PORT = 8080


const alumnos=[
    {nombre:"Lautaro",apellido:"Recio"},
    {nombre:"Milagros",apellido:"Griguol"},
    {nombre:"Diego",apellido:"Recio"},
    {nombre:"Giuliano",apellido:"Recio"},
    {nombre:"Veronica",apellido:"Castro"},
]
app.get("/",(req,res)=>{
    const bienvenidos="Bienvenidos a EJS"
    const titulo="Alumnos comision 30965"
    const data= {
        bienvenidos
    }

    return res.render("index",data)

})
app.get("/alumnos",(req,res)=>{
    const titulo="Alumnos comision 30965"
    const data= {
        titulo,
        alumnos,
    }

    return res.render("alumnos",data)

})
app.post("/ejs")
const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))