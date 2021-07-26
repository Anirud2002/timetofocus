const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.use(cors)
app.use(express.json())
require('dotenv').config();

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Successfully connected to the database")
})


app.listen(port, () => {
    console.log("Server started on port:" + port)
})