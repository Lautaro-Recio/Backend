const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const private_key ="PRIVATEKEYJWT"

const generateToken = user =>{
    const token = jwt.sign({id:user.id,username:user.username},private_key,{expiresIn:"24h"})
}

const validacion = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if (!authHeader){
        return res.status(401).json({
            error:"necesitas un JWT"
        })
    }
    //cuando se envia un Json Web Token se envia junto con el la palabra 
    //bearear entonces utilizamos split para separar el token de la palabra y
    //referenciamos al token que estaria en la primera posicion
    const token = authHeader.split(" ")[1]

    jwt.verify(token,private_key,(err,payload) =>{
        if(err){

            return res.status(401).json({
                error:"Necesitar enviar un JWT valido"
            })
        }


        req.user=payload
    })
}

const users = []

app.post("/signup",(req,res)=>{
    const {username, password, email} = req.body

    const userExists = users.some(user => user.username ===username)
    
    if(userExists){
        return res.status(400).json({
            error:"El nombre de usuario ya esta en uso"
        })
    }

    const user = {
        id:users.length+1,
        username,
        password,
        email,
    }
    
    users.push(user)

    const accesToken = generateToken(user)


    return res.status(201).json({
        user,
        accesToken
    })
})

const PORT =8080


app.listen(PORT, ()=> console.log(`servidor escuchando en el puerto ${PORT}`))