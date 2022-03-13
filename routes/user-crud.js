import {
  getStudentsBySchool,
  getUser,
  getUserActivity,
  getUserByUsername,
  updatePassword,
  updateUser,
  updateUserVisits
} from '../controllers/user-crud.js';
import router from './server.js';

router.post('/v1/user/visit', updateUserVisits)
router.get('/v1/user/:id', getUser)
router.put('/v1/user/:id', updateUser)
router.get('/v1/user/username/:username', getUserByUsername)
router.put('/v1/user/security/:id', updatePassword)
router.get('/v1/user/activity/:id', getUserActivity)

// STUDENTS
router.get('/v1/user/school/:id', getStudentsBySchool)

export default router
