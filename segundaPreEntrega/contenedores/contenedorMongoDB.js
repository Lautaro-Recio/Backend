
/* 

    CONTENEDOR LISTO

*/

import productos from "../esquemas/models/productos.js"


class contenedorMongoDb{
    constructor(db,model){
        this.db = db
        this.model = model

    }

    async findAll(){
        try {
            let products = await this.model.find({}, { __v: 0 }).lean()
            return products
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
        
            
    }
    async findOne(id){
        const productos=[]
        try {
            const docs = await this.model.find({ idBusqueda: id }).lean()
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                docs.forEach(element => {
                    productos.push(element.productos)
                });
                return productos
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async create(data){
            //Aqui cargamos la data que queremos guardar 
            const docs = await this.model.find({})
            const id = docs.length+1
            const prod = {...data,idBusqueda:id}
            console.log(prod)
           try {
            let doc = await this.model.create(prod);
           
            return doc
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
            
    }

    async update(id,data){
        try {
            const updatedProd = await this.model.update({ idBusqueda: id}, {name:data.name,price:data.price,description:data.description})
            if (!updatedProd) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                return updatedProd
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }


    async insert(id){
        console.log(id)
        try{
            let carrito = await this.model.find({}, { __v: 0 }).lean()
            let product = await productos.find({ idBusqueda: id}, { __v: 0 }).lean()
            let prodACargar={}
            const length=carrito.length
            product.forEach(prod=>{
                prodACargar=prod
            })
        
            const prodCargado = await this.model.updateMany({ idBusqueda: length},{$push:{"productos":prodACargar}})

            return prodCargado
        } catch (error){
            throw new Error(`ERROR: ${error}`)

        }
        
    }
    async delete(id){
        try {
            const updatedProd = await this.model.deleteOne({ idBusqueda: id})
            if (!updatedProd) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
    async deleteProd(id,idProd){
        try {
            const prodBorrado = await this.model.updateMany({ idBusqueda: id},{$pull:{"productos":{"idBusqueda":idProd}}})
            if (!prodBorrado) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default contenedorMongoDb