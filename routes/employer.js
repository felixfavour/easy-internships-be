import {
  filterEmployers, getAllEmployers, getEmployer,
  getPopularEmployers,
  searchEmployers, updateEmployerVisits
} from '../controllers/employer.js';
import router from './server.js';

router.get('/v1/employer', getAllEmployers)
router.get('/v1/employer/popular', getPopularEmployers)
router.get('/v1/employer/filter', filterEmployers)
router.post('/v1/employer/visit', updateEmployerVisits)
router.get('/v1/employer/:id', getEmployer)
router.get('/v1/employer/search/:query', searchEmployers)

export default router
