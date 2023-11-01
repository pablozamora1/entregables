class ProductManager {
  constructor() {
    this.products = [];
  }
  static id = 0;

  addProduct(title, description, price, thumbnail, code, stock) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log(`Codigo ${code} Repetido `);
        return;
      }
    }

    const newProd = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!Object.values(newProd).includes(undefined)) {
      ProductManager.id++;
      this.products.push({
        ...newProd,
        id: ProductManager.id,
      });
    } else {
      console.log("Todos los campos son obligatorios");
    }
  }
  getProducts() {
    return this.products;
  }

  findProductsById(id) {
    return this.products.find((productos) => productos.id === id);
  }

  getProductsById(id) {
    this.findProductsById(id)
      ? console.log(this.findProductsById(id))
      : console.log("Not Found");
  }
}

const productos = new ProductManager();

console.log(productos.getProducts());

productos.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productos.addProduct(
  "producto prueba_1",
  "Este es un producto prueba_1 ",
  201,
  "Sin imagen_1",
  "abc124",
  24
);

// productos.getProductsById(2);
console.log(productos.getProducts());
