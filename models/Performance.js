import mongoose from 'mongoose'

const PerformanceSchema = mongoose.Schema({
  user_id: String,
  total_visits: Number,
  unique_visits: Number,
  academics: Number,
  skills: Number,
}, { timestamps: true })

export const Performance = mongoose.model('Performance', PerformanceSchema)
