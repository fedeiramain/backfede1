const express = require("express")
const http = require('http')
const Routes = require('./routes/index.js')
const handlebars = require('express-handlebars')
const path = require('path')
const { Server } = require('socket.io')


const app = express()
const server  = http.createServer(app)
const io = new Server(server)
const socketsManager = require('./sockets.js')
io.on('connection', socketsManager)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + '/public')))

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')
app.use('/api', Routes.api)
app.use('/', Routes.home)

// app.use((req, res, next) => {
//     req.user = "admin"
//     next()
// })

server.listen(8080, () => {
    console.log("ok")
})

// websoclets 100min
