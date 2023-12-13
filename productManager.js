const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  static id = 0;

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

  async readFiles() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async saveFiles(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

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

const fideos = {
  title: "fideos",
  description: "los mas ricos",
  price: 150,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 30,
};

productos.addProduct(fideos);

const arroz = {
  title: "arroz",
  description: "los que no se pasan",
  price: 150,
  thumbnail: "sin imagen",
  code: "abc124",
  stock: 30,
};

productos.addProduct(arroz);

const aceite = {
  title: "aceite",
  description: "caraso",
  price: 150,
  thumbnail: "sin imagen",
  code: "abc126",
  stock: 30,
};

productos.addProduct(aceite);

const salsa = {
  title: "salsa",
  description: "salsa",
  price: 150,
  thumbnail: "sin imagen",
  code: "abc127",
  stock: 30,
};

productos.addProduct(aceite);

async function testGetProductById() {
  const buscar = await productos.getProductById(2);
  console.log(buscar);
}

// testGetProductById();

// const salsa = {
//   id: 1,
//   title: "salsa de tomates",
//   description: "caraso",
//   price: 150,
//   thumbnail: "sin imagen",
//   code: "abc125",
//   stock: 30,
// };

async function testUpdate() {
  await productos.updateProduct(1, salsa);
}

// testUpdate();

async function deleteProducts(id) {
  await productos.deleteProduct(id);
}

deleteProducts(1);
