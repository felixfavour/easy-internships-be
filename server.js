// Require environment variables
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTER
const router = express.Router()
router.get('/', (req,res) => {
  res.json({ message: 'Welcome to Easy Internships' })
})

// DB SETUP
const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5g703.mongodb.net/EASYiNTERNSHIPS?retryWrites=true&w=majority`)

app.use('/api/v1', router)

// ALLOCATE SERVER HOST
const port = process.env.port || 5000
app.listen(port)
console.log(`App has started on port: ${port}`)
