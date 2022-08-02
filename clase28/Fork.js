
/* La función fork() es una variación de spawn() 
que permite la comunicación entre el proceso principal 
y el secundario. 
Evita el bloqueo de la aplicacion*/

const http = require('http')

const calculo = () => {
 let sum = 0
 for(let i=0; i < 6e9; i++) {
   sum += i
 }

 return sum
}

let visitas = 0

const server = http.createServer()


server.on('request', (req, res) => {
 const { url } = req

 if (url === '/calcular') {
   const sum = calculo()
   return res.end(`La suma es ${sum}`)
 } else if (url === '/') {
   return res.end(`Numero de visitas: ${++visitas}`)
 }
})

const PORT = process.env.PORT || 8080

server.listen(PORT, err => {
 if (err) {
   throw new Error(`Error en servidor: ${err}`)
 }
 console.log(`Servidor escuchando en el puerto ${PORT}`)
})
