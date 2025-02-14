import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/dashboard", authMiddleware.authenticate, authMiddleware.isManager, dashboardController.getDashboardInfo);

export default router;