//Coneccion para el main
const socket=io()


const mensaje = document.getElementById("mensaje")
const edad = document.getElementById("edad")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const alias = document.getElementById("alias")
const avatar = document.getElementById("avatar")

const mensajeEnviado = document.getElementById("mensajeEnviado")
const mensajesContainer = document.getElementById("mensajesContainer")
const mail = document.getElementById("mail")
const mailEnviado = document.getElementById("mailEnviado")
const span = document.getElementById("span")

mailEnviado.addEventListener("click",()=>{
    const usuario ={author:{id:mail.value,edad:edad.value,nombre:nombre.value,apellido:apellido.value,alias:alias.value,avatar:avatar.value},text:mensaje.value}
    console.log(usuario)

    socket.emit("entrando al chat",usuario)
    
})
mensajeEnviado.addEventListener("click",()=>{
    console.log("Enviasdo")
    socket.emit("mensajes",mensaje.value)
    
})

socket.on("mensajesFirebase",(dataMsj)=>{
    console.log(dataMsj)
    const msjs = [dataMsj]
    .map(user=>{
        const mensjsPlantilla = `
        <li class="clearfix">
            <div class="message other-message float-left"> 
                <p style="color:green;font-family:italic"> <span class="message-data-time" style="font-weigth:bolder;color:blue"> ${user.author} </span>
                <span class="message-data-time" style="color:green;font-family:"italic"> ${dataMsj} </span></p> 
            </div>
        </li>
        `  
        return mensjsPlantilla

    })
    .join("")
    mensajesContainer.innerHTML += msjs
})
socket.on("users",(data)=>{

    const usuarios = [data]
    .map(user=>{
        console.log(user)
        const mensjsPlantilla = `
        <li class="clearfix">
            <div class="message other-message float-left"> 
                <p style="color:green;font-family:italic"> <span class="message-data-time" style="font-weigth:bolder;color:blue"> ${user.author} </span>
                <span class="message-data-time" style="color:green;font-family:"italic"> ${user.text} </span></p> 
            </div>
        </li>
        `  
        return mensjsPlantilla

    })
    .join("")
    mensajesContainer.innerHTML += usuarios
})

