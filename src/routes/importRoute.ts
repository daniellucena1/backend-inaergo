import multer from 'multer';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { importController } from '../controllers/importController';

const route = Router();
const upload = multer({ dest: '../imports' });

route.post('/import', authMiddleware.authenticate, authMiddleware.isManager, upload.single('csv'), importController.importFile);
// route.post('/import-from-excel', upload.single('file'), importController.importFromExcel);

export default route;