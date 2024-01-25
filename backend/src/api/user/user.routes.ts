import express from "express";
import {
  getUserById,
  getUsers,
  removeUser,
  updateUser,
  addUser,
  addUserCorrectAnswer,
  removeUserCorrectAnswers,
  getUserStats,
} from "./user.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.use(requireAuth);
router.post("/correct-answer", addUserCorrectAnswer);
router.delete("/correct-answer", removeUserCorrectAnswers);
router.get("/user-stats", getUserStats);

router.use(requireAdmin);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.post("/", addUser);
router.get("/", getUsers);
router.delete("/:id", removeUser);

export default router;
