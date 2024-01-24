import express from "express";
import { login, autoLogin, signup, logout, updateUser } from "./auth.controller";
import { authRequestLimiter } from "../../services/rate-limiter.service";

const router = express.Router();

router.post("/auto-login", autoLogin);

router.use(authRequestLimiter);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.put("/update", updateUser);

export default router;
