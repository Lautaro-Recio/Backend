const dotenv = require("dotenv")
/* Haciendo esto dotenv va a inyectar como variables de entorno todas
las variables que se le hayan especificado en el archivo .env */
dotenv.config()

console.log(process.env)