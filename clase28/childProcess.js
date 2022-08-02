const { exec, execFile, spawn} = require('child_process')
/* Requerimos el comando exec del módulo child_process. */

/* En la ejecución de la función exec, el primer argumento
es el comando dir. Este, enumera todos los archivos y 
carpetas del directorio actual en formato largo, con un tamaño total de archivo en unidades legibles 
por el ser humano en la parte superior del resultado. */

/* El segundo argumento es el callback, el cual a su vez tiene 3 parámetros.
Si el comando no se ejecuta, se imprime el motivo en error.
Si el comando se ejecutó correctamente, cualquier dato que escriba al flujo
de resultado estándar se captura en stdout y 
cualquier dato que escriba al flujo error estándar se captura en stderr. */
exec('dir', (error, stdout, stderr) => {
 if (error) {
   console.error(`error: ${error.message}`)
   return
 }

 if (stderr) {
   console.error(`stderr: ${stderr}`)
 }

 console.log(`stdout: \n${stdout}`)
})

//En vez de ser todos los archivos es la ruta del archivo que se le envia por parametros
/* execFile(`${__dirname}/dir`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`)
      return
    }
   
    if (stderr) {
      console.error(`stderr: ${stderr}`)
    }
   
    console.log(`stdout: \n${stdout}`)
   })
    */


/* La función spawn() ejecuta un comando en un proceso. 
Esta función devuelve datos a través de la API del flujo. 
Por tanto, para obtener el resultado del proceso secundario, 
debemos escuchar los eventos del flujo.
la transmision de datos se hace en partes entonces es capaz
de manejar mucha data */


/* Requerimos el método spawn del módulo child_process.
El primer argumento de spawn es el comando find.
El segundo argumento es un array que contiene los argumentos 
para el comando ejecutado.
Le estamos indicando a Node que ejecute el comando find con 
el argumento ‘.’, lo que hace que el comando encuentre todos
los activos en el directorio actual. */

/* const child = spawn('find', ['.'])

child.stdout.on("data", data =>{
    console.log(`stdout${data}`)

})

child.stderr.on("data", err =>{
    console.log(`stdout${err}`)

})
 */
