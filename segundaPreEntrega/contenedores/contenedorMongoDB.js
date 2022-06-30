
/* 

    CONTENEDOR LISTO

*/


class contenedorMongoDb{
    constructor(db,model){
        this.db = db
        this.model = model

    }

    async findAll(){
        try {
            let docs = await this.model.find({}, { __v: 0 }).lean()
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
        
            
    }
    async findOne(id){
        console.log(id)
        try {
            const docs = await this.model.find({ idBusqueda: id }).lean()
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                return docs
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
}


module.exports = contenedorMongoDb