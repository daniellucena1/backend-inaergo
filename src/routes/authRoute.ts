import { Router } from 'express';
import { authController } from '../controllers/authController';
import { errorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';

const router = Router()

// Rotas de Auth
router.post("/user/login", authController.signIn, errorHandlerMiddleware);
router.post("/employee/login", authController.loginFuncionario, errorHandlerMiddleware);

export default router;