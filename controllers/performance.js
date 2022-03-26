/* eslint-disable no-restricted-syntax */
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Visit } from '../models/Visit.js'
import { UserSkill } from '../models/UserSkill.js'
import { User } from '../models/User.js'
import { ObjectID } from '../config/database.js'

// Get User Performance
export const getUserPerformance = async (req, res) => {
  // AN AVERAGE USER IS SUPPOSED TO HAVE AT LEAST 3 UNIQuE SKILLS

  const performance = {
    total_visits: 0,
    unique_visits: 0,
    academics_score: 0,
    skills_score: 0
  }

  try {
    // Calculate Visits and Unique Visits
    const visits = await Visit.find({ visited_user: req.params.id })
    const uniqueVisits = await Visit.find({ visited_user: req.params.id }).distinct('user_id')
    performance.total_visits = visits.length
    performance.unique_visits = uniqueVisits.length

    // Calculate Skills score (Calculated based on average skill of a user)
    const users = await User.aggregate([
      { $match: { type: 'student' } },
      { $set: { _id: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'userskills', localField: '_id', foreignField: 'user_id', as: 'skills'
        }
      }
    ])

    // Get average skills
    let averageSkills = 0
    const numberOfUsers = users.length
    let totalUserSkills = 0
    for (const user of users) {
      user.skills = user.skills.length
      totalUserSkills += user.skills
    }
    averageSkills = Math.ceil(totalUserSkills / numberOfUsers)
    // Get skills score
    const userSkills = await UserSkill.find({ user_id: req.params.id })
    performance.skills_score = Math.ceil((userSkills.length / averageSkills) * 100)

    // Calculate Academics score
    const user = await User.find({ _id: ObjectID(req.params.id) }).lean()
    performance.academics_score = user.academics_score || 0

    res.status(200).json(successMsg(performance))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get User's visitors
export const getUserVisitors = async (req, res) => {
  try {
    const visitors = await Visit.find({ visited_user: req.params.id })
    res.status(200).json(successMsg(visitors))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get User's visits
export const getUserVisits = async (req, res) => {
  try {
    const visitedUsers = await Visit.find({ user_id: req.params.id })
    res.status(200).json(successMsg(visitedUsers))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
