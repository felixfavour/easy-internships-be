// Get all employers
export const getAllEmployers = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(err)
  }
}

// Get popular employers
// popularity is measured by number of visits.
export const getPopularEmployers = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(err)
  }
}

// FTS Search for employers
export const searchEmployers = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(err)
  }
}

// Filter employers
// Employers would be filtered by [company_size], [location], [sector], [job_roles]
export const filterEmployers = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(err)
  }
}

// Get Employer details
export const getEmployer = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`ERROR from ${req.url}: ${err}`)
    res.status(400).json(err)
  }
}
