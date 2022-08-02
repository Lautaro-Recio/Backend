/* ParseArgs porque minimist devuelve un arreglo de los argumentos que se le envian por consola */
const parseArgs = require("minimist")

/* .slice elimina la cantidad de elementos que se le pasen por parametro
en este caso elimina los dos primeros 2 elementos que son la ubicacion de donde esta el archivo de node
y tambien el script y su ubicacion que estan corriendo */

const args = process.argv.slice(2)


/* parseArgs parsea los argumentos y los devuelve en forma de objeto por ejemplo
para ejecutar este script de manera de ejemplo estoy utilizando el siguiente codigo
 node .\minimist.js -n lauti -d, antes de parsearlo se me devolveria un objeto con cada uno
 de los argumento ocupando una posicion, en cambio con minimis si yo paso un argumento guionado y 
 despues un valor este se convierte en un objeto con llave valor por ejempo -n lauti pasaria a ser
 n:lauti y el -d pasaria a ser d:true porque al pasar un argumento guinado pero sin un diferenciador el valor
 predeterminado es true, si hay valores sueltos mete los argumento en un arreglo de _: [] 
*/
console.log(parseArgs(args))  

console.log(parseArgs(["-a" , "1" , "-b" , "perro", "200", "5"]))
console.log(parseArgs(["--a" , "1" , "-b" , "perro", "200", "5"]))  


/* minimist tiene unos objetos de configuracion predeterminados
    en los cuales esta "default" que es un objeto que se pasa con valores predete
*/
const options = {
    default:{
        name:"pepe",
    }
}

//Se pasa el arreglo de default como segundo parametro
console.log(parseArgs(["--a" , "1" , "-b" , "perro", "200", "5", "--name","carlos"],options))  


//se pueden sobreescribir los alias o las llaves de los valores y me los duplica
options.alias = {
    a:"campoA",
    b:"CampoB"
}

console.log(parseArgs(["--a" , "1" , "-b" , "perro", "200", "5", "--name","carlos"],options))  
