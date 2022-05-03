const fs= require("fs")

class contenedor{
    constructor(nombre){
        this.nombre=nombre
        this.products=[]
    }
    //FALTA ESCRIBIR TODOS LOS PRODS EN EL ARCHIVO
    save(titleA,priceA,thumbnailA){
        let idNumber=this.products.length+1
        this.products.push({id:idNumber,title:titleA,price:priceA,thumbnail:thumbnailA})
        console.log("El id asignado al producto es: "+idNumber)
        const string = JSON.stringify(this.products)
        const escribir= (resolve,reject)=>{
            try{
                fs.promises.writeFile(this.nombre, string)
            }catch{
                console.log("error")

            }
        }
        escribir()
    }
    getAll(){
        
        fs.readFile(this.nombre,"utf-8",(err,data)=>{
            console.log("------------------------------SE PIDE TODO EL ARRAY-------------------------------")
            if(err){
                console.log(err)
            }else{
                console.log(JSON.parse(data))
            }
        })
      
    }
    getById(num){
        console.log(` ------------------------------SE PIDE EL ELEMENTO ${num}-------------------------------` )
        console.log(this.products.find(element=>element.id === num))
    }
    deleteById(numDeleted){
        setTimeout(()=>{
            try{    
                console.log(` ------------------------------SE BORRO EL ELEMENTO ${numDeleted}-------------------------------` )
                this.products.splice(numDeleted-1,1)
                console.log(` ------------------------------Pido el array de vuelta para mostrar que se borro el objeto 2 en este caso-------------------------------` )

                fs.promises.writeFile(this.nombre, JSON.stringify( this.products))
                this.getAll()

            }catch{
                console.log("Error")

            }
        },2000)
       
        }
        
        deleteAll(){
            setTimeout(() => {
                try{
                    console.log("------------------------------SE BORRO EL ARRAY DE PRODUCTOS-------------------------------")
                    this.products=[]
                    fs.promises.writeFile(this.nombre,  " " , err=>{
                        console.log(err)
                    })
                }catch{
                    console.log("Error")
                }
            }, 5000);
            
        }
}


const contenedor1=new contenedor("./productos.txt")
console.log("------------------------------ INICIO -------------------------------")

contenedor1.save("Coca Cola",200,"https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg")
contenedor1.save("Sprite",150,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.casa-segal.com%2Fproducto%2Fsprite-2-25lts%2F&psig=AOvVaw1IydIYFj-dasJYdIISfuso&ust=1651544581631000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPDWwJPhv_cCFQAAAAAdAAAAABAF")
contenedor1.save("Fanta",140,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.disco.com.ar%2Fgaseosa-fanta-naranja-2-25-l%2Fp&psig=AOvVaw2tDjzED8gci4junUSFuhNO&ust=1651544622358000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCODT66bhv_cCFQAAAAAdAAAAABAD")
contenedor1.save("Pritty",170,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.disco.com.ar%2Fgaseosa-fanta-naranja-2-25-l%2Fp&psig=AOvVaw2tDjzED8gci4junUSFuhNO&ust=1651544622358000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCODT66bhv_cCFQAAAAAdAAAAABAD")
contenedor1.getById(1)

contenedor1.deleteById(2)
contenedor1.getAll()
contenedor1.deleteAll()
