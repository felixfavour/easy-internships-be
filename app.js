import express, { json, urlencoded } from 'express'
import cors from 'cors'
import initialRoute from './api/routes/server.js'
import userAuth from './api/routes/user/auth.js'
import userCRUD from './api/routes/user/crud.js'
import logRequests from './api/middlewares/logger.js'

const app = express()

// Set CORS
app.use(cors())

// Parse JSON requests
app.use(json())

// Log all requests
app.use(logRequests)

// Parse FormData requests
app.use(urlencoded({ extended: true }))

// Registering routes
// Home route
app.use('', initialRoute)

// UserAuth route
app.use('/auth', userAuth)

// UserCRUD route
app.use('/user', userCRUD)

export default app
