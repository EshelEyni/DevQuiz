import express from "express";
import { getSystemSettings, addSystemSettings, updateSystemSettings } from "./system.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getSystemSettings);

router.use(requireAuth, requireAdmin);
router.post("/", addSystemSettings);
router.patch("/", updateSystemSettings);

export default router;
