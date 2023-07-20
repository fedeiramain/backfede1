const fs = require('fs/promises')
const path = require('path')

class CartManager {

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname, this.filename)
        
    }

    async getCarts() {
        const data = await fs.readFile(this.filepath, "utf-8")
        const cart = JSON.parse(data)

        return cart
    }

    #cart = []

    #readFile = async ()=> {
        const data = await fs.readFile(this.filepath, "utf-8")
        this.#cart = JSON.parse(data)
    }
    #writeFile = async ()=> {
        const data = JSON.stringify(this.#cart, null,2)
        await fs.writeFile(this.filepath, data)
    }

    async getAll() {
        await this.#readFile()
        return this.#cart
    }

    async create({products}) {
        await this.#readFile()
        const id = new Date().getTime()
        const newCart = {}
        newCart.id = id
        newCart.products = products || []


        this.#cart.push(newCart)

        await this.#writeFile()

        return newCart
    }

    async getById(id) {
        await this.#readFile()

        return this.#cart.find(c => c.id == id)
    }

    inCart(idCart) {
        if(this.getById(idCart)) {
            return true
        } else {
            throw Error("id not found")
        }
    }

    async addProduct(idCart, idProduct) {
        const existCart = await this.getById(idCart);
        const index = this.#cart.indexOf(existCart)
        
        let pAdd = { id: idProduct, cantidad: 1 }
        let productos = existCart.products;
        // productos.push(pAdd)
        if(productos.some(p => p.id === idProduct)) {
            const index = productos.findIndex(p => p.id === idProduct)
            productos[index].cantidad++
        } else {
            productos.push(pAdd)
        }

        const newCart = {}
        newCart.id = idCart
        newCart.products = productos
        
        this.#cart.splice(index, 1, newCart)
        await this.#writeFile()
        
       }
}

module.exports = CartManager