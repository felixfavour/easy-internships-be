import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Require environmental variables
dotenv.config()

// Method to connect to MongoDB database
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5g703.mongodb.net/EASYiNTERNSHIPS`)
    console.log('DB Connection Successful')
  } catch (err) {
    console.error(`DB Connnection failed: ${err}`)
  }
}

// Method to disconnect from MongoDB Database
export const closeDB = async () => mongoose.disconnect()

// DB SETUP
