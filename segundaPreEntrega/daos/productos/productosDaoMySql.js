import contenedorMysql from "../../contenedores/contenedorMysql.js"




class prodsDaoMySql extends contenedorMysql{
    constructor(){

        //con Super hacemos referencia al constructor del contenedor que requerimos
        super(options,"productos")
    }
}
export default prodsDaoMySql