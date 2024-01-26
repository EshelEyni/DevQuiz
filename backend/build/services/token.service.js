"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = require("./error.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
function getTokenFromRequest(req) {
    const { cookies } = req;
    let tokenFromHeaders;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        tokenFromHeaders = req.headers.authorization.split(" ")[1];
    const token = cookies.dev_quiz_jwt || tokenFromHeaders || null;
    return token;
}
function signToken(id) {
    const { JWT_SECRET_CODE, JWT_EXPIRATION_TIME } = process.env;
    if (!JWT_SECRET_CODE)
        throw new error_service_1.AppError("jwtSecretCode not found in config", 500);
    if (!JWT_EXPIRATION_TIME)
        throw new error_service_1.AppError("jwtExpirationTime not found in config", 500);
    const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET_CODE, {
        expiresIn: JWT_EXPIRATION_TIME,
    });
    if (!token)
        throw new error_service_1.AppError("Token not created", 500);
    return token;
}
async function verifyToken(token) {
    try {
        const { JWT_SECRET_CODE } = process.env;
        if (!JWT_SECRET_CODE)
            throw new error_service_1.AppError("jwtSecretCode not found in config", 500);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_CODE);
        const { id, iat } = decoded;
        return { id, timeStamp: iat };
    }
    catch (err) {
        return null;
    }
}
exports.default = { getTokenFromRequest, signToken, verifyToken };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy90b2tlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsbURBQTJDO0FBQzNDLGdFQUErQjtBQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFM0IsU0FBUyxtQkFBbUIsQ0FBQyxHQUFZO0lBQ3ZDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDeEIsSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0UsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDO0lBQy9ELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLEVBQVU7SUFDM0IsTUFBTSxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDN0QsSUFBSSxDQUFDLGVBQWU7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRixJQUFJLENBQUMsbUJBQW1CO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFM0YsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUU7UUFDOUMsU0FBUyxFQUFFLG1CQUFtQjtLQUMvQixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsS0FBSztRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELEtBQUssVUFBVSxXQUFXLENBQUMsS0FBYTtJQUN0QyxJQUFJO1FBQ0YsTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWU7WUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuRixNQUFNLE9BQU8sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUdoRCxDQUFDO1FBRUYsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDL0I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsa0JBQWUsRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==