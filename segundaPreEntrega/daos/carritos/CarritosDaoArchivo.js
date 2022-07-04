import contenedorArchivo from "../../contenedores/contenedorArchivo.js"

class carritosDaoArchivo extends contenedorArchivo {

    constructor() {
        super('./cart.json')
    }

    async create(carrito = { productos: [] }) {
        console.log("SOY EL CARRITO CON PRODUCTOS")
        console.log(carrito)
        return super.create(carrito)
    }
}

export default carritosDaoArchivo