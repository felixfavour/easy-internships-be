import app from './app'

const port = process.env.port || 5000
app.listen(port)
console.log(`App has started on port: ${port}`)
