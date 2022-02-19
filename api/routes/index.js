import { Router } from 'express';
import get from '../../controllers/index.js';

const router = Router()
router.get('/', get)

export default router
