import express, { json, urlencoded } from 'express'
import cors from 'cors'
import initialRoute from './routes/server.js'
import userAuth from './routes/user-auth.js'
import userCRUD from './routes/user-crud.js'
import employers from './routes/employer.js'
import interests from './routes/interest.js'
import performance from './routes/performance.js'
import skills from './routes/skill.js'
import logRequests from './middlewares/logger.js'

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

// EmployerCRUD route
app.use('/employer', employers)

// InterestsCRUD route
app.use('/interests', interests)

// PerformanceCRUD route
app.use('/performance', performance)

// SkillsCRUD route
app.use('/skills', skills)

export default app
