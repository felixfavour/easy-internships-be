import mongoose from 'mongoose'

const InterestSchema = mongoose.Schema({
  interested_user_id: String,
  interested_user_type: String,
  interesting_user_id: String,
  interesting_user_type: String,
}, { timestamps: true })

export const Interest = mongoose.model('Interest', InterestSchema)
