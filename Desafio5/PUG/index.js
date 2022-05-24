const express = require("express")
const app = express()
const apiRouter= require("./api.js")

const PORT=8080

app.set("views","./views")
app.set("view engine","pug")

app.get("/",(req,res)=>{
    const bienvenidos="Bienvenidos al formulario de carga de productos"
    const data= {
        bienvenidos
    }
    res.render("form",data)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos',apiRouter)


const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))