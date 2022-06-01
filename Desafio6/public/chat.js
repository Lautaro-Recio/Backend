//Coneccion para el main
const socket=io()

const prod = document.getElementById("prod")
const price = document.getElementById("price")
const img = document.getElementById("img")
const tBody = document.getElementById("tBody")
const prodsEnviados = document.getElementById("prodsEnviados")
const mensaje = document.getElementById("mensaje")
const mensajeEnviado = document.getElementById("mensajeEnviado")
const mensajesContainer = document.getElementById("mensajesContainer")
const mail = document.getElementById("mail")
const mailEnviado = document.getElementById("mailEnviado")
const span = document.getElementById("span")



mailEnviado.addEventListener("click",()=>{
    socket.emit("entrando al chat",mail.value)
    
})
mensajeEnviado.addEventListener("click",()=>{
    socket.emit("mensajes",mensaje.value)
})

socket.on("products",(data)=>{
    console.log("PRODS")
    console.log(data)
    let i = 1
    const productos = data
    .map(producto=>{
        if(data.length===0){
            const userPlantilla = `
                <h3>No hay productos</h3>
            `
            return userPlantilla

        }else{
            const userPlantilla = `
            <tr>
                <th>${i++}</th>
                <th>${producto.prod}</th>
                <td>${producto.price}</td>
                <td><img style="height:50px; width:50px" src="${producto.img}" alt="${producto.prod}"></td>
            </tr>
            `
            return userPlantilla

        }
    })
    .join("")
    tBody.innerHTML = productos
})
socket.on("users",(data)=>{
    console.log(data)
    
    const usuarios = data
    .map(user=>{
        const mensjsPlantilla = `
        <li class="clearfix">
            <div class="message other-message float-left"> 
                <p style="color:green;font-family:italic"> <span class="message-data-time" style="font-weigth:bolder;color:blue"> ${user.gmail} </span>
                <span class="message-data-time" style="color:brown">${user.date}:</span><span class="message-data-time" style="color:green;font-family:"italic"> ${user.mensaje} </span></p> 
            </div>
        </li>
        `  
        return mensjsPlantilla

    })
    .join("")
    mensajesContainer.innerHTML = usuarios
})


prodsEnviados.addEventListener("click",()=>{
  
    socket.emit("prodsEnviados",{
        prod: prod.value,
        price: price.value,
        img: img.value
    })
    prod.value=""
    price.value=""
    img.value=""
})