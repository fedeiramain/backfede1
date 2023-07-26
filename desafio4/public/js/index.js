console.log('vista js')
const socket = io()
const productAdd = document.querySelector("#cart-badge")

socket.emit('event', "Hola back")

socket.on('event', (res) => console.log(res))


function addCart(idProduct) {
    socket.emit('addToCart', { idCart: 1 , idProduct })
    
}

socket.on('inCart', (cart) => {
    productAdd.innerHTML = cart.length
    
})



