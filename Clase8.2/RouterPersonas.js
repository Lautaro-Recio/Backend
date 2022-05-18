//Requiero router 
const {Router}=require("express")
//A personasRouter le doy la "Funcionalidad" de router
const personasRouter = Router()

const personas=[]

//Pongo las rutas y los metodos http bajo este router que tiene asociado
//un prefijo en el archivo Router.js
personasRouter.get("",(req,res)=>{
    return res.json(personas)

})

personasRouter.post("",(req,res)=>{

    console.log("Request recibido")

    const newPersona = req.body
    console.log(newPersona)
    newPersona.id = personas.length + 1

    personas.push(newPersona)

    return res.status(201).json(newPersona)

})
//lo exporto para utilizarlo en el archivo de Router.js
module.exports=personasRouter