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
app.get("/**", (req, res) => {
    res.sendFile(path_1.default.join(path_1.default.resolve(), "build", "public", "index.html"));
});
app.all("*", (req, res, next) => {
    next(new error_service_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(error_service_1.errorHandler);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsb0ZBQTBEO0FBQzFELHdHQUF1RTtBQUN2RSw4Q0FBc0I7QUFDdEIsZ0RBQXdCO0FBQ3hCLGtFQUF5QztBQUN6QyxnREFBd0I7QUFDeEIsdUVBQWdFO0FBQ2hFLDREQUFrRTtBQUNsRSw0RkFBdUU7QUFDdkUseUVBQWdEO0FBQ2hELHlFQUFnRDtBQUNoRCxxRkFBNEQ7QUFDNUQsMEVBQWlFO0FBRWpFLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQztBQUV4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sR0FBRSxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHVCQUFZLEdBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsaUJBQU8sQ0FBQyxJQUFJLENBQUM7SUFDWCxLQUFLLEVBQUUsTUFBTTtDQUNkLENBQUMsQ0FDSCxDQUFDO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNkJBQXNCLENBQUMsQ0FBQztBQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLHFDQUFjLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0NBQW9CLEdBQUUsQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQWdCLENBQUMsQ0FBQztBQUMxQixHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEsYUFBRyxFQUFDO0lBQ0YsU0FBUyxFQUFFLEVBQUUsRUFBRSxvQ0FBb0M7Q0FDcEQsQ0FBQyxDQUNILENBQUM7QUFFRixPQUFPO0FBQ1AsSUFBSSxTQUFTLEVBQUU7SUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkU7S0FBTTtJQUNMLE1BQU0sV0FBVyxHQUFHO1FBQ2xCLE1BQU0sRUFBRTtZQUNOLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHVCQUF1QjtTQUN4QjtRQUNELFdBQVcsRUFBRSxJQUFJO0tBQ2xCLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Q0FDNUI7QUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO0lBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQzFELElBQUEsaUNBQWEsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxxQkFBVSxDQUFDLENBQUM7QUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUscUJBQVUsQ0FBQyxDQUFDO0FBQ2pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHlCQUFjLENBQUMsQ0FBQztBQUV6QyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUM3QyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDL0QsSUFBSSxDQUFDLElBQUksd0JBQVEsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxXQUFXLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUFZLENBQUMsQ0FBQztBQUV0QixrQkFBZSxHQUFHLENBQUMifQ==