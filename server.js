import app from './app.js'
import { connectDB } from './config/database.js'

const port = process.env.PORT || 4000

await connectDB()
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
