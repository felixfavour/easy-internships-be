import multer from 'multer'
import { uploadFile } from '../controllers/file-upload.js';
import router from './server.js';

const upload = multer({ dest: 'uploads/' })
router.post('/v1/file', upload.single('file'), uploadFile)

export default router
