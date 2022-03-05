import mongoose from 'mongoose'

const RoleSchema = mongoose.Schema({
  name: String,
  description: String,
  employer_id: String
}, { timestamps: true })

export const Role = mongoose.model('Role', RoleSchema)
