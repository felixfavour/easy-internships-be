import mongoose from 'mongoose'

const StudentSchema = mongoose.Schema({
  user_id: String,
  student_id: String,
  student_name: String,
  school_id: String // School user_id
}, { timestamps: true })

export const Student = mongoose.model('Student', StudentSchema)
