"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const rate_limiter_service_1 = require("../../services/rate-limiter.service");
const router = express_1.default.Router();
router.post("/auto-login", auth_controller_1.autoLogin);
router.put("/update", auth_controller_1.updateUser);
router.use(rate_limiter_service_1.authRequestLimiter);
router.post("/login", auth_controller_1.login);
router.post("/signup", auth_controller_1.signup);
router.post("/logout", auth_controller_1.logout);
router.post("/send-reset-password/:username", auth_controller_1.sendResetPassword);
router.post("/change-password", auth_controller_1.changePassword);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2F1dGgvYXV0aC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsdURBUTJCO0FBQzNCLDhFQUF5RTtBQUV6RSxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFFbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5Q0FBa0IsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHVCQUFLLENBQUMsQ0FBQztBQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3QkFBTSxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsd0JBQU0sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsbUNBQWlCLENBQUMsQ0FBQztBQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGdDQUFjLENBQUMsQ0FBQztBQUVoRCxrQkFBZSxNQUFNLENBQUMifQ==