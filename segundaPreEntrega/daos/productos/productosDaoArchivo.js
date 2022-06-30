const contenedorArchivo = require("../../contenedores/contenedorArchivo");

class prodsDaoArhivo extends contenedorArchivo{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super("./productsEnArchivo.json")
    }
}
module.exports = prodsDaoArhivo