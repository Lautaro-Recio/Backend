const express = require("express")
const app = express()

const {engine} =require("express-handlebars")
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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const alumnos=[
    {nombre:"Lautaro", edad:21},
    {nombre:"Milagros", edad:21},
    {nombre:"Pepe", edad:59},
    {nombre:"pepa", edad:45},
    {nombre:"Pig", edad:4},
]
app.get("",(req,res)=>{
    const data = {
        //Variables para poner en el hbs
        comision:30965,
        alumnos
    }
    //Aca le indico a esta ruta que se le envie el archivo main dentro de la carpeta layout
    return res.render("layout/main.hbs",data)
})
const PORT = 8080



const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))