const fs = require("fs")
const express = require("express")
const app = express()
let theDataBaseKoders = JSON.parse(fs.readFileSync("dataBaseKoders.json", "utf8"))

app.use(express.json())

const updateKoders = (kodersList) => {
    fs.writeFileSync("dataBaseKoders.json", JSON.stringify(kodersList))
}
let koders = []

app.get("/koders", (request, response) => {
    response.json(theDataBaseKoders)
})

app.post("/koders", (request, response) => {
    theDataBaseKoders.push(request.body)
    updateKoders(theDataBaseKoders)
    response.json({
        message: "correctly registered ",
        theDataBaseKoders
    })
})

app.delete("/koders/:name", (request, response) => {
    theDataBaseKoders = theDataBaseKoders.filter((koder) => koder.name !== request.params.name)
    updateKoders(theDataBaseKoders)
    response.json({
        message: "the koder has been deleted",
        theDataBaseKoders
    })
})

app.delete("/koders", (request, response) => {
    theDataBaseKoders = []
    updateKoders(theDataBaseKoders)
    response.json({
        message: "koder has been deleted",
        theDataBaseKoders
    })
})

app.listen(8080, () => {
    console.log("server listening in the route 8080")
})