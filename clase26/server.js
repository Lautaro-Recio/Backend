const express = require("express")
const session= require("express-session")

const redis = require("redis")

const passport = require("passport")
const { Strategy :FacebookStrategy } =require("passport-facebook")
const { Strategy :TwitterStrategy } =require("passport-twitter")


//creacion del cliente de redis
const redisClient= redis.createClient({
    legacyMode:true
})
//coneccion del cliente de redis

redisClient.connect()

const app = express()

/* Objeto de configuracion de session */
app.use(session({
    secret:"qwerty",
    resave:true,
    saveUninitialized:true
}))

//inicializamos session y los utilizamos
app.use(passport.initialize())
app.use(passport.session())


//Objeto de configuracion de FacebookStrategy
const faceboockStrategy = new FacebookStrategy({
    clientID:"5539620802769217",
    clientSecret:"0af3593af472c0b870d3475bfe21cd0c",
    callbackURL:"http://localhost:8080/auth/facebook/callback"
},(token,tokenSecret,profile,done)=>{     //funcion callback y el done sirve para ejecutar una funcion cuando autentiquemos el usuario o surja un error
    console.log({token,tokenSecret,profile})

    return(done(null,profile._json))
})


//Es lo mismo de facebook solo que los valores de twitter
const twitterStrategy = new TwitterStrategy({
    consumerKey:"",
    consumerSecret:"",
    callbackURL:"http://localhost:8080/auth/twitter/callback"
},(token,tokenSecret,profile,done)=>{     //funcion callback y el done sirve para ejecutar una funcion cuando autentiquemos el usuario o surja un error
    console.log({token,tokenSecret,profile})
    
    return(done(null,profile._json))
})

passport.use(faceboockStrategy)

passport.serializeUser((user,done)=>{
    //ya logramos la autenticacion y le digo a passport cual va a ser el identicador de mi usuario
    console.log("serializeUser")
    //seteamos en redis el user (todo se guarda en string en redis)
    redisClient.set(`user:${user.id}`,JSON.stringify(user),err=>{
        if(err){
            //si hay error se retorna false
            return done(err,false)
        }
        return done(null,user.id)

    })
    return done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    //paso contrario de serializeUser
    console.log("deserializeUser")
    redisClient.get(`user:${id}`,(err,value)=>{
        if(err){
            //si hay error se retorna false
            return done(err,false)
        }
        //se devuelve el value que se recupero del id de usuario
        return done(null,JSON.parse(value))

    })
})

//ruta para autenticar por facebook (no necesitamos controlador de req,res)
app.get("/auth/facebook",passport.authenticate("facebook"))


//ruta de callback
app.get("/auth/facebook/callback",passport.authenticate("facebook",{
    //url de redireccion 
    successRedirect:"/profile",
    failureRedirect:"/login"
}))


app.get("/profile",(req,res)=>{
    //aca tomo de la seccesRedirect los datos del usuario
    return res.json(req.user)
})

const PORT =8080


app.listen(PORT, ()=> console.log(`servidor escuchando en el puerto ${PORT}`))