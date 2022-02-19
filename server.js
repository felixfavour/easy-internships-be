import app from './app.js'
import { connectDB } from './config/database.js'

const port = process.env.port || 5000

await connectDB()
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
