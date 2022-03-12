import mongoose from 'mongoose'

const ActivitySchema = mongoose.Schema({
  primary_user: String,
  secondary_user: String,
  message: String,
  type: String
}, { timestamps: true })

export const Activity = mongoose.model('Activity', ActivitySchema)
