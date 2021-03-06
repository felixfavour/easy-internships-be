import mongoose from 'mongoose'

const UserSkillSchema = mongoose.Schema({
  skill_id: String,
  user_id: String,
  user_avatar: String,
  info: String
}, { timestamps: true })

export const UserSkill = mongoose.model('UserSkill', UserSkillSchema)
