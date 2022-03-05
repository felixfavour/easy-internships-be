import mongoose from 'mongoose'

const EmployerRoleSchema = mongoose.Schema({
  role_id: String,
  employer_id: String
})

export const EmployerRole = mongoose.model('EmployerRole', EmployerRoleSchema)
