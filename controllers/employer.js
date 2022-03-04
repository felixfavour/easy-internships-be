import { errorMsg, successMsg } from '../helpers/functions.js'
import { Employer } from '../models/Employer.js'
import { User } from '../models/User.js'
import { ObjectID } from '../config/database.js'

// Get all Employers
export const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.aggregate([
      { $set: { user_id: { $toObjectId: '$user_id' } } },
      {
        $lookup: {
          from: 'users', localField: 'user_id', foreignField: '_id', as: 'users'
        }
      }
    ])
    res.status(200).json(successMsg(employers))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Popular Employers
export const getPopularEmployers = async (req, res) => {
  try {
    const employers = await Employer.aggregate([
      {
        $lookup: {
          from: 'visits',
          localField: 'user_id',
          foreignField: 'visited_user',
          as: 'visits'
        }
      }
    ])
    employers.sort((a, b) => b.visits.length - a.visits.length)
    // eslint-disable-next-line no-param-reassign
    employers.forEach((employer) => delete employer.visits)
    res.status(200).json(successMsg(employers))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Employer details
export const getEmployer = async (req, res) => {
  try {
    const { id } = req.params
    const employer = await Employer.findById(ObjectID(id)).lean()
    employer.user = await User.findById(ObjectID(employer.user_id))
    res.status(200).json(successMsg(employer))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// FTS Search for employers
export const searchEmployers = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Filter employers
// Employers would be filtered by [company_size], [location], [sector], [job_roles]
export const filterEmployers = async (req, res) => {
  try {
    const employers = await Employer.aggregate([
      { $set: { user_id: { $toObjectId: '$user_id' } } },
      {
        $lookup: {
          from: 'users', localField: 'user_id', foreignField: '_id', as: 'users'
        }
      }
    ])
    res.status(200).json(successMsg(employers))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
