import { errorMsg, successMsg } from '../helpers/functions.js'
import { Employer } from '../models/Employer.js'
import { User } from '../models/User.js'
import { ObjectID } from '../config/database.js'
import { Review } from '../models/Review.js'
import { EmployerRole } from '../models/EmployerRole.js'

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

// Add Employer Review
export const addEmployerReview = async (req, res) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).json(successMsg(review))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Employer Reviews
export const getEmployerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ employer_id: req.params.id })
    res.status(200).json(successMsg(reviews))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Delete Employer Reviews
export const deleteEmployerReviews = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).json(successMsg('Review has been deleted successfully'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add Employer Roles
export const addEmployerRoles = async (req, res) => {
  try {
    const employerRole = await EmployerRole.create(req.body)
    res.status(200).json(successMsg(employerRole))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Employer Roles
export const getEmployerRoles = async (req, res) => {
  try {
    let employerRoles = await EmployerRole.aggregate([
      { $set: { role_id: { $toObjectId: '$role_id' } } },
      {
        $lookup: {
          from: 'roles', localField: 'role_id', foreignField: '_id', as: 'roles'
        }
      }
    ])
    employerRoles = employerRoles.filter((us) => us.employer_id.toString() === req.params.id)
    res.status(200).json(successMsg(employerRoles))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Delete Employer Roles
export const deleteEmployerRoles = async (req, res) => {
  try {
    await EmployerRole.findByIdAndDelete(req.params.id)
    res.status(200).json(successMsg('Role has been removed from employer'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add Employer Salary
export const addEmployerSalary = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Employer Salaries
export const getEmployerSalaries = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Delete Employer Salary
export const deleteEmployerSalary = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Ask Employer Question
export const addEmployerQuestion = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get all Questions for Employer
export const getEmployerQuestions = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote/Downvote Employer Questions
export const voteEmployerQuestion = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Ask Employer Question - Answer
export const addEmployerQuestionAnswer = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get all Answers for Questions for Employer
export const getQuestionsAnswer = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote/Downvote Employer Question - Answers
export const voteEmployerQuestionAnswer = async (req, res) => {
  try {
    res.status(200).json(successMsg())
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
