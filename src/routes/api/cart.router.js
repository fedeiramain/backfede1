const { Router } = require('express')
const CartManager = require('../../CartManager')

const cartManager = new CartManager('cart.json')
const router = Router()

router.get("/", async (req, res)=> {
    const {search, min, max, limit} = req.query
    const datos = await cartManager.getAll()
    const productos = datos

    let filtrados = productos


    if(search) {
        filtrados = filtrados.filter(p => p.title.includes(search) || p.code.includes(search))
    }

    if(min || max) {
        filtrados = filtrados.filter(p => p.price >= (+min || 1) && p.price <= (+max || Infinity))
    }

    if(limit) {
        filtrados = filtrados.slice(0, +limit)
    }

    res.send(filtrados)
})

module.exports = router