import { companyController } from "../controllers/companyController";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/company", authMiddleware.authenticate, authMiddleware.isAdmin, companyController.createCompany);

export default router;
