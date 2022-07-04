import contenedorMongoDB from "../../contenedores/contenedorMongoDB.js"

//MONGO DB
import userModel  from'../../esquemas/models/productos.js'
import db  from"../../db.js"

class prodsDaoMongoDB extends contenedorMongoDB{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super(db,userModel)
    }
}
export default prodsDaoMongoDB