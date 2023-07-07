const fs = require('fs/promises')
const path = require('path')

class ProductManager {

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname, this.filename)
        
    }

    async getProducts() {
        const data = await fs.readFile(this.filepath, "utf-8")
        const productos = JSON.parse(data)

        return productos
    }
}

module.exports = ProductManager