import {
  getUser,
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

export default router
