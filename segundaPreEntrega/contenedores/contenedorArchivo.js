import fs from "fs"

class contenedorArchivo{
    constructor(name){
        this.name = name
    }

    findAll(){
        return fs.promises.readFile( this.name,"utf-8")
            .then(itemString => JSON.parse(itemString))
    }
    findOne(id){

    }

    create(data){
        return this.findAll()
            .then(items=>{
                items.push(data)
                const datastring = JSON.stringify(items,null,2)
                return fs.promises.writeFile(this.name,datastring)
            })
        

    }

    update(id,data){

    }
    
    delete(id){
        
    }
}

export default contenedorArchivo