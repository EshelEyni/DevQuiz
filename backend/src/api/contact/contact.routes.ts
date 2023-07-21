import express from "express";
import { getContactMsgs, sendContactMsg, reportQuestion } from "./contact.controller";
import { requireAdmin, requireAuth } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.post("/", sendContactMsg);
router.post("/report-question", reportQuestion);

router.use(requireAuth, requireAdmin);
router.get("/", getContactMsgs);

export default router;
