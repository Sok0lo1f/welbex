const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const TravelController = require('./controller/TravelController')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/travels', TravelController.travels)

app.listen(3010, () => {
    console.log('server started')
})
