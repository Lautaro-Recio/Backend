import admin from "firebase-admin"

import {readFile} from "fs/promises"

const serviceAccount = JSON.parse(
    await readFile(
        new URL("./key.json",import.meta.url)
    )
)

console.log(serviceAccount)