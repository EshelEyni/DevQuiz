import express from "express";
import { sendContactMsg, reportQuestion } from "./contact.controller";

const router = express.Router();

router.post("/", sendContactMsg);
router.post("/report-question", reportQuestion);

export default router;
