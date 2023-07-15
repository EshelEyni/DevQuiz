import express from "express";
import {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  archiveQuestion,
  removeQuestion,
  findDuplicatedQuestions,
} from "./question.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id([a-fA-F0-9]{24})", getQuestionById);

router.use(requireAuth, requireAdmin);
router.get("/duplicates", findDuplicatedQuestions);
router.post("/", addQuestion);
router.patch("/:id/archive", archiveQuestion);
router.patch("/:id", updateQuestion);
router.delete("/:id", removeQuestion);

export default router;
