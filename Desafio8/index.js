const { options } = require('./db/ecommerce')
//const { options } = require('./db/sqlite')

const knex = require('knex')(options)


const fs= require("fs")

class contenedor{
    constructor(objeto,nombreTabla){
        this.objeto=objeto
        this.nombreTabla=nombreTabla
        this.products=[]
    };
    createTable(){
        this.objeto
        .schema
        .then(() => {
          console.log(`Tabla de ${this.nombreTabla} creada`)
          return knex.schema.createTable(this.nombreTabla, table => {
            table.increments('id')
            table.string('title', 30)
            table.float('price')
            table.string('thumbnail',50)

          })
        })
        .then(() => {
          console.log('Tabla de productos creada')
        })
        .catch(err => console.log(`Error: ${err.message}`))
          .finally(() => knex.destroy())
    }

    //FALTA ESCRIBIR TODOS LOS PRODS EN EL ARCHIVO
    save(title,price,thumbnail){
        const products = {title,price,thumbnail}
              knex(this.nombreTabla)
                .insert(products) //insertamos el arreglo products a la tabla products
                .then(() => console.log(`Productos insertados`))
                .catch(err => console.log(`Error: ${err.message}`))
                .finally(() => knex.destroy())
   
    }
    getAll(){
        
        this.objeto
            .from(this.nombreTabla) //tomamos datos desde products
            .select('*')  //* es igual a todos los datos
            .then(products => { //con esto obtenemos un JSON y lo manejamos
                console.log(products)
                console.log(`Total de productos: ${products.length}`)
                products.forEach(product => {
                console.log(`Producto: ${product.title} con precio de $${product.price} y su ruta de imagen es ${product.thumbnail}`)
                })
            })    //aca devolvemos los productos a partir de una promise, por eso el then
            .catch(err => console.log(`Error: ${err.message}`))
            .finally(() => knex.destroy())
      
    }

    getById(num){
        this.objeto
            .from(this.nombreTabla) //tomamos datos desde products
            .select('*')
            .where('id', '=', num) 
            .then(products => {
                console.log(`Total de productos: ${products.length}`)
                products.forEach(product => {
                    console.log(`Producto: ${product.title} con precio de $${product.price} y su ruta de imagen es ${product.thumbnail}`)
                })
            })
            .catch(err => console.log(`Error: ${err.message}`))
            .finally(() => knex.destroy())
    }
    deleteById(numDeleted){
        this.objeto
        .from(this.nombreTabla) //tomamos datos desde products
        .where('id', numDeleted) //toma los productos con id = 1
        .del() // y aca da la orden de que sea borrado
        .then(products => {
          console.log(`Productos eliminados: ${products}`)
        })
        .catch(err => console.log(`Error: ${err.message}`))
        .finally(() => knex.destroy())
       
    }
        randomProduct(){
            

            this.objeto
            .from(this.nombreTabla) //tomamos datos desde products
            .select('*')
            .then(products => {
                console.log(`Total de productos: ${products.length}`)
                const randomINdex=  Math.floor(Math.random() * (products.length)) ;
                console.log(products[randomINdex])
               
            })
            .catch(err => console.log(`Error: ${err.message}`))
            .finally(() => knex.destroy())
        }
        
        
        deleteAll(){
            this.objeto
            .from(this.nombreTabla) //tomamos datos desde products
            .del() // y aca da la orden de que sea borrado
            .then(products => {
              console.log(`Productos eliminados: ${products}`)
            })
            .catch(err => console.log(`Error: ${err.message}`))
            .finally(() => knex.destroy())
            
        }

}


const contenedor1=new contenedor(knex,"productosDesafio8")
//contenedor1.createTable()
//contenedor1.save("manaos",300,"manaos.img")
//contenedor1.getAll()
//contenedor1.getById(1)
//contenedor1.deleteById(3)
//contenedor1.randomProduct()
//contenedor1.deleteAll()



/* -----------------------------------------------------------
 
    -DESAFIO PARTE 1 TERMINADO 
    -POR HACER
        -MODIFICAR EL DESAFIO ENTREGABLE DE LA CLASE 11
        -DESARROLLAR UN SCRIPT PARA CREAR TABLAS


 -----------------------------------------------------------*/