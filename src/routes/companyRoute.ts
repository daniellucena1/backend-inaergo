import { companyController } from "../controllers/companyController";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

const router = Router();

router.post("/company", authMiddleware.authenticate, authMiddleware.isAdmin, companyController.createCompany);
router.get("/company", authMiddleware.authenticate, authMiddleware.isAdmin, companyController.getAllCompanies);
router.put("/company/:id", authMiddleware.authenticate, authMiddleware.isAdmin, companyController.updateCompany);
router.post("/company", authMiddleware.authenticate, authMiddleware.isAdmin, companyController.createCompany, errorHandlerMiddleware);

export default router;
