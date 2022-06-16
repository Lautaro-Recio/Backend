const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex
  .from('products')
  .select('name', 'category_id', 'stock') //Selecciona solo las categorisa name category_id y stock
  .orderBy('stock', 'asc') //ordena los productos de forma ascendente (asc medidos por el stock) y descendiente es igual a desc
  .then(products => {
    console.log(`Total de productos: ${products.length}`)
    products.forEach(product => {
      console.log(`Producto: ${product.name} con stock de ${product.stock}`)
    })
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())