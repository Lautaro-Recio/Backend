// models/user.js
import mongoose from 'mongoose'


const usersSchema = new mongoose.Schema({
    entities:{type:Array,required:true},
},   

)


   //Model("producto",....)
   //Es la coneccion a la tabla
export default mongoose.model('mensajes', usersSchema)
