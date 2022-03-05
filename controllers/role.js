import { ObjectID } from '../config/database.js'
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Role } from '../models/Role.js'

// Get Roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ })
    res.status(200).json(successMsg(roles))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add Role
export const addRole = async (req, res) => {
  try {
    await Role.create(req.body)
    res.status(200).json(successMsg('Role addition successful'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
