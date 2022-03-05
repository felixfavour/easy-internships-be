import {
  addEmployerReview,
  addEmployerRoles,
  deleteEmployerReviews,
  deleteEmployerRoles,
  filterEmployers,
  getAllEmployers,
  getEmployer,
  getEmployerReviews,
  getEmployerRoles,
  getPopularEmployers,
  searchEmployers
} from '../controllers/employer.js';
import router from './server.js';

router.get('/v1/employer', getAllEmployers)
router.get('/v1/employer/popular', getPopularEmployers)
router.get('/v1/employer/filter', filterEmployers)
router.get('/v1/employer/:id', getEmployer)
router.get('/v1/employer/search/:query', searchEmployers)
router.get('/v1/employer/search/:query', searchEmployers)

// EMPLOYER REVIEWS
router.post('/v1/employer/review', addEmployerReview)
router.get('/v1/employer/:id/review', getEmployerReviews)
router.delete('/v1/employer/review/:id', deleteEmployerReviews)

// EMPLOYER ROLES
router.post('/v1/employer/role', addEmployerRoles)
router.get('/v1/employer/:id/role', getEmployerRoles)
router.delete('/v1/employer/role/:id', deleteEmployerRoles)

export default router
