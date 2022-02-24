import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

// JWT Max age
const maxAge = 3 * 24 * 60 * 60;

// create json web token
const createToken = (id) => jwt.sign({ id }, 'secret', {
  expiresIn: maxAge
});

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id);
    res.status(200).json({ user, token })
  } catch (err) {
    console.error(`LOGIN USER ERROR: ${err}`)
    res.status(400).json(err)
  }
}
