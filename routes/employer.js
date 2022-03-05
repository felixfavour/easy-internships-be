import {
  addEmployerQuestion,
  addEmployerQuestionAnswer,
  addEmployerReview,
  addEmployerRoles,
  addEmployerSalary,
  deleteEmployerReviews,
  deleteEmployerRoles,
  deleteEmployerSalary,
  filterEmployers,
  getAllEmployers,
  getEmployer,
  getEmployerQuestions,
  getEmployerReviews,
  getEmployerRoles,
  getEmployerSalaries,
  getPopularEmployers,
  getQuestionsAnswer,
  searchEmployers,
  voteEmployerQuestion,
  voteEmployerQuestionAnswer
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

// EMPLOYER SALARIES
router.post('/v1/employer/salary', addEmployerSalary)
router.get('/v1/employer/:id/salary', getEmployerSalaries)
router.delete('/v1/employer/salary/:id', deleteEmployerSalary)

// EMPLOYER QandA
router.post('/v1/employer/question', addEmployerQuestion)
router.post('/v1/employer/answer', addEmployerQuestionAnswer)
router.get('/v1/employer/:id/question', getEmployerQuestions)
router.get('/v1/employer/question/:id/answer', getQuestionsAnswer)
router.post('/v1/employer/question/:id/vote', voteEmployerQuestion)
router.post('/v1/employer/answer/:id/vote', voteEmployerQuestionAnswer)

export default router
