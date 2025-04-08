import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { reviewController } from "../controllers/reviewController";

const route = Router();

route.get("/review", authMiddleware.authenticate, authMiddleware.isManager, reviewController.getReviewsByCompanyId);
route.post("/review", authMiddleware.authenticate, authMiddleware.isManager, reviewController.createReview);
route.put("/review/:reviewId", authMiddleware.authenticate, authMiddleware.isManager, reviewController.reopenReview);
route.delete("/review/:id", authMiddleware.authenticate, authMiddleware.isManager, reviewController.deleteReview);

export default route;