const express = require("express")
const app = express()
//requiero los archivos en los que estan alojados mis dos routers
const mascotasRouter= require("./RouterAnimales.js")
const personasRouter= require("./RouterPersonas.js")

//Las lineas 5 y 6 se utilizan para poder recibir informacion en formato JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080


/* Aca esta disponible el formulario dentro de la carpeta "/public"
que en cada formulario (el de mascotas y personas) enviar una peticion
post a la direccion guardada en la accion (action="/personas") de cada form
y cada imput con el con el atributo name y su nombre justamente puesto, guarda
los datos en un array y los envia */
app.use("/",express.static(__dirname+"/public"))



//a la aplicacion les doy esos dos routers y les doy un "Prefijo de rutas"
app.use('/mascotas',mascotasRouter)
app.use('/personas',personasRouter)

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))