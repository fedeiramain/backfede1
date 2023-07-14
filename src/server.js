const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()
const productManager = new ProductManager("products.json")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",  (req,res)=> {

    res.send("productos")
})

app.get("/api/productos", async (req, res)=> {
    const {search, min, max, limit} = req.query
    const datos = await productManager.getProducts()
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

app.get("/api/productos/:id", async (req,res)=> {
    const datos = await productManager.getProducts()
    const id = req.params.id 
    let productos = datos

    if(productos = productos.filter(p => p.id == id)) {
        res.send(productos)
    } else {
        res.send("no existe")
    }
    
})

app.post("/api/productos", async (req, res) => {
    const { body } = req

    const product = await productManager.create(body)

    res.status(201).send(product)
})

app.put("/api/productos/:id", async (req, res) => {
    const { body } = req
    const { id } = req.params

    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    }

    const product = await productManager.save(id, body)

    res.sendStatus(202).send(product)
})

app.delete("/api/productos/:id", async (req, res) => {
    const { id } = req.params
    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    }

    const deleted = await productManager.delete(id)

    req.sendStatus(202).send(deleted)

})


app.listen(8080, () => {
    console.log("ok")
})