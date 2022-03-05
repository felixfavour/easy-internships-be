import jwt from 'jsonwebtoken'
import { UNPROTECTED_ROUTES } from '../helpers/constants.js'
import { errorMsg } from '../helpers/functions.js'

const verifyJwt = (authToken) => {
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
  return decoded
}

const isAuth = (req, res, next) => {
  const { authorization } = req.headers

  // If it is an authorization protected route
  if (!UNPROTECTED_ROUTES.includes(req.url)) {
    // Check if user included token
    if (authorization?.split(' ')[0] === 'Bearer') {
      try {
        const token = authorization?.split(' ')[1]
        const tokenVerified = verifyJwt(token)

        if (tokenVerified.id) {
          next()
        }
      } catch (err) {
        return res.status(401).json(errorMsg('Invalid Authorization Header'))
      }
    } else {
      return res.status(401).json(errorMsg('Access Denied! No Bearer Token in request'))
    }
  } else {
    next()
  }
}

export default isAuth
