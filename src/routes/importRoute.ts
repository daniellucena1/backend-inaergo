import multer from 'multer';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { importController } from '../controllers/importController';

const route = Router();
const upload = multer({ dest: '../imports' });

route.post('/import', authMiddleware.authenticate, authMiddleware.isAdmin, upload.single('csv'), importController.import);

export default route;