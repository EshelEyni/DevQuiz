"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_service_1 = require("../../services/util.service");
const server_1 = require("../../server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ravendb_1 = require("ravendb");
const error_service_1 = require("../../services/error.service");
const COLLECTION_NAME = "Users";
async function query(queryString) {
    const users = (await (0, util_service_1.queryRavenDB)(queryString, "Users"));
    for (const user of users) {
        user.id = (0, util_service_1.trimCollectionNameFromId)(user.id);
    }
    return users;
}
async function getById(userId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, userId);
    const user = await session.load(id);
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    user.id = (0, util_service_1.trimCollectionNameFromId)(user.id);
    return user;
}
async function getByUserName(username) {
    const session = server_1.ravenStore.openSession();
    const user = await session
        .query({ collection: COLLECTION_NAME })
        .whereEquals("username", username)
        .firstOrNull();
    return user;
}
async function add(userToAdd) {
    const session = server_1.ravenStore.openSession();
    await _validateUser(session, userToAdd);
    const doc = (await getDefaultUser(userToAdd));
    doc["@metadata"] = { "@collection": COLLECTION_NAME };
    await session.store(doc, COLLECTION_NAME + "/");
    await session.saveChanges();
    doc.id = (0, util_service_1.trimCollectionNameFromId)(doc.id);
    return doc;
}
async function update(user) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, user.id);
    const doc = await session.load(id);
    if (!doc)
        throw new error_service_1.AppError("User not found", 404);
    // Prevent user from adding admin role
    user.roles = doc.roles;
    Object.assign(doc, user);
    await _validateUser(session, doc);
    await session.saveChanges();
    const updatedUser = { ...doc };
    return updatedUser;
}
async function remove(userId) {
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, userId);
    const session = server_1.ravenStore.openSession();
    await session.delete(id);
    await session.saveChanges();
}
async function addUserCorrectAnswer(userId, questionId, language, level) {
    const session = server_1.ravenStore.openSession();
    const isAnswerAlreadyAdded = await session
        .query({ collection: "UserCorrectAnswers" })
        .whereEquals("userId", userId)
        .whereEquals("questionId", questionId)
        .firstOrNull();
    if (isAnswerAlreadyAdded)
        return false;
    const doc = { userId, questionId, language, level };
    doc["@metadata"] = { "@collection": "UserCorrectAnswers" };
    await session.store(doc);
    await session.saveChanges();
    return true;
}
async function removeUserCorrectAnswers({ loggedinUserId, language, level, }) {
    const session = server_1.ravenStore.openSession();
    const indexQuery = new ravendb_1.IndexQuery();
    indexQuery.query = `from 'UserCorrectAnswers' where userId = '${loggedinUserId}'`;
    if (language)
        indexQuery.query += ` and language = '${language}'`;
    if (level)
        indexQuery.query += ` and level = '${level}'`;
    const operation = new ravendb_1.DeleteByQueryOperation(indexQuery);
    await session.advanced.documentStore.operations.send(operation);
    await session.saveChanges();
}
async function getUserStats(userId) {
    const session = server_1.ravenStore.openSession();
    const answersData = (await session
        .query({ collection: "UserCorrectAnswers" })
        .groupBy("userId", "language", "level")
        .selectKey("userId")
        .selectKey("language")
        .selectKey("level")
        .selectCount()
        .whereEquals("userId", userId)
        .all());
    const answersCount = answersData.reduce((acc, curr) => {
        const { language, level, count } = curr;
        acc[language] = acc[language] || {};
        acc[language]["total"] = acc[language]["total"] || 0;
        acc[language]["total"] += count;
        acc[language][level] = count;
        return acc;
    }, {});
    const questionsData = (await session
        .query({ collection: "Questions" })
        .groupBy("language", "level")
        .selectKey("language")
        .selectKey("level")
        .selectCount()
        .all());
    const questionsCount = questionsData.reduce((acc, curr) => {
        const { language, level, count } = curr;
        acc[language] = acc[language] || {};
        acc[language]["total"] = acc[language]["total"] || 0;
        acc[language]["total"] += count;
        acc[language][level] = count;
        return acc;
    }, {});
    return { answersCount, questionsCount };
}
async function getDefaultUser(user) {
    return {
        id: "",
        ...user,
        password: await getHashedPassword(user.password),
        passwordConfirm: await getHashedPassword(user.passwordConfirm),
        roles: ["user"],
        createdAt: Date.now(),
        quizSettings: {
            language: "HTML",
            level: "beginner",
            numQuestions: 25,
            secondsPerQuestion: 30,
        },
        searchSettings: {
            language: "HTML",
            level: "beginner",
            searchTerm: "",
            approved: { name: "All", value: undefined },
            marked: { name: "All", value: undefined },
        },
    };
}
async function getHashedPassword(password) {
    const salt = await bcryptjs_1.default.genSalt(12);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    return hashedPassword;
}
async function _validateUser(session, user) {
    const { email, username } = user;
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, user.id);
    const emailQuery = session.query({ collection: COLLECTION_NAME }).whereEquals("email", email);
    if (user.id)
        emailQuery.whereNotEquals("id", id);
    const userWithSameEmail = await emailQuery.firstOrNull();
    if (userWithSameEmail)
        throw new error_service_1.AppError("User with same email already exists", 400);
    const usernameQuery = session
        .query({ collection: COLLECTION_NAME })
        .whereEquals("username", username);
    if (user.id)
        usernameQuery.whereNotEquals("id", id);
    const userWithSameUsername = await usernameQuery.firstOrNull();
    if (userWithSameUsername)
        throw new error_service_1.AppError("User with same username already exists", 400);
}
exports.default = {
    query,
    getById,
    getByUserName,
    add,
    update,
    remove,
    addUserCorrectAnswer,
    getUserStats,
    removeUserCorrectAnswers,
    getHashedPassword,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS91c2VyL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUtxQztBQUNyQyx5Q0FBMEM7QUFTMUMsd0RBQThCO0FBQzlCLHFDQUErRTtBQUMvRSxnRUFBd0Q7QUFFeEQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDO0FBRWhDLEtBQUssVUFBVSxLQUFLLENBQUMsV0FBd0I7SUFDM0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUEsMkJBQVksRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQTRCLENBQUM7SUFDcEYsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7UUFDeEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM3QztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELEtBQUssVUFBVSxPQUFPLENBQUMsTUFBYztJQUNuQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUEsb0NBQXFCLEVBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBYSxFQUFFLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBQSx1Q0FBd0IsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxRQUFnQjtJQUMzQyxNQUFNLE9BQU8s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