//const { options } = require('./db/ecommerce')
const { options } = require('./db/sqlite3')

const knex = require('knex')(options)

// SCRIPT CREACION DE TABLA DE MENSAJES
       knex
        .schema
        .then(() => {
          console.log(`Tabla de mensajes creada`)
          return knex.schema.createTable("mensajes", table => {
            table.increments('id')
            table.string('mensaje', 255)
            table.float('time')
            table.string('usuario',50)

          })
        })
        .then(() => {
          console.log('Tabla de productos creada')
        })
        .catch(err => console.log(`Error: ${err.message}`))
          .finally(() => knex.destroy())
