import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

const router = Router();

router.get("/dashboard", authMiddleware.authenticate, authMiddleware.isManager, dashboardController.getDashboardInfo, errorHandlerMiddleware);

export default router;