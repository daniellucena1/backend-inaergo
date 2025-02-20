import { Router } from "express";
import { answerController } from "../controllers/answerController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

const router = Router();

router.post("/answer", authMiddleware.authenticate, answerController.createAnswer, errorHandlerMiddleware);
router.get("/answer", authMiddleware.authenticate, authMiddleware.isManager, answerController.getAnswer, errorHandlerMiddleware);
router.get("/answer/:id", authMiddleware.authenticate, authMiddleware.isManager, answerController.getAnswerByEmployeeId, errorHandlerMiddleware);

export default router;