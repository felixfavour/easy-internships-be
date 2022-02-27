import {
  createUser,
  getUser,
  updatePassword,
  updateUser
} from '../controllers/user-crud.js';
import router from './server.js';

router.post('/v1/user', createUser)
router.get('/v1/user/:id', getUser)
router.put('/v1/user/:id', updateUser)
router.put('/v1/user/security/:id', updatePassword)

export default router
