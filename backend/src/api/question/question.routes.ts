import express from "express";
import {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  archiveQuestion,
  removeQuestion,
} from "./question.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);

router.use(requireAuth, requireAdmin);
router.post("/", addQuestion);
router.patch("/:id/archive", archiveQuestion);
router.patch("/:id", updateQuestion);
router.delete("/:id", removeQuestion);

export default router;
