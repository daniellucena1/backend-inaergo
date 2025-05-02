import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userController } from '../controllers/userController';

const router = Router()

router.get("/user/:id", authMiddleware.authenticate, userController.getById)
router.get("/managers", authMiddleware.authenticate, userController.getManagers)
router.post('/user', authMiddleware.authenticate, userController.create);
router.put('/user/:id', authMiddleware.authenticate, authMiddleware.isAdmin, userController.update);
router.delete('/user/:id', authMiddleware.authenticate, userController.delete);
router.put('/user/status/:id', authMiddleware.authenticate, authMiddleware.isAdmin, userController.toggleBlockManager);

export default router;