const { options } = require('./db/mysql')
// const { options } = require('./db/sqlite')
const knex = require('knex')(options)

knex
  .from('products') //tomamos datos desde products
  .select('*')  //* es igual a todos los datos
  .then(products => { //con esto obtenemos un JSON y lo manejamos
    console.log(products)
    console.log(`Total de productos: ${products.length}`)
    products.forEach(product => {
      console.log(`Producto: ${product.name} con precio de $${product.price} y stock de ${product.stock}`)
    })
  })    //aca devolvemos los productos a partir de una promise, por eso el then
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())