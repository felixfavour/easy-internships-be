import mongoose from 'mongoose'

const EmployerRoleSchema = mongoose.Schema({
  role_id: String,
  user_id: String
})

export const EmployerRole = mongoose.model('EmployerRole', EmployerRoleSchema)
