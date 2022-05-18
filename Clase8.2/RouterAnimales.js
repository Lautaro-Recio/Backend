const {Router}=require("express")
const mascotasRouter=Router()
const mascotas=[]

mascotasRouter.get("",(req,res)=>{
    return res.json(mascotas)

})

mascotasRouter.post("",(req,res)=>{

    console.log("Request recibido")

    const newMascota = req.body
    console.log(newMascota)
    newMascota.id = mascotas.length + 1

    mascotas.push(newMascota)

    return res.status(201).json(newMascota)

})

module.exports = mascotasRouter