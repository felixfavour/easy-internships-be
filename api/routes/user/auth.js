import router from '../server.js';
import { registerUser } from '../../../controllers/user/auth.js';

router.get('/v1/auth', registerUser)

export default router
