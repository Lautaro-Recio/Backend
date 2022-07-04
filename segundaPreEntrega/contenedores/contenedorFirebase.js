
import collectionProducts from "../config.js"


class contenedorFirebase{
    constructor(nombreColeccion) {
        this.coleccion = nombreColeccion
    }

    async findAll(){
        try {
            const productos = []
            const productosDesdeFirebase = await this.coleccion.get();
            productosDesdeFirebase.forEach(doc => {
                productos.push({ id: doc.id, ...doc.data() })
            })
            return productos
        } catch (error) {
            throw new Error(`Error para mostrar el archivo: ${error}`)
        }
        
    }
    async findOne(id){
        try{
            const productos = []
            const productosDesdeFirebase = await this.coleccion.get();
            productosDesdeFirebase.forEach(doc => {
                productos.push({ id: doc.id, ...doc.data() })
            })
                //console.log(productos)
            if  ( !productos){
                throw new Error(`Error al listar por id: no se encontró`)
            } else { 
                                
                const productoEncontrado= productos.find(prod => prod.idBusqueda ===id)
                console.log(productoEncontrado)
                return {...productoEncontrado,id}
            }
        } catch (error){
            throw new Error(`ERROR: ${error}`)

        }
    }

    async create(data){
        const productosDesdeFirebase = await this.coleccion.get();
      
        const idBusqueda = productosDesdeFirebase.size + 1
            const prod = {...data,idBusqueda:idBusqueda,productos:[]}
        try {
            const newProd = await this.coleccion.add(prod);
            return { ...data, id: newProd.id }
        } catch (error) {
            throw new Error(`Error al crear produtco: ${error}`)
        }
            
    }

    async insert(id){
        console.log(id)
        try{
            const carritos = []
            const prods = []
            const productosDesdeFirebase = await collectionProducts.get();
            productosDesdeFirebase.forEach(doc => {
                prods.push({ id: doc.id, ...doc.data() })
            })
            const carritosDesdeFirebase = await this.coleccion.get();
            carritosDesdeFirebase.forEach(doc => {
                carritos.push({ id: doc.id, ...doc.data() })
            })

          

            if  ( !carritos){
                throw new Error(`Error al listar por id: no se encontró`)
            } else { 
                const productoEncontrado= await prods.find(prod => prod.idBusqueda ===id)
                const carritoEncontrado= await carritos.find(carrito => carrito.idBusqueda === carritos.length)
                const cartArray = [carritoEncontrado]
                console.log(cartArray)

                cartArray.push(productoEncontrado)
                console.log(cartArray)
                
                return {...productoEncontrado,id}
            }
        } catch (error){
            throw new Error(`ERROR: ${error}`)

        }
            
    }

    async update(id,data){
        try{
            const productos = []
            const productosDesdeFirebase = await this.coleccion.get();
            productosDesdeFirebase.forEach(doc => {
                productos.push({ id: doc.id, ...doc.data() })
            })
                //console.log(productos)
            if  ( !productos){
                throw new Error(`Error al listar por id: no se encontró`)
            } else { 
                                
                const productoEncontrado= productos.find(prod => prod.idBusqueda ===id)
                const actualizado = await this.coleccion.doc(productoEncontrado.id).update(data);

                console.log(productoEncontrado.id)
                return {...actualizado,id}
            }
        } catch (error){
            throw new Error(`ERROR: ${error}`)

        }
    }
    
    async delete(id){
        try{
            const productos = []
            const productosDesdeFirebase = await this.coleccion.get();
            productosDesdeFirebase.forEach(doc => {
                productos.push({ id: doc.id, ...doc.data() })
            })
                //console.log(productos)
            if  ( !productos){
                throw new Error(`Error al borrar el documento`)
            } else { 
                                
                const productoEncontrado= productos.find(prod => prod.idBusqueda ===id)
                const borrado = await this.coleccion.doc(productoEncontrado.id).delete();

                console.log(productoEncontrado.id)
                return {...borrado,id}
            }
        } catch (error){
            throw new Error(`ERROR: ${error}`)

        }
    }
}


export default contenedorFirebase