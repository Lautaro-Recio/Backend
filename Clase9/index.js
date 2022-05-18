const express = require("express")
const app = express()

const PORT = 8080


app.use("/static",express.static(__dirname+`/public`))
app.get("",(req,res)=>res.json({status:"ok"}))

const serverLevantado =app.listen(PORT,()=>{
    console.log(`Servidor escuucha al puerto  ${PORT}`)
})
app.on("error",error=> console.log(`Error desconocido ${error}`))