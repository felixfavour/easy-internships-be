import { loginUser } from '../../../controllers/user/auth.js';
import router from '../server.js';

router.post('/v1/auth', loginUser)

export default router
