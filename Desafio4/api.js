const express = require("express")

const {Router}=require("express")
const apiRouter = Router()
let products=[]

apiRouter.use("/form",express.static(__dirname+`/public`))


apiRouter.get("",(req,res)=>{
    console.log("Consulta en mensajes")
    //Con req.query.x podes tomar la consulta desde la url ejemplo: /mensajes?user=Lauti (El ? sirve para hacer la consulta)
    //Podes mandar con .json en formato JSON
    if(!req.query.user){
        res.json(products)
    }else{
         //Filtro de mensajes con el parametro consultado por url
        const productsFiltrados= products.filter(producto => producto.user === req.query.user )
        res.json(productsFiltrados)

    }
   
})
apiRouter.get("/:id",(req,res)=>{
    console.log("Consulta en products")
    //Con req.params.x podes tomar la consulta del parametro desde la url ejemplo: /mensajes/1 (equivale al id 1)
    console.log(req.params)
    const productsFiltradosPorId= products.find(producto => producto.id == req.params.id )
    
    if (!productsFiltradosPorId){
        res.status(404).json({
            error:"producto no encontrado",
        })
    }
    //Filtro de mensajes con el parametro consultado por url el numero del id me lo trae como string por eso dos ==
    return res.json(productsFiltradosPorId)

})
//Haciendo peticiones desde postman
//Estamos posteando un nuevo mensaje para el arreglo de "Mensajes", por eso el metodo pushn
apiRouter.post("",(req,res)=>{
    //se le hace un post a la ruta mensajes, para que cuando se postee el nuevo mensaje se muestre conjunto al resto
    console.log("Request recibido")

    const newProducts = req.body
    console.log(newProducts)
    newProducts.id = products.length + 1

    products.push(newProducts)

    return res.status(201).json(newProducts)

})

//Actualizacion
apiRouter.put("/:id",(req,res)=>{
    const productsIndex= products.findIndex(producto => producto.id == req.params.id )
    
    if (productsIndex=== -1){
        res.status(404).json({
            error:"Producto no encontrado",
        })
    }
    products[productsIndex].title =req.body.title

    return res.json(productsIndex)

})
apiRouter.delete("/:id",(req,res)=>{
    const productsIndex= products.findIndex(producto => producto.id == req.params.id )
    console.log(req.params.id)
    if (productsIndex=== -1){
        res.status(404).json({
            error:"Producto no encontrado",
        })
    }
    products = products.filter(producto => producto.id != req.params.id )

    //se retorna el status 204 porque no tiene contenido la peticion
    return res.status(204).json({})

})


module.exports =apiRouter