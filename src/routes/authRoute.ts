import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router()

// Rotas de Auth
router.post("/user/login", authController.signIn);
router.post("/employee/login/:companyId", authController.loginFuncionario);

export default router;