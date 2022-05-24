const express = require("express")
const app = express()
const apiRouter= require("./api.js")

const PORT=8080
const prods=[]

app.get("/",(req,res)=>{
    const bienvenidos="Bienvenidos al formulario de carga de productos"
    const data= {
        bienvenidos
    }
    res.render("index",data)
})

app.set("views","./views")
//Aca estoy utilizando pug
//app.set("view engine","pug")
//Aca estoy utilizando ejs
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))



//Esto siempre al fondo
app.use('/api/productos',apiRouter)

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))