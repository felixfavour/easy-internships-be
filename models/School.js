import mongoose from 'mongoose'

const SchoolSchema = mongoose.Schema({
  user_id: String,
}, { timestamps: true })

export const School = mongoose.model('School', SchoolSchema)
