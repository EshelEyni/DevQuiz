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
    return {
        savedUser: savedUser,
        token,
    };
}
async function updateUserWithResetToken(userId) {
    const resetToken = token_service_1.default.createPasswordResetToken();
    const session = server_1.ravenStore.openSession();
    const user = await session.load(userId);
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await session.saveChanges();
    return user;
}
async function changePassword(resetToken, newPassword, newPasswordConfirm) {
    const session = server_1.ravenStore.openSession();
    const user = await session
        .query({ collection: "Users" })
        .whereEquals("passwordResetToken", resetToken)
        .firstOrNull();
    if (!user)
        throw new error_service_1.AppError("Token is invalid", 400);
    if (!user.passwordResetExpires)
        throw new error_service_1.AppError("Token has expired", 400);
    if (new Date(user.passwordResetExpires).getTime() < Date.now())
        throw new error_service_1.AppError("Token has expired", 400);
    user.password = await user_service_1.default.getHashedPassword(newPassword);
    user.passwordConfirm = await user_service_1.default.getHashedPassword(newPasswordConfirm);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await session.saveChanges();
    return true;
}
async function _checkPassword(candidatePassword, userPassword) {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
}
exports.default = {
    login,
    autoLogin,
    signup,
    updateUserWithResetToken,
    changePassword,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGdFQUF3RDtBQUN4RCx3REFBOEI7QUFDOUIsaUZBQXdEO0FBQ3hELHlDQUEwQztBQUMxQyx3RUFBK0M7QUFDL0MsOERBQXVFO0FBRXZFLEtBQUssVUFBVSxLQUFLLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtJQUNyRCxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTztTQUN2QixLQUFLLENBQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDcEMsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7U0FDakMsV0FBVyxFQUFFLENBQUM7SUFDakIsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsdUNBQXdCLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RSxJQUFJLENBQUMsaUJBQWlCO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEYsTUFBTSxLQUFLLEdBQUcsdUJBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBdUI7UUFDN0IsS0FBSztLQUNOLENBQUM7QUFDSixDQUFDO0FBRUQsS0FBSyxVQUFVLFNBQVMsQ0FBQyxVQUFrQjtJQUN6QyxNQUFNLGFB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