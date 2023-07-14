const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartManager = require('./api/cart.router')
const router = Router()

router.use('/productos', ProductRouter)
router.use('/cart', CartManager)

module.exports = router
