import { createUser } from '../../../controllers/user/crud.js';
import router from '../server.js';

router.post('/v1/user', createUser)

export default router
