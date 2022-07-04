let productosDao
let carritosDao


    switch (process.env.PERS) {
        case 'archivo':

        const { default: ProductosDaoArchivo } = await import('../daos/productos/productosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('../daos/carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':

        const { default: ProductosDaoFirebase } = await import('../daos/productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('../daos/carritos/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
        
    case 'mariadb':
        const { default: ProductosDaoMariaDb } = await import('../daos/productos/ProductosDaoMySql.js')
        const { default: CarritosDaoMariaDb } = await import('../daos/carritos/CarritosDaoMySql.js')

        productosDao = new ProductosDaoMariaDb()
        carritosDao = new CarritosDaoMariaDb()
        break
    default:
        const { default: CarritosDaoMongoDb } = await import('../daos/carritos/carritosDaoMongoDB.js')
        const { default: ProductosDaoMongoDb } = await import('../daos/productos/ProductosDaoMongo.js')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        break
        
    }
    

export default { productosDao, carritosDao }