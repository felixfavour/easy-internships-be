/* eslint-disable no-param-reassign */
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Skill } from '../models/Skill.js'
import { UserSkill } from '../models/UserSkill.js'

// Get All skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.aggregate([
      { $set: { _id: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'userskills', localField: '_id', foreignField: 'skill_id', as: 'users'
        }
      }
    ])
    skills.forEach((skill) => {
      skill.total_users = skill.users.length
      if (skill.users.length > 3) {
        skill.users.length = 3
      }
    })
    res.status(200).json(successMsg(skills))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get User Skills
export const getUserSkills = async (req, res) => {
  try {
    let userSkills = await UserSkill.aggregate([
      { $set: { skill_id: { $toObjectId: '$skill_id' } } },
      {
        $lookup: {
          from: 'skills', localField: 'skill_id', foreignField: '_id', as: 'skills'
        }
      }
    ])
    userSkills = userSkills.filter((us) => us.user_id.toString() === req.params.id)
    res.status(200).json(successMsg(userSkills))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Create New Skill
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(200).json(successMsg(skill))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add User Skill
export const addUserSkill = async (req, res) => {
  try {
    const attrs = { skill_id: req.body.skill_id, user_id: req.body.user_id }
    const findSkill = await UserSkill.find(attrs)
    if (findSkill.length > 0) {
      res.status(400).json(errorMsg('You have already added this skill'))
    } else {
      const userSkill = await UserSkill.create(req.body)
      res.status(200).json(successMsg(userSkill))
    }
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Remove User Skill
export const removeUserSkill = async (req, res) => {
  try {
    await UserSkill.findByIdAndDelete(req.params.id)
    res.status(200).json(successMsg('User Skill has been removed'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get All users with a skill - UNFINISHED
export const getUsersBySkill = async (req, res) => {
  try {
    const skills = await UserSkill.aggregate([
      { $set: { user_id: { $toObjectId: '$user_id' } } },
      {
        $lookup: {
          from: 'users', localField: 'user_id', foreignField: '_id', as: 'users'
        }
      }
    ])
    res.status(200).json(successMsg(skills))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
