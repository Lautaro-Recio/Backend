const express = require("express")
const contenedor = require("../Desafio2/LautaroRecioDesafio2.js")
const app = express()
const PORT = 8080
const servidor = app.listen(PORT,()=>{
    console.log(`Servidor con express escuchando en el puertoa ${PORT}` )
})
const contenedor7=new contenedor("./productos.txt")
contenedor7.save("Coca cola",200, "imagen coca")
contenedor7.save("Sprite",180, "imagen Sprite")
contenedor7.save("Fanta",160, "Imagen Fanta")
contenedor7.save("Pepsi",190, "Imagen Pepsi")

app.get("/productos",  (req,res)=>{
    const prods =  contenedor7.products
    return res.send(prods)
})
app.get("/productoRandom",(req,res)=>{
    const randomINdex=  Math.floor(Math.random() * (contenedor7.products.length)) ;
    const prodRandom =  contenedor7.products[randomINdex]
    return res.send(prodRandom)
})

servidor.on("error",error => console.log(`Error en mensaje ${error}`))
