const express = require("express")
const app = express()
const PORT = 8080
const apiRouter= require("./api.js")

const { engine } =require("express-handlebars")
app.engine("hbs",engine({
    //Extension de los archivos
    extname:"hbs",
    //El Layout por default
    defaultLayout:`${__dirname}/views/index.hbs`,
    //Layout que van a cambiar o a hiterar cosas
    layoutsDir:`${__dirname}/views/layout`,
    //Vistas que siempre van a ser las mismas
    partialsDir:`${__dirname}/views/partials`
}))
app.set("views","./views")
app.set("view engine","hbs")
//FALTA LA VISTA EN PUG Y HACER BIEN LOS LINKS ENTRE PAGS EN HANDLEBARS
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("",(req,res)=>{
    const bienvenidos="Bienvenidos al formulario de carga de productos"
    const data= {
        bienvenidos,
    }
    return res.render("layout/form.hbs",data)
})

app.use('/api/productos',apiRouter)

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))