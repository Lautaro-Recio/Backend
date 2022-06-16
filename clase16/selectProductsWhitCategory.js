
const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex
  .from('products')
  .select('products.*', 'categories.name as category_name') //prevenimos la sobreescritura de datos con "as" renombramos una columna para que no se sobreescriban los datoss
  .join('categories', { 'products.category_id': 'categories.id' }) //aca une la tabla de categorias.id con la de productos.categor_id
  .then(products => {
    console.log(`Total de productos: ${products.length}`)
    products.forEach(product => {
      console.log(`Producto: ${product.name} con precio de $${product.price} y stock de ${product.stock}`)
    })
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())