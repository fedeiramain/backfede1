const { Router } = require('express')
const path = require('path')
const ProductManager = require('../ProductManager')
const productManager = new ProductManager('products.json')
const router = Router()


// router.get('/', (res, req) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// }) // renderiza la pagina html

router.get('/', async (req, res) => {
    const productos = await productManager.getAll()
    res.render('products', {
        productos,
        
    })
})

router.get('/cart', (req, res) => {
    res.render('cart', {
        cantidad: 5
    })
})

module.exports = router