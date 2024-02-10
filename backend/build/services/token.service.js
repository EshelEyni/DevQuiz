"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = require("./error.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
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
function createPasswordResetToken() {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const hashedToken = crypto_1.default.createHash("sha256").update(resetToken).digest("hex");
    return hashedToken;
}
exports.default = { getTokenFromRequest, signToken, verifyToken, createPasswordResetToken };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy90b2tlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsbURBQTJDO0FBQzNDLGdFQUErQjtBQUMvQixvREFBNEI7QUFDNUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLFNBQVMsbUJBQW1CLENBQUMsR0FBWTtJQUN2QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLElBQUksZ0JBQWdCLENBQUM7SUFDckIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdFLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQztJQUMvRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxFQUFVO0lBQzNCLE1BQU0sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQzdELElBQUksQ0FBQyxlQUFlO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkYsSUFBSSxDQUFDLG1CQUFtQjtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTNGLE1BQU0sS0FBSyxHQUFHLHNCQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFO1FBQzlDLFNBQVMsRUFBRSxtQkFBbUI7S0FDL0IsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEtBQUs7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6RCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxLQUFLLFVBQVUsV0FBVyxDQUFDLEtBQWE7SUFDdEMsSUFBSTtRQUNGLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlO1lBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkYsTUFBTSxPQUFPLEdBQUcsc0JBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FHaEQsQ0FBQztRQUVGLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzVCLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQy9CO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQUVELFNBQVMsd0JBQXdCO0lBQy9CLE1BQU0sVUFBVSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxNQUFNLFdBQVcsR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxrQkFBZSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyJ9