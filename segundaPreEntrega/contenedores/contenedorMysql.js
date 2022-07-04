import knex from "knex"

class contenedorMysql{
    constructor (options,table){
        this.knex = knex(options)
        this.table = table

    }
    findAll(){
        return this.knex
            .from(this.table) //tomamos datos desde la tabla especificada
            .select('*')  //* es igual a todos los datos
            .then(items => { //con esto obtenemos un JSON y lo manejamos
                console.log(items)
                return items
            })  
    }
    findOne(id){
        return this.knex
        .from(this.table) //tomamos datos desde la tabla especificada
        .select('id',id)  //* es igual a todos los datos
        .then(items => { //con esto obtenemos un JSON y lo manejamos
            console.log(items)
            return items
        })  
    }

    create(data){
        return this.knex
            .insert(data) //insertamos el arreglo products a la tabla products
             
    }

    update(id,data){
        return this.knex
        .from(this.table) //tomamos datos desde la tabla especificada
        .where('id', id) //los productos con stock 21
        .update(data) //actualiza el stock a 25
        .then(products => {
            console.log(`Productos actualizados: ${products}`)
            return products

        })    //retorna una promesa que manejamos
    }
    
    delete(id){
        console.log(id)
        return this.knex
            .from(this.table) //tomamos datos desde la tabla especificada
            .where('id', id) //toma los productos con category_id = 1
            .del() // y aca da la orden de que sea borrado
            .then(products => {
                console.log(`Productos eliminados: ${products}`)
            })
    }


}
export default contenedorMysql