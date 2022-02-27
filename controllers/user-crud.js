import jwt from 'jsonwebtoken'
import { ObjectID } from '../config/database.js'
import { USER_TYPE } from '../helpers/constants.js'
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Employer } from '../models/Employer.js'
import { School } from '../models/School.js'
import { Student } from '../models/Student.js'
import { User } from '../models/User.js'
import { Visit } from '../models/Visit.js'

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
    res.status(201).json(successMsg({ user, token }))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// get User
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      const objectId = ObjectID(id)
      const user = await User.findById(objectId)
      res.status(200).json(successMsg(user))
    } else {
      res.status(400).json(errorMsg('No User found'))
    }
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      const objectId = ObjectID(id)
      const query = { _id: objectId }
      const userUpdate = await User.findOneAndUpdate(query, req.body, { new: true })
      res.status(200).json(successMsg(userUpdate))
    }
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Update User Password
export const updatePassword = async (req, res) => {
  try {
    const { password, new_password } = req.body
    const { id } = req.params
    await User.updatePassword(id, password, new_password)
    res.status(200).json(successMsg('Password was successfully updated.'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Update number of User visits
export const updateUserVisits = async (req, res) => {
  try {
    const { user_id, visited_user, visited_user_type } = req.body
    const visit = await Visit.create({
      user_id: ObjectID(user_id),
      visited_user: ObjectID(visited_user),
      visited_user_type
    })
    res.status(200).json(successMsg(visit))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// get User Activity
export const getUserActivity = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
