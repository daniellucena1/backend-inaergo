import { Router } from "express";
import { answerController } from "../controllers/answerController";

const router = Router();

router.post("/answer", answerController.createAnswer);
router.get("/answer", answerController.getAnswer);
router.get("/answer/:id", answerController.getAnswerByEmployeeId);

export default router;