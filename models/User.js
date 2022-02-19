const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String
})

module.exports = mongoose.model('User', UserSchema)
