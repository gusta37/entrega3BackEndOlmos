/* Profe: como pide la consigna realizo la adaptación de la clase ProductManager, permitiendo ahora gestionar productos y guardarlos en un archivo JSON. */

// Se utiliza el módulo fs de Node.js para interactuar con el sistema de archivos y guardar los productos en un archivo JSON.
const fs = require('fs');



class ProductManager {
  // En el constructor de la clase ProductManager, se agrega un nuevo parámetro filePath que representa la ruta al archivo JSON en el que se guardarán los productos. Este parámetro se asigna a la propiedad path de la instancia.

  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.correlativoId = 0;
  }

  // El método addProduct() se actualiza para llamar al método saveProducts() después de agregar un nuevo producto. Esto asegura que los productos se guarden en el archivo JSON después de cada operación de agregar.
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    let codeExists = this.products.some((dato) => dato.code === code);
    if (codeExists) {
      throw new Error("El código ya existe, por favor verifique");
    } else {
      this.correlativoId++;
      const newProduct = {
        id: this.correlativoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      this.saveProducts();
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((dato) => dato.id === id);
    if (product !== undefined) {
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  updateProduct(id, updatedProduct) {
    let product = this.getProductById(id);
    product = { ...product, ...updatedProduct };
    this.saveProducts();
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  // Se agrega un nuevo método saveProducts() en la clase ProductManager. Este método se encarga de guardar los productos en el archivo JSON. Utiliza el método writeFileSync() del módulo fs para escribir los datos en el archivo.
  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log('Products saved successfully.');
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }
}

// Se crean dos productos utilizando el método addProduct() y luego se muestra la lista de productos utilizando el método getProducts().

const filePath = 'products.json'; // Ruta al archivo JSON. sI QUIERO NOMBRAR AL ARCHIVO DE OTRA FORMA , LE CAMBIO EL NOMBRE AQUÍ.
const myProductManager = new ProductManager(filePath);//los productos se agregan directamente en el archivo JSON.

try {
  myProductManager.addProduct(
    "Piano Princesas",
    "Piano Musical Princesas Alfombra De Juguete Con Micrófono Zippy",
    29946,
    "https://http2.mlstatic.com/D_NQ_NP_2X_859443-MLA72061570897_102023-F.webp",
    "girls1234",
    15
  );
  myProductManager.addProduct(
    "Robot Musical",
    "Robot Musical Luz Sonido Y Movimiento Lanza Flechas",
    17850,
    "https://http2.mlstatic.com/D_NQ_NP_2X_724198-MLU72605082855_102023-F.webp",
    "boys1234",
    25
  );

  console.log("Todos los Productos:", myProductManager.getProducts());//Muestra todos los productos agregados al archivo JSON.

  // Se obtiene un producto específico por su ID utilizando el método getProductById():
  const product = myProductManager.getProductById(2);
  console.log("Productos filtrado por ID:", product);
} catch (error) {
  console.log(error.message);
}

/* En resumen, este nuevo código me permite utilizar la clase ProductManager para gestionar productos y guardarlos en un archivo JSON utilizando el módulo fs de Node.js. Proporciona una forma más completa de manejar los productos y mantenerlos en el archivo para su uso posterior. */