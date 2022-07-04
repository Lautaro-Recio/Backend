import express from "express"
import productsRouter  from "./routers/productsRouter.js"
import cartRouter  from "./routers/cartRouter.js"

const app = express()
const STORAGE = process.env.STORAGE|| 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080


app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)

app.listen(PORT,()=>console.log(`servidor escuchando en puerto ${PORT}`))
