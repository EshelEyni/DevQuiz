import express from "express";
import {
  getUserById,
  getUsers,
  removeUser,
  updateUser,
  addUser,
  addUserCorrectAnswer,
  getUserStats,
} from "./user.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.use(requireAuth);
router.post("/correct-answer", addUserCorrectAnswer);
router.get("/user-stats", getUserStats);

router.use(requireAdmin);
router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/:id", removeUser);

export default router;
