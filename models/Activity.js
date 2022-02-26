import mongoose from 'mongoose'

const ActivitySchema = mongoose.Schema({
  interest_id: String,
  employer_id: String,
  employer_name: String,
  employer_icon: String
}, { timestamps: true })

export const Activity = mongoose.model('Activity', ActivitySchema)
