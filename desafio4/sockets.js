
const CartManager = require('./CartManager')
const cartManager = new CartManager('cart.json')


function sockets(socket) {
        console.log("user connected")
    
        socket.on('event', (res) => {
            console.log(res)
            socket.emit('event', "hola front")
        })
    
        socket.on('disconnect', ()=> {
            console.log("user disconnected")
        })

        socket.on('addToCart', async ({ idCart, idProduct }) => {
            await cartManager.addProduct(idCart, idProduct)
            const products = await cartManager.getById(idCart)
        
            socket.emit('inCart', products)
          })
}

module.exports = sockets