import mongoose from 'mongoose'

const SalarySchema = mongoose.Schema({
  user_id: String,
  employer_id: String,
  name: String,
  role_id: String,
  role_name: String,
  /**
   * [competition_comparison] signifies how well the salary in the current
   * employer compares to the salary of different employers in the same role
   * if [competition_comparison] has a value of -10 it means it does 10% less than others
   * if [competition_comparison] has a value of +25 it means it does 25% more than others
   */
  competition_comparison: Number
}, { timestamps: true })

export const Salary = mongoose.model('Salary', SalarySchema)
