import mongoose from 'mongoose'

const ReviewSchema = mongoose.Schema({
  user_id: String,
  employer_id: String,
  user_tagline: String,
  title: String,
  body: String,
  tags: Array,
  rating: Number,
  user_voted: Boolean
}, { timestamps: true })

export const Review = mongoose.model('Review', ReviewSchema)
