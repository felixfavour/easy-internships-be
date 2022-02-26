import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
  user_id: String,
  employer_id: String,
  title: String,
  body: String,
  votes: Number,
  user_voted: Boolean,
  answers: Number,
  answered: Boolean // if answers include one from employer_id, then this value is true
}, { timestamps: true })

export const Question = mongoose.model('Question', QuestionSchema)
