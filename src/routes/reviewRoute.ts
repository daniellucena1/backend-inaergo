import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { reviewController } from "../controllers/reviewController";

const route = Router();

route.get("/review", authMiddleware.authenticate, authMiddleware.isManager, reviewController.getReviewsByCompanyId);

export default route;