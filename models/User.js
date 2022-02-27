import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectID } from '../config/database.js';

const UserSchema = mongoose.Schema({
  full_name: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  password: String,
  type: String,
  location: String,
  avatar: String,
  icon: String,
  website: String,
  tagline: String,
  bio: String,
  student_school: String,
  views: Number
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static Method to Log in user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) return user
    throw Error('Incorrect password')
  }
  throw Error('Incorrect email')
}

// Static method to update user password
UserSchema.statics.updatePassword = async function (userId, newPassword) {
  const user = await this.findById(ObjectID(userId))
  if (user) {
    user.password = newPassword
    user.save()
  } else {
    throw Error('User Not Found')
  }
}

export const User = mongoose.model('User', UserSchema)
