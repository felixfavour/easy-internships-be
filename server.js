const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTER
const router = express.Router()
router.get('/', (req,res) => {
  console.log('I reached here.')
  res.json({ message: 'Welcome to Easy Internships' })
})

app.use('/api/v1', router)

// ALLOCATE SERVER HOST
const port = process.env.port || 5000
app.listen(port)
console.log(`App has started on port: ${port}`)
