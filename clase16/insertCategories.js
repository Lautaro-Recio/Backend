const { options } = require('./db/mysql')
//const { options } = require('./db/sqlite')
const knex = require('knex')(options)

const categories = [
  { name: 'Bebidas'},
  { name: 'Snack'},
  { name: 'Cereal'},
  { name: 'Dulces'},
  { name: 'Pan'},
]

knex('categories')
  .insert(categories) //Aca inserto las categorias ya creadas
  .then(() => console.log(`Categorías insertadas`))
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy()) //el metodo finally se ejecuta en algunas librerias y se ejecuta para finalizar todo
  //aca en .finalli (knex.destroy) rompemos la conexion con la bd