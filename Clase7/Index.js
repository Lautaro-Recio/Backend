const express = require("express")
const app = express()

//Las lineas 5 y 6 se utilizan para poder recibir informacion en formato JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080
let mensajes=[
    {id:1,user:"Yo",mensaje:"Hola como estas?"},
    {id:2,user:"X",mensaje:"Todo bien"},
    {id:3,user:"Yo",mensaje:"Me alegro"},
]

app.get("/mensajes",(req,res)=>{
    console.log("Consulta en mensajes")
    //Con req.query.x podes tomar la consulta desde la url ejemplo: /mensajes?user=Lauti (El ? sirve para hacer la consulta)
    //Podes mandar con .json en formato JSON
    if(!req.query.user){
        res.json(mensajes)
    }else{
         //Filtro de mensajes con el parametro consultado por url
        const mensajesFiltrados= mensajes.filter(mensaje => mensaje.user === req.query.user )
        res.json(mensajesFiltrados)

    }
   
})
app.get("/sumar/:num1/:num2",(req,res)=>{
    let num1 = Number(req.params.num1)
    let num2 = Number(req.params.num2)
    return res.json(num1+num2)

})
//Actualizacion
app.put("/mensajes/:id",(req,res)=>{
    const mensajesindex= mensajes.findIndex(mensaje => mensaje.id == req.params.id )
    
    if (mensajesindex=== -1){
        res.status(404).json({
            error:"Mensaje no encontrado",
        })
    }
    mensajes[mensajesindex].mensaje =req.body.mensaje

    return res.json(mensajesindex)

})
app.delete("/mensajes/:id",(req,res)=>{
    const mensajesindex= mensajes.findIndex(mensaje => mensaje.id == req.params.id )
    console.log(req.params.id)
    if (mensajesindex=== -1){
        res.status(404).json({
            error:"Mensaje no encontrado",
        })
    }
    mensajes = mensajes.filter(mensaje => mensaje.id != req.params.id )

    //se retorna el status 204 porque no tiene contenido la peticion
    return res.status(204).json({})

})
//Haciendo peticiones desde postman
//Estamos posteando un nuevo mensaje para el arreglo de "Mensajes", por eso el metodo pushn
app.post("/mensajes",(req,res)=>{
    //se le hace un post a la ruta mensajes, para que cuando se postee el nuevo mensaje se muestre conjunto al resto

    console.log("Request recibido")

    const newMessage = req.body
    console.log(newMessage)
    newMessage.id = mensajes.length + 1

    mensajes.push(newMessage)

    return res.status(201).json(newMessage)

})

app.get("/mensajes/:id",(req,res)=>{
    console.log("Consulta en mensajes")
    //Con req.params.x podes tomar la consulta del parametro desde la url ejemplo: /mensajes/1 (equivale al id 1)
    console.log(req.params)
    const mensajesFiltradosPorId= mensajes.find(mensaje => mensaje.id == req.params.id )
    
    if (!mensajesFiltradosPorId){
        res.status(404).json({
            error:"Mensaje no encontrado",
        })
    }
    //Filtro de mensajes con el parametro consultado por url el numero del id me lo trae como string por eso dos ==
    return res.json(mensajesFiltradosPorId)

})





const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))