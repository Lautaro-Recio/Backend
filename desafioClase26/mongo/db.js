// db.js
const mongoose =require ('mongoose')

const URL = 'mongodb://localhost:27017/users'

const connection = mongoose.connect(URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true
})

module.exports = connection


//coneccion a base de datos