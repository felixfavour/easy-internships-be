import { createUser, loginUser } from '../controllers/user-auth.js';
import router from './server.js';

router.post('/v1/auth/signup', createUser)
router.post('/v1/auth/login', loginUser)

export default router
