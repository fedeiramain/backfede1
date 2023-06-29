const fs = require ('fs/promises')
const path = require ('path')

class ProductManager {
    constructor(path) {
      this.filepath = path 
    }
  
    async addProduct(producto) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)

        const numero = new Date().getTime()

        productos.push({
            id: numero,
            ...producto
        })
        console.log(productos[1])
        await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2))
    }

    async getProducts(){
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        
        return productos
    }

    async getProductById(id) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)

        const findProduct = productos.find((p) => p.id === id)
        return findProduct;
    }
    async deleteProduct(id){
        const data = await fs.readFile(this.filepath, 'utf-8')      
        const productos = JSON.parse(data)
        productos.filter(p => p.id != id);

        await fs.writeFile(this.filepath, JSON.stringify(productos,null,2))
    }

    async updateProduct(id, updated) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        const prodIndex = productos.findIndex(p => p.id === id);

    
        if (prodIndex !== -1) {
          const prodActualizado = {
            id: productos[prodIndex].id, 
            ...productos[prodIndex],
            ...updated
          };
    
          productos[prodIndex] = prodActualizado;
          await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2));
        }
      }
    }

    
  
  const p = new ProductManager(path.join(__dirname,'productos.json'));

  async function main(){
  await p.addProduct({
    title: "producto prueba",
    description: "Este es un producto Prueba",
    price: 200,
    img: "sin imagen",
    code: "primero",
    stock: 5
  });

  await p.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto Prueba",
    price: 100,
    img: "sin imagen",
    code: "segundo",
    stock: 5
  });

  await p.addProduct({
    title: "producto prueba 3",
    description: "Este es un producto Prueba",
    price: 300,
    img: "sin imagen",
    code: "tercero",
    stock: 5
  });


  // await p.updateProduct(1688068669275, {
  //   "description": "Este es un producto Prueba 2"
  // });

}

main()