/*
    -----------------------------------------------------------------------
        Y REALIZAR LA PERSISTENCIA DE DATOS EN UN JSON CON WRITEFILES
    -----------------------------------------------------------------------
*/
const fs= require("fs")

const products= require("./productos.js")

console.log(products)

const express = require("express")

const {Router}=require("express")
const carritoRouter = Router()
let productosDesdeRouter= require("./productos.js").products

let carrito=[]

carritoRouter.use("/form",express.static(__dirname+`/public`))



carritoRouter.get("",(req,res)=>{
    console.log("Consulta en mensajes")
    //Con req.query.x podes tomar la consulta desde la url ejemplo: /mensajes?user=Lauti (El ? sirve para hacer la consulta)
    //Podes mandar con .json en formato JSON
    
    if(!req.query.user){
        res.json(carrito)
    }else{
         //Filtro de mensajes con el parametro consultado por url
        const productsFiltrados= carrito.filter(carro => carro.user === req.query.user )
        res.json(productsFiltrados)

    }
   
})
carritoRouter.get("/:id/productos",(req,res)=>{
    console.log("Request recibido")

    const carritoFiltradoPorID= carrito.find(carro => carro.id == req.params.id )

    if (!carritoFiltradoPorID){
        res.status(404).json({
            error:"producto no encontrado",
        })
    }
    return res.json(carritoFiltradoPorID.productos)
})
carritoRouter.post("",(req,res)=>{

    const newCart = {productos:[]}
    console.log(newCart)
    newCart.id = carrito.length + 1
    console.log(`El carrito n°${carrito.length + 1} a sido creado`)

    carrito.push(newCart)

    return res.status(201).json(newCart)

})

carritoRouter.post("/:id/productos/:id_prod",(req,res)=>{
    console.log("Request recibido")
    console.log("PRODS EN CARRITO" )
    console.log(productosDesdeRouter)
    const carritoFiltradoPorID= carrito.find(carro => carro.id == req.params.id )

    const productsFiltradoPorID= productosDesdeRouter.find(prod => prod.id == req.params.id_prod )

    if (!carritoFiltradoPorID){
        res.status(404).json({
            error:"Carrito para agregar prods no encontrado",
        })
    } else if(productsFiltradoPorID){

        const newProducts = req.body
        console.log(newProducts)
        newProducts.id= productosDesdeRouter.length + 1
        carritoFiltradoPorID.productos.push(newProducts)

        const escribir= (resolve,reject)=>{
            try{
                fs.writeFile("./datos/carritos.json", (JSON.stringify(carrito)))
            }catch{
                console.log("error")
                
            }
        }
        escribir()


        return res.status(201).json(newProducts)
    }

    

})

//Actualizacion
carritoRouter.put("/:id",(req,res)=>{
    const productsIndex= carrito.findIndex(producto => producto.id == req.params.id )
    
    if (productsIndex=== -1){
        res.status(404).json({
            error:"Producto no encontrado",
        })
    }
    carrito[productsIndex].title =req.body.title

    return res.json(productsIndex)

})


carritoRouter.delete("/:id",(req,res)=>{
    const carritoIndex= carrito.findIndex(carro => carro.id == req.params.id )
    console.log(req.params.id)
    if (carritoIndex=== -1){
        res.status(404).json({
            error:"carrito no encontrado",
        })
    }
    carrito = carrito.filter(carro => carro.id != req.params.id )

    //se retorna el status 204 porque no tiene contenido la peticion
    return res.status(204).json({})

})

carritoRouter.delete("/:id/productos/:id_prod",(req,res)=>{
    console.log("borrar")
    const carritoFiltradoPorID= carrito.find(carro => carro.id == req.params.id )
    const productsFiltradoPorID= carritoFiltradoPorID.productos.find(prod => prod.id == req.params.id_prod )

    console.log(req.params.id)
    console.log(productsFiltradoPorID)

    if (!carritoFiltradoPorID){
        
        res.status(404).json({
            error:"carrito no encontrado",
        })
        if (!productsFiltradoPorID){
        
            res.status(404).json({
                error:"producto no encontrado",
            })
        }
    }


    carritoFiltradoPorID.productos = carritoFiltradoPorID.productos.filter(prod => prod.id != req.params.id_prod )

    //se retorna el status 204 porque no tiene contenido la peticion
    return res.status(204).json({})

})



module.exports =carritoRouter