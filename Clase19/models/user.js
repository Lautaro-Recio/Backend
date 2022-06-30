// models/user.js
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
 name: { type: String, required: true, max: 100 },
 lastname: { type: String, required: true, max: 100 },
 email: { type: String, required: true, max: 100 },
 username: { type: String, required: true, max: 100 },
 password: { type: String, required: true, max: 100 }
})

module.exports = model('User', userSchema)


//Los documentos que ingresen van a tener este esquema de archivos