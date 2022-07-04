import ContenedorMongoDB from "../../contenedores/contenedorMongoDB.js"


import carritos  from'../../esquemas/models/carritos.js'

import db  from"../../db.js"

class carritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(db,carritos)    
    }

    async create(carrito = { productos: [] }) {
        console.log("SOY EL CARRITO CON PRODUCTOS")
        console.log(carrito)
        return super.create(carrito)
    }
}

export default carritosDaoMongoDB