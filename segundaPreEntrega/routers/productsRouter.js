import Router  from "express"

const productsRouter = Router()

import productosDao from '../daos/index.js'

const admin = false

function rutaNoDisponible(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function admins(req, res, next) {
    if (!admin) {
        res.json(rutaNoDisponible())
    }else {
        next()
    }
}

productsRouter.get("/",async (req,res)=>{
    const products = await productosDao.productosDao.findAll()
        .then(productos =>{
            console.log(productos)

            return res.json(productos)
        })
})


productsRouter.get("/:id",async (req,res)=>{
    const id = parseInt(req.params.id)
    const productos = await productosDao.productosDao.findOne(id)
        .then(productos =>{
            console.log("Routeer")

            console.log(productos)

            return res.json(productos)
        })
})

productsRouter.post("/",admins,async(req,res)=>{
    const newProd = req.body
    console.log(newProd)
    return productosDao.productosDao.create(newProd)
        .then(newProduct=>{
            console.log(newProduct)

            return res.status(201).json(newProduct)

        })
        

})


productsRouter.put("/:id",admins,async(req,res)=>{
    const updateProd = req.body
    const id = parseInt(req.params.id)
    const product= updateProd
    return productosDao.productosDao.update(id,product)
        .then(updateProds=>{
            console.log(updateProds)

            return res.status(201).json(updateProds)

        })

})


productsRouter.delete("/:id",admins,async(req,res)=>{
    const id = parseInt(req.params.id)
    return productosDao.productosDao.delete(id)
        .then(updateProds=>{
            console.log(updateProds)

            return res.status(201).json(updateProds)

        })

})
export default productsRouter