import mongoose from 'mongoose'

const IntegrationSchema = mongoose.Schema({
  name: String,
  connector: String,
  connector_id: String,
  primary_user_id: String, // Student
  secondary_user_id: String, // Employer or School
}, { timestamps: true })

export const Integration = mongoose.model('Integration', IntegrationSchema)
