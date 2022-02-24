import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
  full_name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
})

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

export const User = mongoose.model('User', UserSchema)
