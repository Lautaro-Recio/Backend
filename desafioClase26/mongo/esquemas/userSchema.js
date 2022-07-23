// models/user.js
const mongoose =require ('mongoose')


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
   })


   //Model("producto",....)
   //Es la coneccion a la tabla
module.exports = mongoose.model('users', userSchema)


//Los documentos que ingresen van a tener este esquema de archivos