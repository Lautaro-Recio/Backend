import admin from "firebase-admin" 

import {readFile} from "fs/promises"

const serviceAccount = JSON.parse(
    await readFile(
        new URL("./key.json",import.meta.url)
    )
)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"http://ecommerce-5cf74.firebaseio.com"

})  
const db = admin.firestore();

const collection = db.collection("productos")


export default collection