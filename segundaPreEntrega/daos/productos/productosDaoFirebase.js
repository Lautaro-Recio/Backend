import contenedorFirebase from "../../contenedores/contenedorFirebase.js"
import config from "../../config.js"

class prodsDaofirebase extends contenedorFirebase{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super(config)
    }
}
export default prodsDaofirebase