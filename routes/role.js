import { addRole, getAllRoles } from '../controllers/role.js';
import router from './server.js';

router.get('/v1/role', getAllRoles)
router.post('/v1/role', addRole)

export default router
