console.log(`
Directorio actual ${process.cwd()} 
ID del proceso (siempre cambia): ${process.pid}
version de node ${process.version}
ubicacion del ejecutbale${process.execPath}
sistemA OPERATIVO ${process.plataform}
uso de la memoria ${JSON.stringify(process.memoryUsage(),null,2)}
`)


/* Process.on recibe un evento a cumpli enel proceso del codigo
en este caso beforeExit es "Antes de salir" o que termine de correr el codigo
este cumplira un funcion en la penultima orden que se le envie al proceso
*/
process.on("beforeExit", code =>{
    console.log("proceso a punto de terminar",code)
})


//marca cuando se termina el proceso
process.on("exit", code =>{
    console.log("proceso finalizado",code)
})
//Controlador de exepciones globales,  
process.on("uncaughtException", err =>{
    console.log("Excepcion cachada ",err.message)
})
//como conseguir la version de node para verificar
const version = Number(process.version.substring(0,3).replace("v"," "))
if(version > 18){
    console.log("necesitas actualizar")
    process.exit() //termina el proceso aunque se este cargando algo

}
console.log(version)

for (let i = 0; i<=10; i++){
    console.log(i)
    /* if (i===9){
        console.log("ADios")
        process.exit()
    } */
}

setTimeout(()=>{
    console.log("log con delay de 500ms")
},500)

nonExistsFunction()