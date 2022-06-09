
//Podemos crear nuestros propios "tipos" como son number o string
//en este caso creamos el "tipo" TimeObject
type TimeObject = {
    fyh:string,
    timestamp:number
}
//Y aca le decimos que retorna este tipo de dato
export const getTime = ():TimeObject =>{
    return{
        fyh:new Date().toLocaleDateString(),
        timestamp: Date.now()
    }
}