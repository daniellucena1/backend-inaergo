import { Router } from "express";
import { answerController } from "../controllers/answerController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/answer", authMiddleware.authenticate, answerController.createAnswer);
router.get("/answer", authMiddleware.authenticate, authMiddleware.isManager, answerController.getAnswer);
router.get("/answer/:id", authMiddleware.authenticate, authMiddleware.isManager, answerController.getAnswerByEmployeeId);

export default router;