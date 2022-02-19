const get = (_req, res) => {
  try {
    return res.status(200).json({ error: false, message: 'EASYiNTERSHIPS API is active.' })
  } catch {
    return res.status(500).json({ error: true, message: 'EASYiNTERSHIPS API is down.' })
  }
}

export default get
