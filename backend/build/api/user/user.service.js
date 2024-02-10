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
        id: (0, util_service_1.trimCollectionNameFromId)(doc.id),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS91c2VyL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUtxQztBQUNyQyx5Q0FBMEM7QUFTMUMsd0RBQThCO0FBQzlCLHFDQUErRTtBQUMvRSxnRUFBd0Q7QUFFeEQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDO0FBRWhDLEtBQUssVUFBVSxLQUFLLENBQUMsV0FBd0I7SUFDM0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUEsMkJBQVksRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQTRCLENBQUM7SUFDcEYsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7UUFDeEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM3QztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELEtBQUssVUFBVSxPQUFPLENBQUMsTUFBYztJQUNuQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUEsb0NBQXFCLEVBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBYSxFQUFFLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBQSx1Q0FBd0IsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxRQUFnQjtJQUMzQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTztTQUN2QixLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLENBQUM7U0FDdEMsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7U0FDakMsV0FBVyxFQUFFLENBQUM7SUFDakIsT0FBTyxJQUFrQixDQUFDO0FBQzVCLENBQUM7QUFFRCxLQUFLLFVBQVUsR0FBRyxDQUFDLFNBQW9CO0lBQ3JDLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQXVCLENBQUMsQ0FBQztJQUN0RCxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUE0QyxDQUFDO0lBQ3pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsQ0FBQztJQUN0RCxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsRUFBRSxHQUFHLElBQUEsdUNBQXdCLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELEtBQUssVUFBVSxNQUFNLENBQUMsSUFBZ0I7SUFDcEMsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEVBQUUsR0FBRyxJQUFBLG9DQUFxQixFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxHQUFHO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsc0NBQXNDO0lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QixNQUFNLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsTUFBTSxXQUFXLEdBQUc7UUFDbEIsR0FBRyxHQUFHO1FBQ04sRUFBRSxFQUFFLElBQUEsdUNBQXdCLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztLQUNyQyxDQUFDO0lBQ0YsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELEtBQUssVUFBVSxNQUFNLENBQUMsTUFBYztJQUNsQyxNQUFNLEVBQUUsR0FBRyxJQUFBLG9DQUFxQixFQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRUQsS0FBSyxVQUFVLG9CQUFvQixDQUNqQyxNQUFjLEVBQ2QsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsS0FBYTtJQUViLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLE9BQU87U0FDdkMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUM7U0FDM0MsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDN0IsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7U0FDckMsV0FBVyxFQUFFLENBQUM7SUFFakIsSUFBSSxvQkFBb0I7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBeUMsQ0FBQztJQUMzRixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztJQUMzRCxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsS0FBSyxVQUFVLHdCQUF3QixDQUFDLEVBQ3RDLGNBQWMsRUFDZCxRQUFRLEVBQ1IsS0FBSyxHQUtOO0lBQ0MsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztJQUNwQyxVQUFVLENBQUMsS0FBSyxHQUFHLDZDQUE2QyxjQUFjLEdBQUcsQ0FBQztJQUNsRixJQUFJLFFBQVE7UUFBRSxVQUFVLENBQUMsS0FBSyxJQUFJLG9CQUFvQixRQUFRLEdBQUcsQ0FBQztJQUNsRSxJQUFJLEtBQUs7UUFBRSxVQUFVLENBQUMsS0FBSyxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQztJQUN6RCxNQUFNLFNBQVMsR0FBRyxJQUFJLGdDQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVksQ0FBQyxNQUFjO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLE9BQU87U0FDL0IsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUM7U0FDM0MsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO1NBQ3RDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDbkIsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUNyQixTQUFTLENBQUMsT0FBTyxDQUFDO1NBQ2xCLFdBQVcsRUFBRTtTQUNiLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1NBQzdCLEdBQUcsRUFBRSxDQUFrQixDQUFDO0lBRTNCLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDaEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsRUFBRSxFQUEwQixDQUFDLENBQUM7SUFFL0IsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLE9BQU87U0FDakMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDO1NBQ2xDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO1NBQzVCLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDckIsU0FBUyxDQUFDLE9BQU8sQ0FBQztTQUNsQixXQUFXLEVBQUU7U0FDYixHQUFHLEVBQUUsQ0FBb0IsQ0FBQztJQUU3QixNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3hELE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztRQUN4QyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBMEIsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLENBQUM7QUFDMUMsQ0FBQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsSUFBZTtJQUMzQyxPQUFPO1FBQ0wsRUFBRSxFQUFFLEVBQUU7UUFDTixHQUFHLElBQUk7UUFDUCxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hELGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUQsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDckIsWUFBWSxFQUFFO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsa0JBQWtCLEVBQUUsRUFBRTtTQUN2QjtLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsS0FBSyxVQUFVLGlCQUFpQixDQUFDLFFBQWdCO0lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQztBQUVELEtBQUssVUFBVSxhQUFhLENBQUMsT0FBeUIsRUFBRSxJQUFnQjtJQUN0RSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNqQyxNQUFNLEVBQUUsR0FBRyxJQUFBLG9DQUFxQixFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUYsSUFBSSxJQUFJLENBQUMsRUFBRTtRQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekQsSUFBSSxpQkFBaUI7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV0RixNQUFNLGFBQWEsR0FBRyxPQUFPO1NBQzFCLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQztTQUN0QyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLElBQUksSUFBSSxDQUFDLEVBQUU7UUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxNQUFNLG9CQUFvQixHQUFHLE1BQU0sYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9ELElBQUksb0JBQW9CO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQUVELGtCQUFlO0lBQ2IsS0FBSztJQUNMLE9BQU87SUFDUCxhQUFhO0lBQ2IsR0FBRztJQUNILE1BQU07SUFDTixNQUFNO0lBQ04sb0JBQW9CO0lBQ3BCLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsaUJBQWlCO0NBQ2xCLENBQUMifQ==