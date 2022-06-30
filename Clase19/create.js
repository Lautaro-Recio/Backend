// create.js
const db = require('./db')
const userModel = require('./models/user')

const data = {
 name: 'Juan',
 lastname: 'Perez',
 email: 'juanperez@mail.com',
 username: 'juanperez',
 password: 'qwerty'
}
//Aqui cargamos la data que queremos guardar 
const user = new userModel(data)
//Requerimos el esquema 

// y aca cachamos y lo guardamos en la base de datos
db          //_ hace que ignoremos un parametro.save hace que se guarde la info
 .then(_ => user.save())
 .then(document => console.log('User saved', document))
 .catch(err => console.error(`Error: ${err.message}`))
 .finally(_ => process.exit())