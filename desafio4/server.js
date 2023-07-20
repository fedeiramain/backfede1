const express = require("express")
const Routes = require('./routes/index.js')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')
app.use('/api', Routes.api)
app.use('/', Routes.home)

// app.use((req, res, next) => {
//     req.user = "admin"
//     next()
// })

app.listen(8080, () => {
    console.log("ok")
})

