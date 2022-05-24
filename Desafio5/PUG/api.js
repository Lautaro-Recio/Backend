
const {Router}=require("express")
const apiRouter = Router()

let products=[]

const bienvenidos="Productos en dataBase"

apiRouter.get("",(req,res)=>{

    console.log(products)
//FALTA ITERAR LOS CAMPOS DEL ARRAY
    const data= {
        bienvenidos,
        products,

    }
    return res.render("prods",data)
})
apiRouter.get("",(req,res)=>{
    console.log("Consulta en mensajes")
    if(!req.query.user){
        res.json(products)
    }else{
        const productsFiltrados= products.filter(producto => producto.user === req.query.user )
        res.json(productsFiltrados)

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
apiRouter.post("",(req,res)=>{
    console.log("Request recibido")

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
    }
    return res.render("form",data)

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