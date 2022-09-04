const express = require("express");
require('dotenv').config()


const app = express();
const { routerProductos, routerCarrito } = require("./src/router/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("/index.html")
})

app.use("/api/productos", routerProductos);

app.use("/api/carrito", routerCarrito)


const PORT = process.env.PORT|| 8080 ;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} `);
})
 