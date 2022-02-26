import { getAllEmployers } from '../controllers/employers.js';
import router from './server.js';

router.get('/v1/employer', getAllEmployers)

export default router
