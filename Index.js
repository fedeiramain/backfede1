const products = document.querySelector("products");

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, img, code, stock = 10 }) {
        return new Promise((res, rej) => {
            setTimeout(()=> {
                const pruebaCode = this.products.find(e => e.code === code);
            if (!pruebaCode) {
                const id = this.products.length + 1;
                res(
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
                )
            } else {
                rej("no existe")
            }
            },500)
        })
    }

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


console.log(p.getProduct());

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

console.log(p.getProduct());

const ordenes = p.getProduct();

console.log(ordenes);


const getProductById = () => {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
        const exist = ordenes.find(e => e.id === 3);
        if(exist) {
            resolve(true)
        } else {
            reject("no existe")
        }
       }, 1000
       )
    })
}

console.log(getProductById());