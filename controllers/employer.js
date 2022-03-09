import { errorMsg, successMsg } from '../helpers/functions.js'
import { Employer } from '../models/Employer.js'
import { User } from '../models/User.js'
import { ObjectID } from '../config/database.js'
import { Review } from '../models/Review.js'
import { EmployerRole } from '../models/EmployerRole.js'
import { Salary } from '../models/Salary.js'
import { Question } from '../models/Question.js'
import { Answer } from '../models/Answer.js'
import { QuestionVote } from '../models/QuestionVote.js'
import { AnswerVote } from '../models/AnswerVote.js'
import { VOTE } from '../helpers/constants.js'

// Get all Employers
export const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.aggregate([
      { $set: { user_id: { $toObjectId: '$user_id' } } },
      {
        $lookup: {
          from: 'users', localField: 'user_id', foreignField: '_id', as: 'user'
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
      { $set: { _id: { $toObjectId: '$_id' } } },
      { $set: { user_id: { $toObjectId: '$user_id' } } },
      { $set: { interesting_user_id: { $toObjectId: '$interesting_user_id' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'interests',
          localField: 'user_id',
          foreignField: 'interesting_user_id',
          as: 'interest'
        }
      },
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
    employers.length = 6
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
    const employers = await Employer.aggregate([
      { $match: { _id: ObjectID(id) } },
      {
        $lookup: {
          from: 'interests', localField: 'user_id', foreignField: 'interesting_user_id', as: 'interests'
        }
      }
    ])
    const [employer] = employers
    employer.user = await User.findById(ObjectID(employer.user_id))

    // Find interests
    // eslint-disable-next-line no-restricted-syntax
    for (const interest of employer.interests) {
      if (req.userId === interest.interested_user_id) {
        employer.user_interested = true
        break
      } else {
        employer.user_interested = false
      }
    }
    delete employer.interests
    res.status(200).json(successMsg(employer))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// FTSearch for employers
export const searchEmployers = async (req, res) => {
  try {
    const regex = new RegExp(`.*${req.query.name}.*`, 'gi')
    const employers = await User.find({ full_name: regex })
    res.status(200).json(successMsg(employers))
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

// Add Employer Salary - Salary for a role is dependent on the employer.
export const addEmployerSalary = async (req, res) => {
  try {
    const salary = await Salary.create(req.body)
    res.status(200).json(successMsg(salary))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get Employer Salaries
export const getEmployerSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find({ employer_id: req.params.id })
    res.status(200).json(successMsg(salaries))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Delete Employer Salary
export const deleteEmployerSalary = async (req, res) => {
  try {
    await Salary.findByIdAndDelete(req.params.id)
    res.status(200).json(successMsg('Salary has been deleted.'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Ask Employer Question
export const addEmployerQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body)
    res.status(200).json(successMsg(question))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get all Questions for Employer
export const getEmployerQuestions = async (req, res) => {
  try {
    // const questions = await Question.find({ employer_id: req.params.id })
    const questions = await Question.aggregate([
      { $match: { employer_id: req.params.id } },
      { $set: { _id: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'answers', localField: '_id', foreignField: 'question_id', as: 'answers'
        }
      }
    ])
    questions.forEach((q) => q.answers = q.answers.length)
    res.status(200).json(successMsg(questions))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote/Downvote Employer Questions
export const voteEmployerQuestion = async (req, res) => {
  try {
    const attrs = {
      user_id: req.body.user_id,
      question_id: req.params.id
    }
    await QuestionVote.find(attrs).deleteMany()
    await QuestionVote.create({ ...attrs, type: req.body.type })

    // Get all questions votes
    const votes = await QuestionVote.find({ question_id: req.params.id }).lean()
    const actualVotes = (votes.filter((v) => v.type === VOTE.UP).length)
    - votes.filter((v) => v.type === VOTE.DOWN).length
    console.log(actualVotes)
    res.status(201).json(successMsg({ votes: actualVotes }))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Ask Employer Question - Answer
export const addEmployerQuestionAnswer = async (req, res) => {
  try {
    const answer = await Answer.create(req.body)
    res.status(200).json(successMsg(answer))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get all Answers for Questions for Employer
export const getQuestionsAnswer = async (req, res) => {
  try {
    const answers = await Answer.find({ question_id: req.params.id })
    res.status(200).json(successMsg(answers))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote/Downvote Employer Question - Answers
export const voteEmployerQuestionAnswer = async (req, res) => {
  try {
    const attrs = {
      user_id: req.body.user_id,
      answer_id: req.params.id
    }
    await AnswerVote.find(attrs).deleteMany()
    await AnswerVote.create({ ...attrs, type: req.body.type })

    // Get all answers votes
    const votes = await QuestionVote.find({ question_id: req.params.id }).lean()
    const actualVotes = (votes.filter((v) => v.type === VOTE.UP).length)
    - votes.filter((v) => v.type === VOTE.DOWN).length
    console.log(actualVotes)
    res.status(201).json(successMsg({ votes: actualVotes }))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
