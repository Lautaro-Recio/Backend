const express = require("express")
const config = require("./config")

const app = express()

app.listen(config.port, config.host, ()=>{
    console.log(`servidor escuchando en http://${config.host}:${config.port}`)
})