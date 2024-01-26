"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const router = express_1.default.Router();
router.use(requireAuth_middleware_1.requireAuth);
router.post("/correct-answer", user_controller_1.addUserCorrectAnswer);
router.delete("/correct-answer", user_controller_1.removeUserCorrectAnswers);
router.get("/user-stats", user_controller_1.getUserStats);
router.use(requireAuth_middleware_1.requireAdmin);
router.get("/:id", user_controller_1.getUserById);
router.put("/", user_controller_1.updateUser);
router.post("/", user_controller_1.addUser);
router.get("/", user_controller_1.getUsers);
router.delete("/:id", user_controller_1.removeUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL3VzZXIvdXNlci5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsdURBUzJCO0FBQzNCLHFGQUFxRjtBQUVyRixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQVcsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsc0NBQW9CLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLDBDQUF3QixDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsOEJBQVksQ0FBQyxDQUFDO0FBRXhDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQVksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLDZCQUFXLENBQUMsQ0FBQztBQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUseUJBQU8sQ0FBQyxDQUFDO0FBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDBCQUFRLENBQUMsQ0FBQztBQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSw0QkFBVSxDQUFDLENBQUM7QUFFbEMsa0JBQWUsTUFBTSxDQUFDIn0=