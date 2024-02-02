import express from "express";
import {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  archiveQuestion,
  removeQuestion,
  findDuplicatedQuestions,
  findQuestionDuplications,
} from "./question.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id([0-9]{19}-[A-Z])", getQuestionById);

router.use(requireAuth, requireAdmin);
router.get("/lang-duplicates", findDuplicatedQuestions);
router.get("/duplicates/:id", findQuestionDuplications);
router.post("/", addQuestion);
router.put("/archive", archiveQuestion);
router.put("/", updateQuestion);
router.delete("/:id", removeQuestion);

export default router;
