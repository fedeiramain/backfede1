const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const router = Router()

router.use('/productos', ProductRouter)

module.exports = router
