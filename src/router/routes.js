const { Router } = require("express");

const routerProductos = Router();
const routerCarrito = Router();

let productos = [];
let carritos = [];

let prodID = 1;
let carritoId = 1;

//Admin
const admin = false;

routerProductos.get("/", (req, res) => {
  res.json(productos);
});

routerProductos.get("/:id", (req, res) => {
  // GET '/api/productos/:id' -> devuelve un producto según su id.
  const { id } = req.params;
  const prod = productos.filter((prod) => prod.id == id);
  if (prod.length == 0)
    res.status(400).json({ error: "producto no encontrado" });
  res.send(prod);
});

routerProductos.post("/", (req, res) => {
  if (!admin) {
    return res
      .status(401)
      .send({ error: -1, descripcion: "ruta / metodo POST no autorizada" });
  }
  // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
  const { nombre, precio, urlImagen, descripcion, codigo, stock } = req.body;
  if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
    res.status(400).json({ error: "por favor ingrese todos los datos" });
  } else {
    const data = {
      nombre,
      precio,
      urlImagen,
      fechaCreacion: Date.now(),
      descripcion,
      id: prodID,
      codigo,
      stock,
    };

    productos.push(data);
    prodID += 1;
    res.send(data);
  }
});

routerProductos.put("/:id", (req, res) => {
  if (!admin) {
    return res
      .status(401)
      .send({ error: -1, descripcion: "ruta /:id metodo PUT no autorizada" });
  }
  // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
  const { id } = req.params;
  const { nombre, precio, urlImagen, descripcion, codigo, stock } = req.body;
  if (!nombre || !precio || !urlImagen) {
    res.status(400).json({ error: "producto no encontrado" });
  } else {
    let contador = 0;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        productos[i].nombre = nombre;
        productos[i].precio = precio;
        productos[i].urlImagen = urlImagen;
        productos[i].descripcion = descripcion;
        productos[i].codigo = codigo;
        productos[i].stock = stock;

        contador += 1;
        break;
      }
    }
    if (contador == 0)
      res.status(400).json({ error: "producto no encontrado" });
    res.json(productos);
  }
});

routerProductos.delete("/:id", (req, res) => {
  if (!admin) {
    return res
      .status(401)
      .send({ error: -1, descripcion: "ruta /:id metodo DELETE no autorizada" });
  }
  // DELETE '/api/productos/:id' -> elimina un producto según su id.
  const { id } = req.params;
  const largoActual = productos.length;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      productos.splice(i, 1);
    }
  }
  if (productos.length == largoActual)
    res.status(400).json({ error: "producto no encontrado" });
  res.send(productos);
});

routerCarrito.post("/", (req, res) => {
  const productosCarrito = productos;

  const carrito = {
    id: carritoId,
    fechaCreacion: Date.now(),
    productos: productosCarrito,
  };
  carritos.push(carrito);
  productos = [];
  prodID = 1;
  carritoId += 1;

  res.json(carrito.id);
});

routerCarrito.get("/", (req, res) => {
  res.json(carritos);
});

routerCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  const largoActual = carritos.length;
  for (let i = 0; i < carritos.length; i++) {
    if (carritos[i].id == id) {
      carritos.splice(i, 1);
    }
  }
  if (carritos.length == largoActual)
    res.status(400).json({ error: "producto no encontrado" });
  res.send(carritos);
});

routerCarrito.get("/:id/productos", (req, res) => {
  const { id } = req.params;

  res.json(carritos[id - 1].productos);
});

routerCarrito.post("/:id/productos", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, urlImagen, descripcion, codigo, stock } = req.body;
  if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
    res.status(400).json({ error: "por favor ingrese todos los datos" });
  } else {
    const newProduct = {
      nombre,
      precio,
      urlImagen,
      fechaCreacion: Date.now(),
      descripcion,
      id: prodID,
      codigo,
      stock,
    };
    carritos[id - 1].productos.push(newProduct);

    res.json(carritos[id].productos);
  }
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  const { id, id_prod } = req.params;

  carritos = carritos.map((carrito) => {
    if (carrito.id == id) {
      const carritoFiltered = {
        ...carrito,
        productos: carrito.productos.filter((prod) => prod.id != id_prod),
      };
      return carritoFiltered;
    }
    return carrito;
  });

  res.json(carritos);
});

module.exports = {
  routerProductos,
  routerCarrito,
  productos,
};
