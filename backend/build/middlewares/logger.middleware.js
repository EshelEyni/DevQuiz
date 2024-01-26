"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const error_service_1 = require("../services/error.service");
const logger_service_1 = require("../services/logger.service");
exports.requestLogger = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const { method, originalUrl } = req;
    const start = Date.now();
    const str = `${method} ${originalUrl}`;
    logger_service_1.logger.info(str);
    res.on("finish", () => {
        if (res.statusCode >= 400) {
            return;
        }
        const duration = Date.now() - start;
        const str = `${method} ${originalUrl} ${res.statusCode} ${duration}ms`;
        logger_service_1.logger.success(str);
    });
    next();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZXMvbG9nZ2VyLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQThEO0FBQzlELCtEQUFvRDtBQUV2QyxRQUFBLGFBQWEsR0FBRyxJQUFBLGlDQUFpQixFQUM1QyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDeEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLHVCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUNwQixJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDcEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksV0FBVyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksUUFBUSxJQUFJLENBQUM7UUFDdkUsdUJBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FDRixDQUFDIn0=