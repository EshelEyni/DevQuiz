"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const als_service_1 = require("../services/als.service");
const error_service_1 = require("../services/error.service");
const token_service_1 = __importDefault(require("../services/token.service"));
const setupAsyncLocalStorage = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const storage = {};
    als_service_1.asyncLocalStorage.run(storage, async () => {
        const token = token_service_1.default.getTokenFromRequest(req);
        if (!token)
            return next();
        const verifiedToken = await token_service_1.default.verifyToken(token);
        if (!verifiedToken)
            return next();
        const alsStore = als_service_1.asyncLocalStorage.getStore();
        alsStore.loggedinUserId = verifiedToken.id;
        req.loggedinUserId = verifiedToken.id;
        next();
    });
});
exports.default = setupAsyncLocalStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXBBbHMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9zZXR1cEFscy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EseURBQTREO0FBQzVELDZEQUE4RDtBQUM5RCw4RUFBcUQ7QUFJckQsTUFBTSxzQkFBc0IsR0FBRyxJQUFBLGlDQUFpQixFQUM5QyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDeEQsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDeEMsTUFBTSxLQUFLLEdBQUcsdUJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDMUIsTUFBTSxhQUFhLEdBQUcsTUFBTSx1QkFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsTUFBTSxRQUFRLEdBQUcsK0JBQWlCLENBQUMsUUFBUSxFQUFpQixDQUFDO1FBQzdELFFBQVEsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxHQUFHLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFFdEMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDO0FBRUYsa0JBQWUsc0JBQXNCLENBQUMifQ==