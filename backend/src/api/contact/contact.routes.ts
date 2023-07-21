import express from "express";
import {
  getContactMsgs,
  getContactMsg,
  updateContactMsg,
  sendContactMsg,
  reportQuestion,
} from "./contact.controller";
import { requireAdmin, requireAuth } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.post("/", sendContactMsg);
router.post("/report-question", reportQuestion);

router.use(requireAuth, requireAdmin);
router.get("/", getContactMsgs);
router.get("/:id/:type", getContactMsg);
router.patch("/:id/:type", updateContactMsg);

export default router;
