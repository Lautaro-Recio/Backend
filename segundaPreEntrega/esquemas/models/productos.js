// models/user.js
import mongoose from 'mongoose'


const prodsSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    description: { type: String, required: true, max: 500 },
    price: { type: Number, required: true },
    idBusqueda: { type: Number, required: true },

   })


   //Model("producto",....)
   //Es la coneccion a la tabla
export default mongoose.model('productos', prodsSchema)


//Los documentos que ingresen van a tener este esquema de archivos