// db.js
import mongoose from 'mongoose'

const URL = 'mongodb://localhost:27017/users'

const connection = mongoose.connect(URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true
})

export default connection


//coneccion a base de datos