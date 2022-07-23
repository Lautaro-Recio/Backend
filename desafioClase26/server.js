const express = require("express")
const session = require("express-session")

const passport = require("passport")
const {Strategy: LocalStrategy} =require("passport-local")

const mongoose =require ('mongoose')
mongoose.connect('mongodb://localhost:27017/users')

const userSchema = require("./mongo/esquemas/userSchema")
const app = express()

const bcrypt =require ("bcrypt")

app.use(session({
    secret:"qwerty",
    resave:true,
    saveUninitialized:true
}))



const PORT=8080
app.set("views","./views")
app.set("view engine","ejs")
app.use(express.static("./public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* PASSPORT */

//inicializamos session y los utilizamos
app.use(passport.initialize())
app.use(passport.session())

passport.use("login",new LocalStrategy((username,password,done) => {
    
    return userSchema.findOne({username})
    .then(email =>{
        console.log("LOGIn")
        if(!email){
            return done(err,false, {message: "El email es incorrecto"})
        }
        //comparacion de contraseñas
        const isValidPassword = () => {
            return bcrypt.compareSync(mail.password,password)
        }
        if (!isValidPassword()){
            return done(null, false,{message:"Contraseña incorrecta"})
        }

        return done(null,email)
    })
    .catch(err =>done(err))
}))

passport.use("signup",new LocalStrategy((username,password,done) => {
    return userSchema.findOne({username})
    .then(email =>{
        console.log("Registrado")
        if(email){
            return done(err,false, {message: "El email ya esta en uso"})
        }

        //Contraseña encriptada
        const criptPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)

        const usuario = {email,password:criptPassword}
        
        const crear = async () =>{
            let doc = await userSchema.insertMany(usuario);
            return doc
        }
        crear()    
    })
        .catch(err =>done(err))
}))

passport.serializeUser((user,done)=>{
    //ya logramos la autenticacion y le digo a passport cual va a ser el identicador de mi usuario
    console.log("serializeUser")
   
    return done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    //paso contrario de serializeUser
    console.log("deserializeUser")
    userSchema.findById(id)
        .then(user=>{
            done(null,user)
        })
})

app.use(session({   
    secret:"qwerty",
    resave:true,
    saveUninitialized:true
    })
)

//Login

app.get("/login",(req,res)=>{
    res.render("index")
})

app.post("/login",passport.authenticate("login",{
    successRedirect: "/login",
    failureRedirect: "/signup",
 
}))
 


//Registro
app.get("/signup",(req,res)=>{
    res.render("indexSingUp")
})



app.post("/signup",passport.authenticate("signup",{
   successRedirect: "/login",
   failureRedirect: "/login",

}))


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