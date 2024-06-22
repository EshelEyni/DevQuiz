import express from "express";
import {
  addApplication,
  archiveApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "./application.controller";
import { requireAuth } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.use(requireAuth);
router.get("/", getApplications);
router.get("/:id([0-9]{19}-[A-Z])", getApplicationById);

router.post("/", addApplication);
router.put("/archive", archiveApplication);
router.put("/", updateApplication);

export default router;
