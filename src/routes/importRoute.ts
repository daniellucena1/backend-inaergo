import multer from 'multer';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { importController } from '../controllers/importController';
import { errorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';

const route = Router();
const upload = multer({ dest: '../imports' });

route.post('/import', authMiddleware.authenticate, authMiddleware.isManager, upload.single('csv'), importController.importAsCsv, errorHandlerMiddleware);
// route.post('/import-from-excel', upload.single('file'), importController.importFromExcel);

export default route;