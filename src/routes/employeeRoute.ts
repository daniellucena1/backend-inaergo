import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { employeeController } from "../controllers/employeeController";

const router = Router()

router.post('/employee', employeeController.createEmployee);
router.get('/employee/:id', authMiddleware.authenticate, employeeController.getEmployeeById);
router.put('/employee/:id', authMiddleware.authenticate, employeeController.updateEmployee);
router.delete('/employee/:id', authMiddleware.authenticate, employeeController.deleteEmployee);

export default router;