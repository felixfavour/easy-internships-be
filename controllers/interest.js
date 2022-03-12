import { ObjectID } from '../config/database.js'
import { ACTIVITY } from '../helpers/constants.js'
import { errorMsg, successMsg } from '../helpers/functions.js'
import { Activity } from '../models/Activity.js'
import { Interest } from '../models/Interest.js'
import { User } from '../models/User.js'

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

    // Create activity when user shows interest in another user
    const user = await User.findById(req.body.interesting_user_id)
    console.log(user)
    await Activity.create({
      primary_user: req.interested_user_id,
      secondary_user: req.interesting_user_id,
      message: `You showed interest in ${user.full_name}`,
      type: ACTIVITY.INTEREST
    })
    res.status(200).json(successMsg('Interest registration successful'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Remove User Interests
export const removeUserInterest = async (req, res) => {
  try {
    const interest = await Interest.findByIdAndDelete(ObjectID(req.params.id))

    // Create activity when user no longer shows interest in another user
    const user = await User.findById(interest.interesting_user_id).lean()
    await Activity.create({
      primary_user: interest.interested_user_id,
      secondary_user: interest.interesting_user_id,
      message: `You revoked your interest in ${user.full_name}`,
      type: ACTIVITY.INTEREST
    })
    res.status(200).json(successMsg('Removed interest successfully.'))
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
