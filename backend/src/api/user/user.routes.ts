import express from "express";
import { getUserById, getUsers, removeUser, updateUser, addUser } from "./user.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

router.use(requireAuth);

router.use(requireAdmin);
router.patch("/:id", updateUser);
router.delete("/:id", removeUser);

export default router;
