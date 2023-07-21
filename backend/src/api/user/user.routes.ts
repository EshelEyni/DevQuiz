import express from "express";
import {
  getUserById,
  getUsers,
  removeUser,
  updateUser,
  addUser,
  addUserCorrectAnswer,
} from "./user.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.use(requireAuth);
router.post("/correct-answer", addUserCorrectAnswer);

router.use(requireAdmin);
router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", removeUser);

export default router;
