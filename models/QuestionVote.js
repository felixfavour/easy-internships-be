import mongoose from 'mongoose'
import { VOTE } from '../helpers/constants.js'

const QuestionVoteSchema = mongoose.Schema({
  user_id: String,
  type: { type: String, default: VOTE.DEFAULT },
  question_id: String
})

export const QuestionVote = mongoose.model('QuestionVote', QuestionVoteSchema)
