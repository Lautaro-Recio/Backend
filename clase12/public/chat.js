//Coneccion para el main
const socket=io()

const usersContainer = document.getElementById("usersContainer")
const span = document.getElementById("notificacion")
const mensaje = document.getElementById("mensaje")
const mensajeEnviado = document.getElementById("mensajeEnviado")
const mensajesContainer = document.getElementById("mensajesContainer")


//Asi recibo el query param y lo parseo
const {username} = Qs.parse(window.location.search,{
    ignoreQueryPrefix:true
})
console.log(username)

socket.emit("entrando al chat", {username})


socket.on("notificacion",(data)=>{
    span.innerHTML=data
})

socket.on("usuarios",(data)=>{
    console.log(data)
    const users = data
    .map(user=>{
        const userPlantilla = `
        <li class="clearfix">
            <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" alt="avatar">
            <div class="about">
                <div class="name">${user.username}</div>
                <div class="status"> <i class="fa fa-circle online"></i> online </div>                                            
            </div>
        </li>
        `
        return userPlantilla
    })
    .join("")
    usersContainer.innerHTML = users
})
socket.on("miMensaje",(data)=>{
    console.log(data)
    const mensjs = data

        const mensjsPlantilla = `
        <li class="clearfix">
            <div class="message-data text-right float-right">
                <span class="message-data-time">${data.time}, ${data.user.username} </span>
            </div>
            <div class="message other-message float-right"> 
                ${data.text}
            </div>
        </li>
        `    
    mensajesContainer.innerHTML += mensjsPlantilla
})
socket.on("mensajes",(data)=>{
    console.log(data)
    const mensjs = data

        const mensjsPlantilla = `
        <li class="clearfix">
            <div class="message-data text-left">
                <span class="message-data-time">${data.time}, ${data.user.username} </span>
            </div>
            <div class="message other-message float-left"> 
                ${data.text} 
            </div>
        </li>
        `    
    mensajesContainer.innerHTML += mensjsPlantilla
})

mensajeEnviado.addEventListener("click",()=>{
    socket.emit("mensajeEnviado",mensaje.value)
    mensaje.value=""
})