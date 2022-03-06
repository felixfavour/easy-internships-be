import { ObjectID } from '../config/database.js'
import { errorMsg, successMsg } from '../helpers/functions.js'
import { USER_TYPE } from '../helpers/constants.js'
import { User } from '../models/User.js'
import { Visit } from '../models/Visit.js'
import { School } from '../models/School.js'
import { Employer } from '../models/Employer.js'

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

// get User
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }).lean()
    if (user) {
      switch (user.type) {
        case USER_TYPE.EMPLOYER:
          user.employer = await Employer.findOne({ user_id: user._id }).lean()
          res.status(200).json(successMsg(user))
          break
        case USER_TYPE.SCHOOL:
          user.school = await School.findOne({ user_id: user._id }).lean()
          res.status(200).json(successMsg(user))
          break
        default:
          res.status(200).json(successMsg(user))
          break
      }
    } else {
      throw Error('User not found')
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
