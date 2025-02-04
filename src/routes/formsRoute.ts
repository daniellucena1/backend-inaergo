import { Router } from "express";
import { formsController } from "../controllers/formsController";

const router = Router();

router.post("/forms", formsController.createForm);
router.get("/forms", formsController.getForm);

export default router;