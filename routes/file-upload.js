import multer from 'multer'
import { uploadFile } from '../controllers/file-upload.js';
import router from './server.js';

const upload = multer({ dest: 'uploads/' })
router.post('/v1/image', upload.single('image'), uploadFile)

export default router
