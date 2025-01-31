import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminController } from '../controllers/adminController';

const router = Router()

// Rotas de Admin
router.get("/admin/:id", authMiddleware.authenticate, adminController.getAdminById)
router.post('/admin', adminController.createAdmin);
router.put('/admin/:id', authMiddleware.authenticate, adminController.updateAdmin);
router.delete('/admin/:id', authMiddleware.authenticate, adminController.deleteAdmin);

export default router;