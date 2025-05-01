import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { employeeController } from "../controllers/employeeController";

const router = Router()

// router.post('/employee', employeeController.createEmployee);
// router.get('/employee/:id', authMiddleware.authenticate, employeeController.getEmployeeById);
router.get('/employee', authMiddleware.authenticate, authMiddleware.isManager, employeeController.getAllEmloyees);
router.put('/employee/:registration', authMiddleware.authenticate, authMiddleware.isManager, employeeController.updateEmployee);
router.delete('/employee/:id', authMiddleware.authenticate, employeeController.deleteEmployee);
router.put('/employee/status/:id', authMiddleware.authenticate, authMiddleware.isManager, employeeController.toggleBlock);

export default router;