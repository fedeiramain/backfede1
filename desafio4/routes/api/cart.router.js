const { Router } = require('express')
const CartManager = require('../../CartManager')
const ProductManager = require('../../ProductManager')

const cartManager = new CartManager('cart.json')
const productManager = new ProductManager('products.json')
const router = Router()

router.get("/", async (req, res)=> {
    const {search, min, max, limit} = req.query
    const datos = await cartManager.getAll()

    let filtrados = datos


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

router.post("/", async (req, res) => {
    try {
      const products = [];
      await cartManager.create({ products });
      res.send({ status: "Success, carrito creado" });
    } catch (e) {
      res.status(500).send({ status: "Error, carrito no fue creado" });
    }
  });

router.get("/:id", async (req,res)=> {
    const datos = await cartManager.getCarts()
    const id = req.params.id 
    let carts = datos

    if(isNaN(id)){
        res.send({status: "(id) debe ser Number"})
    }
    if(carts = carts.filter(c => c.id == id)) {
        res.send(carts)
    } else {
        res.send({status: "(id) no existe el producto"})
    }
    return
})

router.post("/:cid/productos/:pid", (req, res) => {
   try {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    cartManager.inCart(idCart)
    productManager.inProductos(idProduct)

    const addToCart = cartManager.addProduct(idCart, idProduct)

    if(addToCart) {
        res.send({status: "agregado con existo"})
    }
   } catch (e) {
    res.send({status: "Cart no encontrado"})
   }
 }) 

module.exports = router