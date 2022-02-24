import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

// JWT Max age
const maxAge = 3 * 24 * 60 * 60;

// create json web token
const createToken = (id) => jwt.sign({ id }, 'secret', {
  expiresIn: maxAge
});

// Create user
export const createUser = async (req, res) => {
  const { full_name, email, password } = req.body
  try {
    const user = await User.create({ full_name, email, password })
    const token = createToken(user._id);
    res.status(201).json({ user, token })
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(err)
  }
}
