import mongoose from 'mongoose'

const InterestSchema = mongoose.Schema({
  user_id: String,
  student_id: String,
  employer_id: String
}, { timestamps: true })

export const Interest = mongoose.model('Interest', InterestSchema)
