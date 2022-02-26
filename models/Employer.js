import mongoose from 'mongoose'

const EmployerSchema = mongoose.Schema({
  user_id: String,
  company_sector: String,
  company_size: String,
  interviews_difficulty: String,
  rating: String,
  photos: Array,
  featured_cards: Array
}, { timestamps: true })

export const Employer = mongoose.model('Employer', EmployerSchema)
