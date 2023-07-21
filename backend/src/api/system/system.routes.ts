import express from "express";
import {
  getSystemSettings,
  addSystemSettings,
  updateSystemSettings,
  saveSiteEntry,
} from "./system.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getSystemSettings);
router.post("/entry", saveSiteEntry);

router.use(requireAuth, requireAdmin);
router.post("/", addSystemSettings);
router.patch("/", updateSystemSettings);

export default router;
