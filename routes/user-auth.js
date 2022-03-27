import multer from 'multer';
import { createMultipleUsers, createUser, loginUser } from '../controllers/user-auth.js';
import router from './server.js';

router.post('/v1/auth/signup', createUser)
router.post('/v1/auth/login', loginUser)

const upload = multer({ dest: 'csv/' })
router.post('/v1/auth/signup/multiple', upload.single('file'), createMultipleUsers)

export default router
