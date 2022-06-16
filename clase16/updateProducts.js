const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex
  .from('products')
  .where('stock', 21) //los productos con stock 21
  .update({ stock: 25 }) //actualiza el stock a 25
  .then(products => {
    console.log(`Productos actualizados: ${products}`)
  })    //retorna una promesa que manejamos
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())