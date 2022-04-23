class usuario{
    constructor(nombre,apellido){
        this.nombre=nombre,
        this.apellido=apellido,
        this.libros = []
        this.mascotas =[]
    }
    getFullName(){
        return (`El nombre completo del usuario es ${this.nombre} ${this.apellido}` )
    }
    addMascota(mascotasSumadas){
        this.mascotas.push(mascotasSumadas)
    }
    addBook(titulo,nombreAutor){
        this.libros.push({nombre: titulo, autor: nombreAutor})
    }
    countMascotas(){
        return this.mascotas.length
    }
    getBooksName(){
        const nombresLibros=[]
        this.libros.forEach((librosDelUsuario)=>{
            nombresLibros.push(librosDelUsuario.nombre)
        })
        return nombresLibros
    }
}
const usuario1=new usuario("Lautaro","Recio")
usuario1.addMascota("Perro")
usuario1.addBook(" Harry Potter","J.K Rowling")
usuario1.addBook(" Harry Potter y la piedra filosofal","J.K Rowling")
console.log(usuario1.getFullName())
console.log(usuario1.getBooksName())
console.log(usuario1.countMascotas())

console.log("-------------------------------------------------------------")

const usuario2=new usuario("Pepito","Peres")
usuario2.addMascota("Perro")
usuario2.addMascota("Gato")
usuario2.addBook(" Los pepes de Pepelandia","Pepe Sanchez")
usuario2.addBook("Pepelandia y el secreto de Pepe","Pepe Sanchez")

console.log(usuario2.getFullName())
console.log(usuario2.getBooksName())
console.log(usuario2.countMascotas())