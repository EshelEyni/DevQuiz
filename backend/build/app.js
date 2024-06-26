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
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:"],
    },
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsb0ZBQTBEO0FBQzFELHdHQUF1RTtBQUN2RSw4Q0FBc0I7QUFDdEIsZ0RBQXdCO0FBQ3hCLGtFQUF5QztBQUN6QyxnREFBd0I7QUFDeEIsdUVBQWdFO0FBQ2hFLDREQUFrRTtBQUNsRSw0RkFBdUU7QUFDdkUseUVBQWdEO0FBQ2hELHlFQUFnRDtBQUNoRCxxRkFBNEQ7QUFDNUQsOEZBQXFFO0FBQ3JFLDBFQUFpRTtBQUVqRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFFeEQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsZ0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMzQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDO0tBQ3RDO0NBQ0YsQ0FBQyxDQUNILENBQUM7QUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsdUJBQVksR0FBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FDTCxpQkFBTyxDQUFDLElBQUksQ0FBQztJQUNYLEtBQUssRUFBRSxNQUFNO0NBQ2QsQ0FBQyxDQUNILENBQUM7QUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw2QkFBc0IsQ0FBQyxDQUFDO0FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMscUNBQWMsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxnQ0FBb0IsR0FBRSxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQ0FBZ0IsQ0FBQyxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsSUFBQSxhQUFHLEVBQUM7SUFDRixTQUFTLEVBQUUsRUFBRSxFQUFFLG9DQUFvQztDQUNwRCxDQUFDLENBQ0gsQ0FBQztBQUVGLE9BQU87QUFDUCxJQUFJLFNBQVMsRUFBRTtJQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2RTtLQUFNO0lBQ0wsTUFBTSxXQUFXLEdBQUc7UUFDbEIsTUFBTSxFQUFFO1lBQ04sdUJBQXVCO1lBQ3ZCLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsdUJBQXVCO1NBQ3hCO1FBQ0QsV0FBVyxFQUFFLElBQUk7S0FDbEIsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUM1QjtBQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDZCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDMUQsSUFBQSxpQ0FBYSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUVELEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLHFCQUFVLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxxQkFBVSxDQUFDLENBQUM7QUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUseUJBQWMsQ0FBQyxDQUFDO0FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsNEJBQWlCLENBQUMsQ0FBQztBQUUvQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUM3QyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDL0QsSUFBSSxDQUFDLElBQUksd0JBQVEsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxXQUFXLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUFZLENBQUMsQ0FBQztBQUV0QixrQkFBZSxHQUFHLENBQUMifQ==