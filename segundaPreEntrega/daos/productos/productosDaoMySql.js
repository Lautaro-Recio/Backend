const contenedorMysql = require("../../contenedores/contenedorMysql.js");




class prodsDaoMySql extends contenedorMysql{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super(options,"productos")
    }
}
module.exports = prodsDaoMySql