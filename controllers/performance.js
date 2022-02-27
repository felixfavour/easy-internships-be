import { errorMsg, successMsg } from '../helpers/functions.js'
import { Visit } from '../models/Visit.js'

// Get User Performance
export const getUserPerformance = async (req, res) => {
  const performance = {
    total_visits: 0,
    unique_visits: 0,
    academics_score: 0,
    skills_score: 0
  }
  try {
    const visits = await Visit.find({ visited_user: req.params.id })
    const uniqueVisits = await Visit.find({ visited_user: req.params.id }).distinct('user_id')
    performance.total_visits = visits.length
    performance.unique_visits = uniqueVisits.length
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
