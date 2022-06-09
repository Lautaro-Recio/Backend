export default class Persona{
    private name: string
    private lastName:string

    constructor(name:string,lastName:string){
        this.name = name
        this.lastName = lastName
    }
    getfullName():string{
        return `${this.name} ${this.lastName}`
    }
}