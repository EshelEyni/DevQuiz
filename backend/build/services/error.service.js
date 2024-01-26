"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatchRequestBody = exports.asyncErrorCatcher = exports.errorHandler = exports.AppError = void 0;
const logger_service_1 = require("./logger.service");
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    code;
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    function handleCastErrorDB(err) {
        const dbProperty = err.path === "_id" ? "id" : err.path;
        const message = `Invalid ${dbProperty}: ${err.value}.`;
        return new AppError(message, 400);
    }
    function handleDuplicateFieldsDB(err) {
        const { keyValue } = err;
        const [key, value] = Object.entries(keyValue)[0];
        const message = `Duplicate ${key} value: ${value}. Please use another value!`;
        return new AppError(message, 400);
    }
    function handleValidationErrorDB(err) {
        const { message } = err;
        return new AppError(message, 400);
    }
    function sendErrorDev(err, res) {
        res.status(err.statusCode).send({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    function sendErrorProd(err, res) {
        if (err.isOperational) {
            res.status(err.statusCode).send({
                status: err.status,
                message: err.message,
            });
        }
        else {
            res.status(500).send({
                status: "error",
                message: "Something went very wrong!",
            });
        }
    }
    function handleJWTError() {
        return new AppError("Invalid token. Please log in again!", 401);
    }
    function handleJWTExpiredError() {
        return new AppError("Your token has expired! Please log in again.", 401);
    }
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
        sendErrorDev(err, res);
    }
    else {
        let error = { ...err, message: err.message, name: err.name };
        if (error.name === "CastError")
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError")
            error = handleValidationErrorDB(error);
        if (error.name === "JsonWebTokenError")
            error = handleJWTError();
        if (error.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
    logger_service_1.logger.error(err.message);
};
exports.errorHandler = errorHandler;
const asyncErrorCatcher = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.asyncErrorCatcher = asyncErrorCatcher;
const validatePatchRequestBody = (body) => {
    if (Object.keys(body).length === 0) {
        throw new AppError("No data received in the request. Please provide some properties to update.", 400);
    }
};
exports.validatePatchRequestBody = validatePatchRequestBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHFEQUEwQztBQUkxQyxNQUFNLFFBQVMsU0FBUSxLQUFLO0lBQzFCLFVBQVUsQ0FBUztJQUNuQixNQUFNLENBQVM7SUFDZixhQUFhLENBQVU7SUFDdkIsSUFBSSxDQUFVO0lBRWQsWUFBWSxPQUFlLEVBQUUsVUFBa0IsRUFBRSxJQUFhO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQXVGUSw0QkFBUTtBQXJGakIsNkRBQTZEO0FBQzdELE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBUSxFQUFFO0lBQ3ZGLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUM7SUFDdkMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQztJQUVuQyxTQUFTLGlCQUFpQixDQUFDLEdBQVE7UUFDakMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUks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