const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  static id = 0;
  // FUNCION PARA AGREGAR PRODUCTOS
  async addProduct(productObjet) {
    let { title, description, price, thumbnail, code, stock } = productObjet;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log(`Codigo ${code} Repetido `);
      return;
    }

    const newProd = {
      id: ++ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProd);

    await this.saveFiles(this.products);
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
    try {
      const arrayProd = await this.readFiles();
      const buscar = arrayProd.find((item) => item.id === id);

      if (!buscar) {
        console.log("producto no encontrado");
      } else {
        console.log("producto encontrado");
        return buscar;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }
  // FUNCION PARA LEER EL ARCHIVO JSON
  async readFiles() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }
  // FUNCION PARA GUARDAR LOS PRODUCTOS EN UN JSON
  async saveFiles(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }
  // FUNCION PARA ACTUALIZAR UN PRODUCTO
  async updateProduct(id, updatedProduct) {
    try {
      const arrayProd = await this.readFiles();

      const index = arrayProd.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProd.splice(index, 1, updatedProduct);
        await this.saveFiles(arrayProd);
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
  // FUNCION PARA ELIMINAR UN PRODUCTO
  async deleteProduct(id) {
    try {
      const productDelete = await this.readFiles();
      const productFilter = productDelete.filter((item) => item.id != id);
      await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2));
    } catch (error) {
      console.log("no se puede eliminar el producto", error);
    }
  }
}

const productos = new ProductManager("./productos.json");
console.log(productos.getProducts());

const notebook = {
  title: "notebook",
  description: "la mas rapida",
  price: 150000,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 30,
};

const camara = {
  title: "camara",
  description: "camara web",
  price: 4570,
  thumbnail: "sin imagen",
  code: "abc124",
  stock: 30,
};

const mouse = {
  title: "mouse",
  description: "barataso",
  price: 570,
  thumbnail: "sin imagen",
  code: "abc125",
  stock: 30,
};

const placaVideo = {
  title: "placaVideo",
  description: "Rtx3070 de 8gb",
  price: 97300,
  thumbnail: "sin imagen",
  code: "abc126",
  stock: 30,
};
const monitor = {
  title: "Monitor",
  description: "24 pulgadas",
  price: 12730,
  thumbnail: "sin imagen",
  code: "abc127",
  stock: 30,
};
const homeTeather = {
  title: "homeTeather",
  description: "muteki 5.2",
  price: 99730,
  thumbnail: "sin imagen",
  code: "abc128",
  stock: 30,
};
const tvLed = {
  title: "smart-tv",
  description: "50 pulgadas",
  price: 46830,
  thumbnail: "sin imagen",
  code: "abc129",
  stock: 30,
};
const impresora = {
  title: "impresora",
  description: "laser",
  price: 35780,
  thumbnail: "sin imagen",
  code: "abc130",
  stock: 30,
};
const router = {
  title: "router",
  description: "fjrg4k-2",
  price: 12345,
  thumbnail: "sin imagen",
  code: "abc131",
  stock: 30,
};
const xbox = {
  title: "xbox 360",
  description: "de 250gb",
  price: 9730,
  thumbnail: "sin imagen",
  code: "abc132",
  stock: 30,
};

async function testGetProductById(id) {
  const buscar = await productos.getProductById(id);
  console.log(buscar);
}

const telefono = {
  id: 2,
  title: "iphone",
  description: "iphoneX",
  price: 54674756,
  thumbnail: "sin imagen",
  code: "abc125",
  stock: 30,
};

async function testUpdate(id, objet) {
  await productos.updateProduct(id, objet);
}

async function deleteProducts(id) {
  await productos.deleteProduct(id);
}

module.exports = ProductManager;



//--------------------------TESTING---------------------------------

//FUNCION PARA AGREGAR UN PRODUCTO

// productos.addProduct(mouse);
// productos.addProduct(notebook);
// productos.addProduct(camara);
// productos.addProduct(xbox);
// productos.addProduct(router);
// productos.addProduct(impresora);
// productos.addProduct(tvLed);
// productos.addProduct(homeTeather);
// productos.addProduct(placaVideo);
// productos.addProduct(monitor);

// FUNCION PARA ELIMINAR UN PRODUCTO
// deleteProducts(2);

// FUNCION PARA ACTUALIZAR UN PRODUCTO
// testUpdate(2, telefono);

// FUNCION PARA BUSCAR UN PRODUCTO
// testGetProductById(2);
