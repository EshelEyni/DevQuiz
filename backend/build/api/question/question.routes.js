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
router.get("/duplicates", question_controller_1.findDuplicatedQuestions);
router.post("/", question_controller_1.addQuestion);
router.put("/archive", question_controller_1.archiveQuestion);
router.put("/", question_controller_1.updateQuestion);
router.delete("/:id", question_controller_1.removeQuestion);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24ucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9xdWVzdGlvbi9xdWVzdGlvbi5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsK0RBUStCO0FBQy9CLHFGQUFxRjtBQUVyRixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGtDQUFZLENBQUMsQ0FBQztBQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHFDQUFlLENBQUMsQ0FBQztBQUVyRCxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFXLEVBQUUscUNBQVksQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLDZDQUF1QixDQUFDLENBQUM7QUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsaUNBQVcsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLHFDQUFlLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQ0FBYyxDQUFDLENBQUM7QUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsb0NBQWMsQ0FBQyxDQUFDO0FBRXRDLGtCQUFlLE1BQU0sQ0FBQyJ9