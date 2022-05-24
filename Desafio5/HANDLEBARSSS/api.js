const express = require("express")
const app = express()
const {Router}=require("express")
const apiRouter = Router()
let products=[]

const bienvenidos="Productos en dataBase"


apiRouter.post("",(req,res)=>{
    console.log("Request recibido")
    const bienvenidos="Bienvenidos al formulario de carga de productos"

    const producto= {
        bienvenidos,
        product:req.body.product,
        price:req.body.price,
        thumbnail:req.body.thumbnail,

    }
    console.log("Request recibido")

    console.log(producto)
    producto.id = products.length + 1
    products.push(producto)

    const data= {
        bienvenidos,
        products,
    }
    return res.render("layout/form.hbs",data)

})
apiRouter.get("",(req,res)=>{
     if(products.length===0){
        const titulo="No hay productos"
        const data= {
            titulo,
        }
        return res.render("layout/NoProds.hbs",data)

    }else{
        const titulo="Bienvenidos al formulario de carga de productos"

        const data= {
            titulo,
            products,
        }
        return res.render("layout/main.hbs",data)

    }
   
})
apiRouter.get("/:id",(req,res)=>{
    console.log("Consulta en products")
    console.log(req.params)
    const productsFiltradosPorId= products.find(producto => producto.id == req.params.id )
    
    if (!productsFiltradosPorId){
        res.status(404).json({
            error:"producto no encontrado",
        })
    }
    return res.json(productsFiltradosPorId)

})


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
    return res.status(204).json({})
})


module.exports =apiRouter