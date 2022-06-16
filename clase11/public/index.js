
//CLIENTE
const socket = io()

//mensaje al servidor desde cliente
socket.on("mi mensaje",(data)=>{
    alert(data)
   // socket.emit("notification","mensaje recibido exitosamente")
    //El primer parametro sirve para identificar el mensaje en este caso enviado desde el servidor al cliente
})

    //El parametro sirve para identificar el mensaje en este caso enviado desde el servidor al cliente

socket.on("Nuevo cliente",(data)=>{
    alert(data)
})

//Aca accedo al input via getElementById
const input = document.querySelector("input#mensaje")
const boton = document.getElementById("send")
boton.addEventListener("click", ()=>{
    socket.emit("MensajeAServidor",input.value)
})

//capturo el input y le agrego un addeventListener con evento Input que capta siempre que se escriba algo
/* input.addEventListener("input", ()=>{
    socket.emit("MensajeAServidor",input.value)
}) */
//Recibe mensajes
socket.on("mensajeAClientes",data=>{
    const mensaje = `<br>socketId: ${data.socketId}=> mensaje: ${data.mensaje}`
    console.log(data)
    document.getElementById("p").innerHTML +=mensaje

})


//Recibe array de mensajes
socket.on("mensajes",data=>{
    const mensajs = data
    //pasamos un arreglo a string 
    .map(message =>`socketId:${message.socketId}=> mensajes:${message.mensaje} `)
    .join("<br>")
    document.getElementById("p").innerHTML = mensajs

})
