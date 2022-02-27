import { addUserInterest, getUserInterests, removeUserInterest } from '../controllers/interest.js';
import router from './server.js';

router.post('/v1/interest/add', addUserInterest)
router.delete('/v1/interest/remove/:id', removeUserInterest)
router.get('/v1/interest/:id', getUserInterests)

export default router
