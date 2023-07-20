const { Router } = require('express')
const ProductManager = require('../ProductManager')
const productManager = new ProductManager('products.json')

const router = Router()


router.get('/addProduct', (req, res) => {
    res.render('admin', {
        title: "Agregar Productos",
    } )
})

router.post('/addProduct', (req, res) => {
    console.log(req.body)
    productManager.create(req.body)
    res.redirect('/home', )
})

module.exports = router