"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLimiter = exports.authRequestLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const getRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 2000,
    message: "Too many GET requests, please try again later",
});
const postRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many POST requests, please try again later",
});
const patchRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: "Too many PATCH requests, please try again later",
});
const deleteRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many DELETE requests, please try again later",
});
const authRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: "Too many authentication requests, please try again later",
});
exports.authRequestLimiter = authRequestLimiter;
const requestLimiter = (req, res, next) => {
    if (req.method === "GET") {
        getRequestLimiter(req, res, next);
    }
    else if (req.method === "POST") {
        postRequestLimiter(req, res, next);
    }
    else if (req.method === "PATCH") {
        patchRequestLimiter(req, res, next);
    }
    else if (req.method === "DELETE") {
        deleteRequestLimiter(req, res, next);
    }
    else {
        next();
    }
};
exports.requestLimiter = requestLimiter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS1saW1pdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvcmF0ZS1saW1pdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQTJDO0FBRzNDLE1BQU0saUJBQWlCLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ2xDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLElBQUk7SUFDVCxPQUFPLEVBQUUsK0NBQStDO0NBQ3pELENBQUMsQ0FBQztBQUVILE1BQU0sa0JBQWtCLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ25DLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLElBQUk7SUFDVCxPQUFPLEVBQUUsZ0RBQWdEO0NBQzFELENBQUMsQ0FBQztBQUVILE1BQU0sbUJBQW1CLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ3BDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLEdBQUc7SUFDUixPQUFPLEVBQUUsaURBQWlEO0NBQzNELENBQUMsQ0FBQztBQUVILE1BQU0sb0JBQW9CLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ3JDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLEdBQUc7SUFDUixPQUFPLEVBQUUsa0RBQWtEO0NBQzVELENBQUMsQ0FBQztBQUVILE1BQU0sa0JBQWtCLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ25DLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLEVBQUU7SUFDUCxPQUFPLEVBQUUsMERBQTBEO0NBQ3BFLENBQUMsQ0FBQztBQWdCTSxnREFBa0I7QUFkM0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQVMsRUFBRSxFQUFFO0lBQ2hFLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDeEIsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDaEMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7UUFDakMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyQztTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDbEMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0QztTQUFNO1FBQ0wsSUFBSSxFQUFFLENBQUM7S0FDUjtBQUNILENBQUMsQ0FBQztBQUUyQix3Q0FBYyJ9