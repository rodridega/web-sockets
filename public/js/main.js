const socket = io.connect();

/* socket.on("mensajesRecibidos", (mensajes) => {
  document.querySelector("p").innerText = mensajes;
}); */

const render = (data) => {
  const html = data
    .map((elem, index) => {
      return `<div>
        <strong>${elem.author}</strong>
        <em>${elem.text} </em>
        </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
};

const addMessage = (e) =>{
    e.preventDefault()
    console.log("Hola");
    const mensaje = {
        author: document.getElementById("username").value,
        text: document.getElementById("text").value
    }

    socket.emit("new-message", mensaje);
    return false
}
socket.on("new-chat-message", messages => {

    render(messages);
  });