import express from "express";
import { getSystemSettings, updateSystemSettings, saveSiteEntry } from "./system.controller";
import { requireAuth, requireAdmin } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.get("/", getSystemSettings);
router.post("/entry", saveSiteEntry);

router.use(requireAuth, requireAdmin);
router.put("/", updateSystemSettings);

export default router;
