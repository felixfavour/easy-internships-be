import { getUserPerformance, getUserVisitors, getUserVisits } from '../controllers/performance.js';
import router from './server.js';

router.get('/v1/performance/visitors/:id', getUserVisitors)
router.get('/v1/performance/visits/:id', getUserVisits)
router.get('/v1/performance/:id', getUserPerformance)

export default router
