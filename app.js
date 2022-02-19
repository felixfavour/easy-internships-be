import express from 'express'
import initialRoute from './api/routes/index.js'

const app = express()

// Register routes
app.use('', initialRoute)

export default app
