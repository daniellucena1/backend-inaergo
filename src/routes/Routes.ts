import express from 'express';
import { adminController } from '../controllers/adminController';
import { funcionarioController } from '../controllers/funcionarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Rotas de Admin (protegidas por autenticação)
router.post('/admin', authMiddleware.login, adminController.createAdmin);
router.get('/admin/:id', authMiddleware.login, adminController.getAdminById);
router.put('/admin/:id', authMiddleware.login, adminController.updateAdmin);
router.delete('/admin/:id', authMiddleware.login, adminController.deleteAdmin);

// Rotas de Funcionario (protegidas por autenticação)
router.post('/funcionario', authMiddleware.login, funcionarioController.createfuncionario);
router.get('/funcionario/:id', authMiddleware.login, funcionarioController.getFuncionarioById);
router.put('/funcionario/:id', authMiddleware.login, funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', authMiddleware.login, funcionarioController.deleteFuncionario);

export default router;