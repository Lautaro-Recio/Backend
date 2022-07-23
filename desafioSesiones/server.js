const express = require("express")
const session = require("express-session")
const app = express()

const PORT=8080
app.set("views","./views")
app.set("view engine","ejs")
app.use(express.static("./public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/login",(req,res)=>{
    if (req.session.usuario){
        const user = {
            user:req.session.usuario,   
        }
        return res.render( "prodsContainer",user)

    }
    res.render("index")
})



app.post("/login",(req,res)=>{
    const { usuario} = req.body
    
    if (req.session.usuario){
        const user = {
            user:req.session.usuario,   
        }
        return res.render( "prodsContainer",user)
    }
    if (!usuario){
        return res.redirect("/login")

    }
        req.session.usuario = usuario
        return res.render( "prodsContainer",{user:usuario})


})



app.get("/logout" ,async (req, res)=>{
const name = req.session.usuario 

    return req.session.destroy(err=>{

        return res.render("adios",{user:name})
    })

})


//Esto siempre al fondo

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))