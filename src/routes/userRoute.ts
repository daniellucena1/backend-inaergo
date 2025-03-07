import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userController } from '../controllers/userController';

const router = Router()

router.get("/user/:id", authMiddleware.authenticate, userController.getById)
router.get("/manager/:companyId", authMiddleware.authenticate, userController.getByCompanyId)
router.post('/user', authMiddleware.authenticate, userController.create);
router.put('/user/:id', authMiddleware.authenticate, userController.update);
router.delete('/user/:id', authMiddleware.authenticate, userController.delete);

export default router;