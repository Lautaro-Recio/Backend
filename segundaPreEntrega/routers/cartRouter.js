import {Router }from "express"
const cartRouter = Router()
import carritosDao from '../daos/index.js'


cartRouter.get("/",async (req,res)=>{
    const carts = await carritosDao.carritosDao.findAll()
        .then(cart =>{
            console.log(cart)

            return res.json(cart)
        })
})


cartRouter.get("/:id/productos",async (req,res)=>{
    const id = parseInt(req.params.id)
    const carts = await carritosDao.carritosDao.findOne(id)
        .then(cart =>{
            console.log("Routeer")

            console.log(cart)

            return res.json(cart)
        })
})

cartRouter.post("/",(req,res)=>{
    const newCart = req.body
    console.log(newCart)
    return carritosDao.carritosDao.create(newCart)
        .then(newCartCreated=>{
            console.log(newCartCreated)

            return res.status(201).json(newCartCreated)

        })
        

})
cartRouter.post("/:id/productos",(req,res)=>{
    const id = parseInt(req.params.id)
    return carritosDao.carritosDao.insert(id)
        .then(updateCart=>{
            console.log(updateCart)

            return res.status(201).json(updateCart)

        })
})


cartRouter.put("/:id",(req,res)=>{
    const updateCart = req.body
    const id = parseInt(req.params.id)
    const product= updateCart
    return carritosDao.carritosDao.update(id,product)
        .then(updateCart=>{
            console.log(updateCart)

            return res.status(201).json(updateCart)

        })

})

cartRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    return carritosDao.carritosDao.delete(id)
        .then(updateProds=>{
            console.log(updateProds)

            return res.status(201).json(updateProds)

        })

})

cartRouter.delete("/:id/productos/:idProd",(req,res)=>{
    const id = parseInt(req.params.id)
    const idProd = parseInt(req.params.idProd)

    return carritosDao.carritosDao.deleteProd(id,idProd)
        .then(updateCart=>{
            console.log(updateCart)

            return res.status(201).json(updateCart)

        })

})

export default cartRouter