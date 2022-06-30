const {Router }= require("express")
const ContenedorArchivo = require("../contenedores/contenedorArchivo.js")
const cartRouter = Router()

const contenedorArchivoCart = new ContenedorArchivo("./cart.json")

cartRouter.get("/",(req,res)=>{
    return products = contenedorArchivoCart.findAll()
        .then(cart =>{
            console.log(cart)

            return res.json(cart)
        })
})


cartRouter.post("/",(req,res)=>{
    const newCart = req.body
    console.log(newCart)


    return contenedorArchivoCart.create(newCart)
        .then(cart=>{
            console.log(cart)

            return res.status(201).json(cart)

        })

})

module.exports=cartRouter