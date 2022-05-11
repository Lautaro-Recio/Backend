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
                console.log(data)
                let dataEntrante = data
                return dataEntrante
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
        randomProduct(){
            
            setTimeout(() => {
                try{
                    const randomINdex=  Math.floor(Math.random() * (this.products.length)) ;
                    return this.products[randomINdex]
                }catch{
                    console.log("Error")
                }
            }, 1000);
            
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


module.exports= contenedor
