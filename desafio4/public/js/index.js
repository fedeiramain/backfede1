console.log('vista js')
const socket = io()

socket.emit('event', "Hola back")

socket.on('event', (res) => console.log(res))

const productAdd = document.querySelector('#cart-widget')
function addCart(idProduct) {
    socket.emit('addToCart', { idCart: 1 , idProduct })


    socket.on('inCart', (cart) => {
        productAdd.innerHTML = cart.length
        
    })
    
}
addCart();


