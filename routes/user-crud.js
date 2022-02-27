import { createUser, getUser } from '../controllers/user-crud.js';
import router from './server.js';

router.post('/v1/user', createUser)
router.get('/v1/user/:id', getUser)

export default router
