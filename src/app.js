const productManager = require("./productManager");
const express = require("express");
const manager = new productManager("./src/productos.json");

const app = express();
const PUERTO = 8080;

//productos con limite

app.get("/products", async (req, res) => {
  try {
    const arrayProducts = await manager.readFiles();

    let limit = parseInt(req.query.limit);
    if (limit) {
      const arratLimit = arrayProducts.slice(0, limit);
      return res.send(arratLimit);
    } else {
      return res.send(arrayProducts);
    }
  } catch (error) {
    return res.send("error de solicitud", error);
  }
});

//busqueda de productos por ID

app.get("/products/:pid", async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);

    const ProductById = await manager.getProductById(pid);

    if (ProductById) {
      res.send(ProductById);
    } else {
      return res.send("producto no encontado");
    }
  } catch (error) {
    return res.send("error de busqueda", error);
  }
});
app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});
