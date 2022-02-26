import mongoose from 'mongoose'

const VisitSchema = mongoose.Schema({
  user_id: String,
  visited_user: String,
  visited_user_type: String
}, { timestamps: true })

export const Visit = mongoose.model('Visit', VisitSchema)
