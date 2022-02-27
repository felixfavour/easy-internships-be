import { successMsg } from '../helpers/functions.js'

const get = (_req, res) => {
  try {
    return res.status(200).json(successMsg('EASYiNTERSHIPS API is active.'))
  } catch {
    return res.status(500).json(successMsg('EASYiNTERSHIPS API is down.'))
  }
}

export default get
