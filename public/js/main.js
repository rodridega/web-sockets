const socket = io.connect();

/* socket.on("mensajesRecibidos", (mensajes) => {
  document.querySelector("p").innerText = mensajes;
}); */
const btnGuardar = document.getElementById("guardar");

btnGuardar?.addEventListener("click", () => {
  const data = {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    urlImagen: document.getElementById("urlImagen").value,
  };

  document.getElementById("productsForm").reset();
  socket.emit("productoGuardado", data);
});

socket.on("todosLosProductos", (productos) => {
  document.getElementById("productos").innerHTML = "";
  productos.forEach((producto) => {
    document.getElementById("productos").innerHTML += `
    <tr> 
      <td>${producto.nombre}</td>
      <td>AR$ ${producto.precio}</td>
      <td><img src="${producto.urlImagen}" height="30px"></td>
    </tr>
    `;
  });
});

const btnChat = document.getElementById("enviar");

btnChat?.addEventListener("click", () => {
  const f = new Date();
  const fecha = `${f.getDate()}/${
    f.getMonth() + 1
  }/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
  const data = {
    nombre: document.getElementById("username").value,
    fecha: fecha,
    mensaje: document.getElementById("text").value,
  };
  document.getElementById("text").value = "";

  socket.emit("nuevoMensaje", data);
});

socket.on("todosLosMensajes", (chat) => {
  document.getElementById("messages").innerHTML = "";
  chat.forEach((mensaje) => {
    document.getElementById("messages").innerHTML += `
            <div style="width:100vw">
                <span class="fw-bold" style="color: blue;">${mensaje.nombre}</span>
                <span style="color: brown;">&nbsp[${mensaje.fecha}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.mensaje}</span>
            </div>
    `;
  });
});
