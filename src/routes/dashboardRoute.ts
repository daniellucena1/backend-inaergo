import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";

const router = Router();

router.get("/dashboard/:managerId", dashboardController.getDashboardInfo);

export default router;