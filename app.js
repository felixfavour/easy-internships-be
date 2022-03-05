import express, { json, urlencoded } from 'express'
import cors from 'cors'
import initialRoute from './routes/server.js'
import userAuth from './routes/user-auth.js'
import userCRUD from './routes/user-crud.js'
import roles from './routes/role.js'
import employers from './routes/employer.js'
import interests from './routes/interest.js'
import performance from './routes/performance.js'
import skills from './routes/skill.js'
import logRequests from './middlewares/logger.js'
import fileUpload from './routes/file-upload.js'
import isAuth from './middlewares/auth.js'

const app = express()

// Set CORS
app.use(cors())

// Parse JSON requests
app.use(json())

// Log all requests
app.use(logRequests)

// Parse FormData requests
app.use(urlencoded({ extended: true }))

// Check that user is authenticated
app.use(isAuth)

// Registering routes
// Home route - Unaffected by [isAuth] middleware
app.use('', initialRoute)

// UserAuth route - Unaffected by [isAuth] middleware
app.use('/auth', userAuth)

// UserCRUD route
app.use('/user', userCRUD)

// EmployerCRUD route
app.use('/role', roles)

// EmployerCRUD route
app.use('/employer', employers)

// InterestsCRUD route
app.use('/interests', interests)

// PerformanceCRUD route
app.use('/performance', performance)

// SkillsCRUD route
app.use('/skill', skills)

// Amazon S3 file upload route
app.use('/file', fileUpload)

export default app
