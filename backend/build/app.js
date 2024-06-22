"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const html_sanitizer_middleware_1 = __importDefault(require("./middlewares/html-sanitizer.middleware"));
const hpp_1 = __importDefault(require("hpp"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const error_service_1 = require("./services/error.service");
const setupAls_middleware_1 = __importDefault(require("./middlewares/setupAls.middleware"));
const user_routes_1 = __importDefault(require("./api/user/user.routes"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const question_routes_1 = __importDefault(require("./api/question/question.routes"));
const application_routes_1 = __importDefault(require("./api/application/application.routes"));
const rate_limiter_service_1 = require("./services/rate-limiter.service");
const isProdEnv = process.env.NODE_ENV === "production";
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({
    limit: "10kb",
}));
app.all("*", setupAls_middleware_1.default);
app.use(rate_limiter_service_1.requestLimiter);
app.use((0, express_mongo_sanitize_1.default)());
app.use(html_sanitizer_middleware_1.default);
app.use((0, hpp_1.default)({
    whitelist: [], // add whitelisted query params here
}));
// cors
if (isProdEnv) {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "build", "public")));
}
else {
    const corsOptions = {
        origin: [
            "http://127.0.0.1:8080",
            "http://localhost:8080",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
if (!isProdEnv) {
    app.use((req, res, next) => {
        (0, logger_middleware_1.requestLogger)(req, res, next);
    });
}
app.use("/api/user", user_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/question", question_routes_1.default);
app.use("/api/application", application_routes_1.default);
app.get("/**", (req, res) => {
    res.sendFile(path_1.default.join(path_1.default.resolve(), "build", "public", "index.html"));
});
app.all("*", (req, res, next) => {
    next(new error_service_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(error_service_1.errorHandler);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsb0ZBQTBEO0FBQzFELHdHQUF1RTtBQUN2RSw4Q0FBc0I7QUFDdEIsZ0RBQXdCO0FBQ3hCLGtFQUF5QztBQUN6QyxnREFBd0I7QUFDeEIsdUVBQWdFO0FBQ2hFLDREQUFrRTtBQUNsRSw0RkFBdUU7QUFDdkUseUVBQWdEO0FBQ2hELHlFQUFnRDtBQUNoRCxxRkFBNEQ7QUFDNUQsOEZBQXFFO0FBQ3JFLDBFQUFpRTtBQUVqRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFFeEQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUNMLGlCQUFPLENBQUMsSUFBSSxDQUFDO0lBQ1gsS0FBSyxFQUFFLE1BQU07Q0FDZCxDQUFDLENBQ0gsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDZCQUFzQixDQUFDLENBQUM7QUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQ0FBYyxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdDQUFvQixHQUFFLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1DQUFnQixDQUFDLENBQUM7QUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FDTCxJQUFBLGFBQUcsRUFBQztJQUNGLFNBQVMsRUFBRSxFQUFFLEVBQUUsb0NBQW9DO0NBQ3BELENBQUMsQ0FDSCxDQUFDO0FBRUYsT0FBTztBQUNQLElBQUksU0FBUyxFQUFFO0lBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZFO0tBQU07SUFDTCxNQUFNLFdBQVcsR0FBRztRQUNsQixNQUFNLEVBQUU7WUFDTix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHVCQUF1QjtZQUN2Qix1QkFBdUI7U0FDeEI7UUFDRCxXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0NBQzVCO0FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUNkLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUMxRCxJQUFBLGlDQUFhLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztDQUNKO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUscUJBQVUsQ0FBQyxDQUFDO0FBQ2pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLHFCQUFVLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSx5QkFBYyxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSw0QkFBaUIsQ0FBQyxDQUFDO0FBRS9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMvRCxJQUFJLENBQUMsSUFBSSx3QkFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsNEJBQVksQ0FBQyxDQUFDO0FBRXRCLGtCQUFlLEdBQUcsQ0FBQyJ9