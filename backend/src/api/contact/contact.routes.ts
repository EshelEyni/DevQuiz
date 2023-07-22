import express from "express";
import { getContactMsgs, updateContactMsg, addContactMsg } from "./contact.controller";
import { requireAdmin, requireAuth } from "../../middlewares/requireAuth.middleware";

const router = express.Router();

router.post("/", addContactMsg);

router.use(requireAuth, requireAdmin);
router.get("/", getContactMsgs);
router.put("/", updateContactMsg);

export default router;
