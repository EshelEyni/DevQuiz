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
    const updatedUser = {
        ...doc,
        id: (0, util_service_1.trimCollectionNameFromId)(doc.id) || doc.id,
    };
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