const express = require("express")
const app = express()
//A personasRouter le doy la "Funcionalidad" de router
const apiRouter= require("./api.js")

//Las lineas 5 y 6 se utilizan para poder recibir informacion en formato JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080



//Esto siempre al fondo
app.use('/api/productos',apiRouter)



const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))