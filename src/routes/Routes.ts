import express from 'express';
import { adminController } from '../controllers/adminController';
import { funcionarioController } from '../controllers/funcionarioController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authController } from '../controllers/authController';

const router = express.Router();

// Rotas de Admin (protegidas por autenticação)
router.post('/admin', authController.loginAdmin, adminController.createAdmin);
router.get('/admin/:id', authController.loginAdmin, adminController.getAdminById);
router.put('/admin/:id', authController.loginAdmin, adminController.updateAdmin);
router.delete('/admin/:id', authController.loginAdmin, adminController.deleteAdmin);

// Rotas de Funcionario (protegidas por autenticação)
router.post('/funcionario', authController.loginFuncionario, funcionarioController.createfuncionario);
router.get('/funcionario/:id', authController.loginFuncionario, funcionarioController.getFuncionarioById);
router.put('/funcionario/:id', authController.loginFuncionario, funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', authController.loginFuncionario, funcionarioController.deleteFuncionario);

export default router;