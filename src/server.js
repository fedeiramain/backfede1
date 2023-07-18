const express = require("express")
const routes = require('./routes/index')

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/api', routes)

app.listen(8080, () => {
    console.log("ok")
})

// ROuter y Mutler 39 min