import { Router } from "express";
import { formsController } from "../controllers/formsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/forms", authMiddleware.authenticate, authMiddleware.isManager, formsController.createForm);
router.get("/forms", authMiddleware.authenticate, formsController.getForm);

export default router;