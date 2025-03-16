import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { employeeController } from "../controllers/employeeController";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

const router = Router()

// router.post('/employee', employeeController.createEmployee);
// router.get('/employee/:id', authMiddleware.authenticate, employeeController.getEmployeeById);
router.get('/employee', authMiddleware.authenticate, authMiddleware.isManager, employeeController.getAllEmloyees, errorHandlerMiddleware);
router.put('/employee/:registration', authMiddleware.authenticate, authMiddleware.isManager, employeeController.updateEmployee, errorHandlerMiddleware);
router.delete('/employee/:id', authMiddleware.authenticate, employeeController.deleteEmployee, errorHandlerMiddleware);

export default router;