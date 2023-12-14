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
  code: "abc126",
  stock: 30,
};

const pendriver = {
  title: "pendriver",
  description: "de 1 64gb",
  price: 9730,
  thumbnail: "sin imagen",
  code: "abc127",
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

//--------------------------TESTING---------------------------------

//FUNCION PARA AGREGAR UN PRODUCTO
productos.addProduct(pendriver);
productos.addProduct(mouse);
productos.addProduct(notebook);
productos.addProduct(camara);

// FUNCION PARA ELIMINAR UN PRODUCTO
// deleteProducts(3);

// FUNCION PARA ACTUALIZAR UN PRODUCTO
// testUpdate(2, telefono);

// FUNCION PARA BUSCAR UN PRODUCTO
// testGetProductById(4);
