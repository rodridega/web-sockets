const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const { router, productos } = require("./src/router/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// SOCKET
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const messages = []

io.on("connection", socket => {
    console.log("Nuevo cliente conectado");

    socket.on("new-message", message => {
        console.log(message);

        messages.push(message)
        
        io.sockets.emit("new-chat-message", messages)
    })
})

//HANDLEBARS
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/Handlebars/views");


app.get("/", (req, res) => {
  res.render("datos");
});

app.get("/productos", (req, res) => {
  res.render("productos", { productos: productos });
});

app.use("/", router);

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
    console.log("Servidor http con web sockets listo");
})

connectedServer.on("error", error => console.log)
/* 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); */
