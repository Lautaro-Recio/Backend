const express = require("express")
const app = express()
//A personasRouter le doy la "Funcionalidad" de router
const productosRouter= require("./productos.js").router
const carritoRouter= require("./carrito.js")

//Las lineas 5 y 6 se utilizan para poder recibir informacion en formato JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080



//Esto siempre al fondo
app.use('/api/productos',productosRouter)
app.use('/api/carrito',carritoRouter)

app.use(function(req,res){
    res.status(404).json({error:-2,descripcion:`la ruta a la que ingreso no existe `})
})

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))