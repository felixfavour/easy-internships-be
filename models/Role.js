import mongoose from 'mongoose'

const RoleSchema = mongoose.Schema({
  name: String,
  information: String,
  employer_id: String
}, { timestamps: true })

export const Role = mongoose.model('Role', RoleSchema)
