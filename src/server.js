const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()
const productManager = new ProductManager("products.json")


app.get("/",  (req,res)=> {

    res.send("productos")
})

app.get("/productos", async (req, res)=> {
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

app.get("/productos/:id", async (req,res)=> {
    const datos = await productManager.getProducts()
    const id = req.params.id 
    let productos = datos

    if(productos = productos.filter(p => p.id == id)) {
        res.send(productos)
    } else {
        res.send("no existe")
    }
    
})


app.listen(3000, () => {
    console.log("ok")
})