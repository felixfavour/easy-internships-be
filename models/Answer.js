import mongoose from 'mongoose'

const AnswerSchema = mongoose.Schema({
  user_id: String,
  user_name: String,
  user_tagline: String,
  question_id: String,
  employer_id: String,
  title: String,
  body: String,
  votes: Number,
  user_voted: Boolean
}, { timestamps: true })

export const Answer = mongoose.model('Answer', AnswerSchema)
