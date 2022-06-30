/* import admin from "firebase-admin"
import config from '../config'

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL:"http://ecommerce-5cf74.firebaseio.com"

})  
const db = admin.firestore();

admin.initializeApp({})
class contenedorFirebase{
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async findAll(){
        try {
            const produc = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                produc.push({ id: doc.id, ...doc.data() })
            })
            return produc
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
        
    }
    findOne(id){
        
    }

    create(data){
           
            
    }

    update(id,data){

    }
    
    delete(id){
        
    }
}


export default contenedorFirebase */