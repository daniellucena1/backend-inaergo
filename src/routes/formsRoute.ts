import { Router } from "express";
import { formsController } from "../controllers/formsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

const router = Router();

router.post("/forms", authMiddleware.authenticate, authMiddleware.isManager, formsController.createForm, errorHandlerMiddleware);
router.get("/forms", authMiddleware.authenticate, formsController.getForm, errorHandlerMiddleware);

export default router;