const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const { router, productos } = require("./src/router/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// SOCKET
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [];

//HANDLEBARS
const { engine } = require("express-handlebars");
const readChat = require("./src/utils/readChat");
const saveProduct = require("./src/utils/saveProduct");
const insertChat = require("./src/utils/insertChat");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/Handlebars/views");


app.get("/", (req, res) => {
  res.render("datos");
});

app.use("/api/productos", router);

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.emit("todosLosProductos", productos);

 
 const chatINFO = await readChat();
  

socket.emit("todosLosMensajes", chatINFO);
   

socket.on("productoGuardado", async (data) => {
    await saveProduct(data);
    io.sockets.emit("todosLosProductos", productos);
  });
 

  socket.on("nuevoMensaje", async (data) => {
    await insertChat(data);
    io.sockets.emit("todosLosMensajes", await readChat());
  });
});

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
  console.log("Servidor http con web sockets listo")
})

connectedServer.on("error", error => console.log)

