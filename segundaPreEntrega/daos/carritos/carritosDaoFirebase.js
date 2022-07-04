import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"
import configCarritos from "../../configCarritos.js"
class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super(configCarritos)
    }

    async create(carrito = { productos: [] }) {
        console.log("SOY EL CARRITO CON PRODUCTOS")
        console.log(carrito)
        return super.create(carrito)
    }
}

export default CarritosDaoFirebase