const {Router }= require("express")
const contenedorMysql = require("../contenedores/contenedorMysql.js")
const ContenedorMemoria = require("../contenedores/contenedorMemoria.js")
const ContenedorMongoDb = require("../contenedores/contenedorMongoDB")
const ContenedorFirebase = require("../contenedores/contenedorFirebase")

const productosDaoArchivo = require("../daos/productos/productosDaoArchivo")


const productsRouter = Router()

//FIREBASE
/* const contenedorFirebase = new ContenedorFirebase() */




//Se guarda en una memoria local, al actualizar la pagina esta info se pierde
const contenedorMemoria = new ContenedorMemoria()

//MONGO DB
const userModel = require('../esquemas/models/productos')
const db = require("../db")
const contenedorMongo = new ContenedorMongoDb(db,userModel)

//Se escribe en un archivo json
const ProductosDao = new productosDaoArchivo("./productsEnArchivo.json")





/* -----------------------------------------------------------
    QUEDA POR HACER LA PERSISTENCIA EN FIREBASE
    LOS DAOS
    Y EL ROUTER DE LOS CARTS


--------------------------------------------------------------*/



//Se escribe en una base de datos mariaDb
const options = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'dbProductos'
    },
}
const ProductosDaoMysql = new contenedorMysql(options,"productos")

const ContenedorMysql = new contenedorMysql(options,"productos")

productsRouter.get("/",(req,res)=>{
    return products = contenedorMongo.findAll()
        .then(products =>{
            console.log(products)

            return res.json(products)
        })
})


productsRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    return productos = contenedorMongo.findOne(id)
        .then(productos =>{
            console.log("Routeer")

            console.log(productos)

            return res.json(productos)
        })
})

productsRouter.post("/",(req,res)=>{
    const newProd = req.body
    console.log(newProd)
    return contenedorMongo.create(newProd)
        .then(newProduct=>{
            console.log(newProduct)

            return res.status(201).json(newProduct)

        })
        

})


productsRouter.put("/:id",(req,res)=>{
    const updateProd = req.body
    const id = parseInt(req.params.id)
    const product= updateProd
    return contenedorMongo.update(id,product)
        .then(updateProds=>{
            console.log(updateProds)

            return res.status(201).json(updateProds)

        })

})


productsRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    return contenedorMongo.delete(id)
        .then(updateProds=>{
            console.log(updateProds)

            return res.status(201).json(updateProds)

        })

})
module.exports= productsRouter