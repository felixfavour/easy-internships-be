import { ObjectID } from '../config/database.js'
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Interest } from '../models/Interest.js'

// Get User Interests
export const getUserInterests = async (req, res) => {
  try {
    const interests = await Interest.aggregate([
      { $set: { interesting_user_id: { $toObjectId: '$interesting_user_id' } } },
      { $set: { interesting_user_id_str: { $toString: '$interesting_user_id' } } },
      { $match: { interested_user_id: req.params.id } },
      {
        $lookup: {
          from: 'users', localField: 'interesting_user_id', foreignField: '_id', as: 'user'
        }
      },
      {
        $lookup: {
          from: 'employers', localField: 'interesting_user_id_str', foreignField: 'user_id', as: 'employer'
        }
      }
    ])
    res.status(200).json(successMsg(interests))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add User Interests
export const addUserInterest = async (req, res) => {
  try {
    await Interest.create(req.body)
    res.status(200).json(successMsg('Interest registration successful'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Remove User Interests
export const removeUserInterest = async (req, res) => {
  try {
    await Interest.findByIdAndDelete(ObjectID(req.params.id))
    res.status(200).json(successMsg('Interest was unregistered successfully'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
