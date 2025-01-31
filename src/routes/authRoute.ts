import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router()

// Rotas de Auth
router.post("/admin/login", authController.loginAdmin);
router.post("/employee/login", authController.loginFuncionario);
router.post("/manager/login", authController.loginManager);

export default router;