const { Router } = require('express')
const productRouter = require('./api/products.router')
const cartRouter = require('./api/cart.router')
const homeRoutes = require('./home')
const adminRoutes = require('./admin')
const api = Router()

api.use('/productos', productRouter)
api.use('/cart', cartRouter)

const home = Router()

home.use('/home', homeRoutes)
home.use('/admin', adminRoutes)

module.exports = { api, home }
//motores de plantilla 1:31