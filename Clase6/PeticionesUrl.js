const http = require("http")

const servidor = http.createServer((peticion,respuesta)=>{
    switch(peticion.url){
        case `/prod`:
            return respuesta.end(`Estas en la seccion ${peticion.url}`)
        case `/casa`:
            return respuesta.end(`Estas en la seccion ${peticion.url}`)
        case `/hola`:
            return respuesta.end(`Estas en la seccion ${peticion.url}`)
        default:
            respuesta.end(`No se puede encontrar`)
    }   
})

const PORT = 8080
const servidorConectado= servidor.listen(PORT ,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})