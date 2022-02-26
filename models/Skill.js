import mongoose from 'mongoose'

const SkillSchema = mongoose.Schema({
  created_by: String,
  name: String,
  popular: Boolean,
  image: String
}, { timestamps: true })

export const Skill = mongoose.model('Skill', SkillSchema)
