const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex
  .from('products')
  .del() // y aca da la orden de que sea borrado
  .then(products => {
    console.log(`Productos eliminados: ${products}`)
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())