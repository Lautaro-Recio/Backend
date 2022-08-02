/* Este es un objeto de configuracion en donde setemos valores por defecto
en caso de que no se envia variables 
SIEMPRE EN MAYUSCULAS LOS NOMBRE DE VARIABLES */
const config = {
    mode: process.env.NODE_ENV || "DEV",
    host: process.env.HOST || "localhost",
    port: process.env.PORT || "8080",

}

//para pasarle las variables de entorno por la consola de comandos hay que escrir
//NODE_ENV=prod HOST=127.0.0.1 PORT=3001 nodemon server.js
module.exports = config