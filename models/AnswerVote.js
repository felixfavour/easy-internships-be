import mongoose from 'mongoose'
import { VOTE } from '../helpers/constants.js'

const AnswerVoteSchema = mongoose.Schema({
  user_id: String,
  type: { type: String, default: VOTE.DEFAULT },
  answer_id: String
})

export const AnswerVote = mongoose.model('AnswerVote', AnswerVoteSchema)
