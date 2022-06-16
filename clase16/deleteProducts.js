const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex
  .from('products')
  .where('category_id', 1) //toma los productos con category_id = 1
  .del() // y aca da la orden de que sea borrado
  .then(products => {
    console.log(`Productos eliminados: ${products}`)
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())