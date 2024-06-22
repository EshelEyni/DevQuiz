"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("./application.controller");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const router = express_1.default.Router();
router.use(requireAuth_middleware_1.requireAuth);
router.get("/", application_controller_1.getApplications);
router.get("/:id([0-9]{19}-[A-Z])", application_controller_1.getApplicationById);
router.post("/", application_controller_1.addApplication);
router.put("/archive", application_controller_1.archiveApplication);
router.put("/", application_controller_1.updateApplication);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24ucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIscUVBTWtDO0FBQ2xDLHFGQUF1RTtBQUV2RSxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQVcsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHdDQUFlLENBQUMsQ0FBQztBQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLDJDQUFrQixDQUFDLENBQUM7QUFFeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsdUNBQWMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLDJDQUFrQixDQUFDLENBQUM7QUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsMENBQWlCLENBQUMsQ0FBQztBQUVuQyxrQkFBZSxNQUFNLENBQUMifQ==