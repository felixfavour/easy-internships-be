import { errorMsg } from '../helpers/functions.js'

// get Student
export const getStudent = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Filter students
// filter by school, company and skills.
export const filterAllStudents = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
