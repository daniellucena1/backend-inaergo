import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { reviewController } from "../controllers/reviewController";

const route = Router();

route.get("/review", authMiddleware.authenticate, authMiddleware.isManager, reviewController.getReviewsByCompanyId);
route.post("/review", authMiddleware.authenticate, authMiddleware.isManager, reviewController.createReview);
route.put("/review/reopen/:reviewId", authMiddleware.authenticate, authMiddleware.isManager, reviewController.reopenReview);
route.put("/review/update/:reviewId", authMiddleware.authenticate, authMiddleware.isManager, reviewController.updateReview);
route.delete("/review/:id", authMiddleware.authenticate, authMiddleware.isManager, reviewController.deleteReview);

export default route;