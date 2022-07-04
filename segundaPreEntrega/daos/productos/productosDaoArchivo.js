import contenedorArchivo from "../../contenedores/contenedorArchivo.js"

class prodsDaoArhivo extends contenedorArchivo{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super("./productsEnArchivo.json")
    }
}
export default prodsDaoArhivo