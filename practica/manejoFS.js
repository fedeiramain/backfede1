const fs = require("fs")
const path = require("path")
const filename = "data.txt"
const filepath = path.join(__dirname, filename)
fs.writeFileSync(filepath, "Inicio")

fs.appendFileSync(filepath, "\n\ya empezo")
fs.appendFileSync(filepath, "\n\sigamos")
fs.appendFileSync(filepath, "\n\sigamos mas")
const data = fs.readFileSync(filepath, "utf-8")

// setTimeout(() => fs.unlinkSync(filepath), 4000)
// console.log(data)


fs.appendFile(filepath, "dato asincrono", (err) => {
    if(err) {
        console.log("no se escribio")
    } else {
        fs.appendFile(filepath, "\n\podemos", (err) => {
            if(err) {
                console.log("no se pudo agregar")
            } else {
                fs.readFile(filepath, "utf-8", (err, data) => {
                    if(err) {
                        console.log("no se puede leer")
                    } else {
                        console.log(data)
                    }
                })
            }
        })
    }
})


const elementos = [ {name:"fede"}, {name:"ale"}, {name:"facu"} ]
const apellido = [{apellido:"irmain"}]
elementos[1].push(...apellido)
console.log(elementos[1])