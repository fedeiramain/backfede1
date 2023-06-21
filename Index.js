const products = document.querySelector("products");

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, img, code, stock = 10 }) {

        const pruebaCode = this.products.find(e => e.code === code);
        if (!pruebaCode) {
            const id = this.products.length + 1;
            this.products.push(
                {
                    id,
                    title,
                    description,
                    price,
                    img,
                    code,
                    stock
                }
            )
        } else {
            console.log("Este Producto ya se encuentra agregado")
        }
    };

    getProduct() {
        return this.products;
    }

}

const p = new ProductManager()

p.addProduct({
    title: "producto prueba",
    description: "Este es un producto Prueba",
    price: 200,
    img: "sin imagen",
    code: "primero",
    stock: 5
})

p.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto Prueba",
    price: 100,
    img: "sin imagen",
    code: "primero",
    stock: 5
})

p.addProduct({
    title: "producto prueba 3",
    description: "Este es un producto Prueba",
    price: 100,
    img: "sin imagen",
    code: "segundo",
    stock: 5
})

const ordenes = p.getProduct();

console.log(ordenes);


const getProductById = () => {
    const exist = ordenes.find(e => e.id === 3);
    if (exist) {
        console.log("Producto en carrito")
    } else {
        console.log("getProductById Not Found")
    }
};

getProductById();