import { errorMsg } from '../helpers/functions.js'
import { upload } from '../s3.js'

// Upload file to S3 Amazon
export const uploadFile = async (req, res) => {
  try {
    const result = await upload(req.file)
    res.status(201).json(result)
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
