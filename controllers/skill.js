import { errorMsg, successMsg } from '../helpers/functions.js'
import { Skill } from '../models/Skill.js'
import { UserSkill } from '../models/UserSkill.js'

// Get All skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ })
    res.status(200).json(successMsg(skills))
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
    const userSkill = await UserSkill.create(req.body)
    res.status(200).json(successMsg(userSkill))
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

// Get All users with a skill - UNFINISHED
export const getUsersBySkill = async (req, res) => {
  try {
    const skills = await Skill.aggregate([
      { $set: { skill_id: { $toObjectId: '$skill_id' } } },
      {
        $lookup: {
          from: 'userskills', localField: '_id', foreignField: 'skill_id', as: 'users'
        }
      }
    ])
    res.status(200).json(successMsg(skills))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
