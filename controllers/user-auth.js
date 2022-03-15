import jwt from 'jsonwebtoken'
import { USER_TYPE } from '../helpers/constants.js';
import { errorMsg, successMsg } from '../helpers/functions.js';
import { Employer } from '../models/Employer.js';
import { School } from '../models/School.js';
import { Student } from '../models/Student.js';
import { User } from '../models/User.js'

// JWT Max age - 3 days
const maxAge = 3 * 24 * 60 * 60;

// create JSON web token
const createToken = (id, user_type) => jwt.sign({ id, user_type }, process.env.JWT_SECRET, {
  expiresIn: maxAge
});

// Log In User
export const loginUser = async (req, res) => {
  const { email, password, school_id } = req.body
  try {
    const user = await User.login(email, password)
    let user_type_id = null
    const token = createToken(user._id, user.type);

    // Add Employer/School ID to login response
    switch (user.type) {
      case USER_TYPE.EMPLOYER: {
        const employer = await Employer.findOne({ user_id: user._id })
        user_type_id = employer._id
        break
      }
      case USER_TYPE.SCHOOL: {
        const school = await School.findOne({ user_id: user._id })
        user_type_id = school._id
        break
      }
      default:
        break
    }

    // Check User (student) enrollment
    if (user.student_school === school_id) {
      res.status(200).json(successMsg({ user, token, user_type_id }))
    } else {
      throw Error('Student is not enrolled in this school')
    }
  } catch (err) {
    console.error(`LOGIN USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Create User
export const createUser = async (req, res) => {
  try {
    const { company_size, company_sector, student_school } = req.body
    const user = await User.create(req.body)
    const token = createToken(user._id, user.type);

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
    res.status(201).json(successMsg({ user, token }))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Change User Password
export const changePassword = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`LOGIN USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
