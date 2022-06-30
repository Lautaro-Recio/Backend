const express= require("express")
const productsRouter = require("./routers/productsRouter")
const cartRouter = require("./routers/cartRouter")

const app = express()
const STORAGE = process.env.STORAGE|| 3000;
console.log(STORAGE);
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080


app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)

app.listen(PORT,()=>console.log(`servidor escuchando en puerto ${PORT}`))
