import mongoose from 'mongoose'

const SkillSchema = mongoose.Schema({
  user_id: String,
  name: String,
  popular: Boolean,
  image: String
}, { timestamps: true })

export const Skill = mongoose.model('Skill', SkillSchema)
