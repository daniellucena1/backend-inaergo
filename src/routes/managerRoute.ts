import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { managerController } from '../controllers/managerController';

const router = Router()

// Rotas de manager
router.get("/manager/:id", authMiddleware.authenticate, managerController.getManagerById)
router.post('/manager', managerController.createManager);
router.put('/manager/:id', authMiddleware.authenticate, managerController.updateManager);
router.delete('/manager/:id', authMiddleware.authenticate, managerController.deleteManager);

export default router;