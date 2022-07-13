// models/user.js
import mongoose from 'mongoose'


const usersSchema = new mongoose.Schema({
    author:{
        id: { type: String, required: true, max: 100 },
        edad: { type: Number, required: true },
        nombre: { type: String, required: true, max: 500 },
        apellido: { type: String, required: true, max: 500 },
        alias: { type: String, required: true, max: 500 },
        avatar: { type: String, required: true, max: 500 },
    },   
    text:{ type: String, required: true, max: 500 }

})


   //Model("producto",....)
   //Es la coneccion a la tabla
export default mongoose.model('mensajes', usersSchema)
