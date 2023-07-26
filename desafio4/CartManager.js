const fs = require('fs/promises')
const path = require('path')

class CartManager {

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname,'./data', this.filename)
        
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

    async getById(id) {
        await this.#readFile()

        return this.#cart.find(p => p.id == id)
    }

    async addProduct(idCart, idProduct) {
        await this.#readFile()

        const cart = this.#cart[idCart] || { products: [] }

        cart.products.push(idProduct)

        this.#cart[idCart] = cart

        await this.#writeFile()

    }
}

module.exports = CartManager