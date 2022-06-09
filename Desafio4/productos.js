const express = require("express")
const fs= require("fs")
const app = express()

const {Router}=require("express")
const productosRouter = Router()
let products=[]
exports
const path="http://localhost:8080/"
productosRouter.use("/form",express.static(__dirname+`/public`))

const admin = true

productosRouter.get("",(req,res)=>{
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

productosRouter.get("/:id",(req,res)=>{
    console.log(req)

    if (admin===true){
        console.log("Consulta en products")
        const productsFiltradosPorId= products.find(producto => producto.id == req.params.id )
        
        if (!productsFiltradosPorId){
            res.status(404).json({
                error:"producto no encontrado",
            })
        }
        return res.json(productsFiltradosPorId)
    
    }else{
        return res.json({error:-1,descripcion:`la ruta ${path}/api/productos/${req.params.id} `,metodo:"Get no esta autorizada"})

    }

})
productosRouter.post("",(req,res)=>{
    if (admin===true){

        console.log("Request recibido")
        const dia = new Date()
        const newProducts = req.body
        console.log(newProducts)
        newProducts.id = products.length + 1
        newProducts.timeStamp = `${dia.getHours()}:${dia.getMinutes()}. ${dia.getDay()}/${dia.getMonth()}/${dia.getFullYear()}`

        products.push(newProducts)

        const escribir= ()=>{
            try{
                fs.writeFile("./datos/productos.json", (JSON.stringify(products)))
            }catch{
                console.log("error")
                
            }
        }
        escribir()
        app.post("/api/carrito",(req,res)=>{ newProducts})

        return res.status(201).json(newProducts)
    }else{
        return res.json({error:-1,descripcion:`la ruta ${path}/api/productos/`,metodo:"Post no esta autorizada"})

    }

})

//Actualizacion
productosRouter.put("/:id",(req,res)=>{
    if (admin===true){

        const productsIndex= products.findIndex(producto => producto.id == req.params.id )
        console.log("Actualizacion hecha")
        if (productsIndex=== -1){
            res.status(404).json({
                error:"Producto no encontrado",
            })
        }
        const dia = new Date()

        products[productsIndex].nombre =req.body.nombre
        products[productsIndex].precio =req.body.precio
        products[productsIndex].descripcion =req.body.descripcion
        products[productsIndex].foto =req.body.foto
        products[productsIndex].timeStamp =`${dia.getHours()}:${dia.getMinutes()}. ${dia.getDay()}/${dia.getMonth()}/${dia.getFullYear()}`
        products[productsIndex].codigo =req.body.codigo
        products[productsIndex].stock =req.body.stock




        return res.json(productsIndex)
    }else{
        return res.json({error:-1,descripcion:`la ruta ${path}/api/productos/${req.params.id} `,metodo:"Put no esta autorizada"})

    }

})
productosRouter.delete("/:id",(req,res)=>{
    if (admin===true){
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
        
        
    }else{
        return res.json({error:-1,descripcion:`la ruta ${path}/api/productos/${req.params.id} `,metodo:"Delete no esta autorizada"})

    }
})

module.exports ={ 
    router:productosRouter,
    products:products,
}