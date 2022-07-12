import admin from "firebase-admin" 

import {readFile} from "fs/promises"

const serviceAccount = JSON.parse(
    await readFile(
        new URL("./keyChat.json",import.meta.url)
    )
)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"http://chat-4dd72.firebaseio.com"

})  
const db = admin.firestore();

const collection = db.collection("mensajes")


export default collection