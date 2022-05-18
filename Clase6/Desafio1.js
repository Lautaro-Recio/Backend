const http = require("http")

const hora = (new Date()).getHours()
const servidor = http.createServer((peticion,respuesta)=>{
    if((hora >= 6)&&(hora <= 12)){
        respuesta.end(`Buen dia`)
    }else if((hora >= 13)&&(hora <= 19)){
        respuesta.end(`Buenas tardes`)
    }else{
        respuesta.end(`Buenas noches cancion `)
    }
})

const PORT = 8080
const servidorConectado= servidor.listen(PORT ,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})