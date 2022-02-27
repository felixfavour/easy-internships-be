import jwt from 'jsonwebtoken'
import { USER_TYPE } from '../helpers/constants.js'
import { Employer } from '../models/Employer.js'
import { School } from '../models/School.js'
import { Student } from '../models/Student.js'
import { User } from '../models/User.js'

// JWT Max age
const maxAge = 3 * 24 * 60 * 60;

// create json web token
const createToken = (id) => jwt.sign({ id }, 'secret', {
  expiresIn: maxAge
});

// Create User
export const createUser = async (req, res) => {
  try {
    const { company_size, company_sector, student_school } = req.body
    const user = await User.create(req.body)
    const token = createToken(user._id);

    // Create Secondary User Model (Employer, School, Student) depending on [user.type]
    switch (user.type) {
      case USER_TYPE.EMPLOYER:
        Employer.create({ user_id: user._id, company_sector, company_size })
        break
      case USER_TYPE.SCHOOL:
        School.create({ user_id: user._id })
        break
      case USER_TYPE.STUDENT:
        if (student_school) Student.create({ user_id: user._id, school_id: student_school })
        break
      default:
        break
    }
    res.status(201).json({ user, token })
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(err)
  }
}

// update User
export const updateUser = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(err)
  }
}

// get User Activity
export const getUserActivity = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(err)
  }
}
