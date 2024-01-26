"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = require("../../services/error.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_service_1 = __importDefault(require("../../services/token.service"));
const server_1 = require("../../server");
const user_service_1 = __importDefault(require("../user/user.service"));
const util_service_1 = require("../../services/util.service");
// import { sendEmail } from "../../services/email.service";
async function login(username, password) {
    const session = server_1.ravenStore.openSession();
    const user = await session
        .query({ collection: "Users" })
        .whereEquals("username", username)
        .firstOrNull();
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    user.id = (0, util_service_1.trimCollectionNameFromId)(user.id);
    const isCorrectPassword = await _checkPassword(password, user.password);
    if (!isCorrectPassword)
        throw new error_service_1.AppError("Incorrect username or password", 400);
    const token = token_service_1.default.signToken(user.id);
    return {
        user: user,
        token,
    };
}
async function autoLogin(loginToken) {
    const verifiedToken = await token_service_1.default.verifyToken(loginToken);
    if (!verifiedToken)
        throw new error_service_1.AppError("Invalid token", 400);
    const { id } = verifiedToken;
    const user = await user_service_1.default.getById(id);
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    const newToken = token_service_1.default.signToken(user.id);
    return {
        user: user,
        newToken,
    };
}
async function signup(user) {
    const savedUser = await user_service_1.default.add(user);
    const token = token_service_1.default.signToken(savedUser.id);
    // sendEmail({
    //   email: user.email,
    //   subject: "Welcome to DevQuiz!",
    //   message: `Welcome to DevQuiz, ${user.username}!`,
    // });
    return {
        savedUser: savedUser,
        token,
    };
}
async function _checkPassword(candidatePassword, userPassword) {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
}
exports.default = {
    login,
    autoLogin,
    signup,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGdFQUF3RDtBQUN4RCx3REFBOEI7QUFDOUIsaUZBQXdEO0FBQ3hELHlDQUEwQztBQUMxQyx3RUFBK0M7QUFDL0MsOERBQXVFO0FBQ3ZFLDREQUE0RDtBQUU1RCxLQUFLLFVBQVUsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7SUFDckQsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU87U0FDdkIsS0FBSyxDQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQ3BDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO1NBQ2pDLFdBQVcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEUsSUFBSSxDQUFDLGlCQUFpQjtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sS0FBSyxHQUFHLHVCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxPQUFPO1FBQ0wsSUFBSSxFQUFFLElBQXVCO1FBQzdCLEtBQUs7S0FDTixDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxTQUFTLENBQUMsVUFBa0I7SUFDekMsTUFBTSxhQUFhLEdBQUcsTUFBTSx1QkFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxJQUFJLENBQUMsYUFBYTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsYUFBYSxDQUFDO0lBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0MsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRCxNQUFNLFFBQVEsR0FBRyx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsT0FBTztRQUNMLElBQUksRUFBRSxJQUF1QjtRQUM3QixRQUFRO0tBQ1QsQ0FBQztBQUNKLENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTSxDQUFDLElBQWU7SUFDbkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxzQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixvQ0FBb0M7SUFDcEMsc0RBQXNEO0lBQ3RELE1BQU07SUFDTixPQUFPO1FBQ0wsU0FBUyxFQUFFLFNBQTRCO1FBQ3ZDLEtBQUs7S0FDTixDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsaUJBQXlCLEVBQUUsWUFBb0I7SUFDM0UsT0FBTyxNQUFNLGtCQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFFRCxrQkFBZTtJQUNiLEtBQUs7SUFDTCxTQUFTO0lBQ1QsTUFBTTtDQUNQLENBQUMifQ==