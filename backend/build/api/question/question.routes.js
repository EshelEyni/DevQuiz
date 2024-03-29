"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("./question.controller");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const router = express_1.default.Router();
router.get("/", question_controller_1.getQuestions);
router.get("/:id([0-9]{19}-[A-Z])", question_controller_1.getQuestionById);
router.use(requireAuth_middleware_1.requireAuth, requireAuth_middleware_1.requireAdmin);
router.get("/lang-duplicates", question_controller_1.findDuplicatedQuestions);
router.get("/duplicates/:id", question_controller_1.findQuestionDuplications);
router.post("/", question_controller_1.addQuestion);
router.post("/fetch", question_controller_1.fetchQuestions);
router.put("/archive", question_controller_1.archiveQuestion);
router.put("/", question_controller_1.updateQuestion);
router.delete("/:id", question_controller_1.removeQuestion);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24ucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9xdWVzdGlvbi9xdWVzdGlvbi5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsK0RBVStCO0FBQy9CLHFGQUFxRjtBQUVyRixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGtDQUFZLENBQUMsQ0FBQztBQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHFDQUFlLENBQUMsQ0FBQztBQUVyRCxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFXLEVBQUUscUNBQVksQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsNkNBQXVCLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLDhDQUF3QixDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsaUNBQVcsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLG9DQUFjLENBQUMsQ0FBQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxxQ0FBZSxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsb0NBQWMsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG9DQUFjLENBQUMsQ0FBQztBQUV0QyxrQkFBZSxNQUFNLENBQUMifQ==