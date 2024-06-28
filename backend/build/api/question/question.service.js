"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_service_1 = require("../../services/util.service");
const als_service_1 = require("../../services/als.service");
const server_1 = require("../../server");
const error_service_1 = require("../../services/error.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const COLLECTION_NAME = "Questions";
async function query(queryString) {
    const store = als_service_1.asyncLocalStorage.getStore();
    const loggedinUserId = store?.loggedinUserId;
    const { language, level, searchTerm, isMarkedToBeRevised, limit, page, isRevised, isManagePage } = queryString;
    const isMarkedToBeRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isMarkedToBeRevised);
    const isRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isRevised);
    const isUserAdmin = await getIsAdminUser(loggedinUserId);
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: COLLECTION_NAME });
    query.whereEquals("isArchived", false);
    if (!isManagePage)
        query.randomOrdering();
    if (isMarkedToBeRevisedBoolean !== undefined)
        query.whereEquals("isMarkedToBeRevised", isMarkedToBeRevisedBoolean);
    if (isManagePage && isRevisedBoolean !== undefined)
        query.whereEquals("isRevised", isRevisedBoolean);
    if (!isManagePage && !isUserAdmin)
        query.whereEquals("isRevised", true);
    if (language)
        query.whereEquals("language", language);
    if (level)
        query.whereEquals("level", level);
    if (limit)
        query.take(Number(limit));
    const skip = Number(page) * Number(limit);
    if (skip)
        query.skip(skip);
    if (loggedinUserId && !isManagePage) {
        const userCorrectAnswersIds = await session
            .query({
            collection: "UserCorrectAnswers",
        })
            .selectFields(["questionId"])
            .whereEquals("userId", loggedinUserId)
            .all();
        const docIdsToFilter = userCorrectAnswersIds.map(id => (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, id));
        query.not().whereIn("id()", docIdsToFilter);
    }
    if (searchTerm)
        query.search("question", `"${searchTerm}"`);
    const questions = await query.all();
    for (const question of questions)
        question.id = (0, util_service_1.trimCollectionNameFromId)(question.id);
    return questions;
}
async function getById(questionId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, questionId);
    const question = await session.load(id);
    if (question == null)
        throw new error_service_1.AppError("Question not found", 404);
    question.id = (0, util_service_1.trimCollectionNameFromId)(question.id);
    return question;
}
async function add(question) {
    const session = server_1.ravenStore.openSession();
    const doc = { ...question, createdAt: new Date() };
    doc["@metadata"] = { "@collection": COLLECTION_NAME };
    await session.store(doc, COLLECTION_NAME + "/");
    await session.saveChanges();
    doc.id = (0, util_service_1.trimCollectionNameFromId)(doc.id);
    return doc;
}
async function update(question) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, question.id);
    const doc = await session.load(id);
    if (doc == null)
        throw new error_service_1.AppError("Question not found", 404);
    Object.assign(doc, question);
    await session.saveChanges();
    const updatedQuestion = {
        ...doc,
        id: (0, util_service_1.trimCollectionNameFromId)(doc.id),
    };
    return updatedQuestion;
}
async function remove(questionId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, questionId);
    await session.delete(id);
    await session.saveChanges();
}
async function archive(question) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, question.id);
    const questionToArchive = await session.load(id);
    if (questionToArchive == null)
        throw new error_service_1.AppError("Question not found", 404);
    questionToArchive.isArchived = true;
    await session.saveChanges();
    return questionToArchive;
}
async function findDuplicatedQuestions(queryString) {
    const { language, level } = queryString;
    const session = server_1.ravenStore.openSession();
    const query = session
        .query({ collection: COLLECTION_NAME })
        .whereEquals("isArchived", false);
    if (language)
        query.whereEquals("language", language);
    if (level)
        query.whereEquals("level", level);
    query.take(25);
    const allQuestions = await query.all();
    let duplicatedQuestions = [];
    for (const question of allQuestions) {
        const rawSimilarQuestions = await getDuplicates(question);
        const similarQuestions = rawSimilarQuestions.map(q => ({
            ...q,
            id: (0, util_service_1.trimCollectionNameFromId)(q.id),
        }));
        duplicatedQuestions = [...duplicatedQuestions, ...similarQuestions];
    }
    return duplicatedQuestions;
}
async function findQuestionDuplications(questionId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, questionId);
    const question = await session.load(id);
    if (question == null)
        throw new error_service_1.AppError("Question not found", 404);
    const duplicatedQuestions = await getDuplicates(question);
    duplicatedQuestions.forEach(q => (q.id = (0, util_service_1.trimCollectionNameFromId)(q.id)));
    return duplicatedQuestions;
}
async function getDuplicates(question) {
    const session = server_1.ravenStore.openSession();
    const query = session
        .query({ indexName: "Questions/Search" })
        .whereEquals("isArchived", false)
        .whereNotEquals("id", question.id)
        .whereEquals("language", question.language);
    query
        .moreLikeThis(q => q.usingDocument(JSON.stringify({
        question: question.question,
    })))
        .take(5);
    const similarQuestions = await query.all();
    return [question, ...similarQuestions];
}
const levelPointsMap = new Map([
    ["beginner", 10],
    ["intermediate", 20],
    ["advanced", 30],
]);
async function getIsAdminUser(loggedinUserId) {
    try {
        if (!loggedinUserId)
            return false;
        const user = await user_service_1.default.getById(loggedinUserId);
        if (!user)
            return false;
        return user.roles.includes("admin");
    }
    catch (error) {
        return false;
    }
}
exports.default = {
    query,
    getById,
    add,
    update,
    remove,
    archive,
    findDuplicatedQuestions,
    findQuestionDuplications,
    levelPointsMap,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDhEQUtxQztBQUNyQyw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUV4RCx3RUFBK0M7QUFFL0MsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDO0FBRXBDLEtBQUssVUFBVSxLQUFLLENBQUMsV0FBd0I7SUFDM0MsTUFBTSxLQUFLLEdBQUcsK0JBQWlCLENBQUMsUUFBUSxFQUFpQixDQUFDO0lBQzFELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxjQUFjLENBQUM7SUFDN0MsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUM5RixXQUFXLENBQUM7SUFDZCxNQUFNLDBCQUEwQixHQUFHLElBQUEsMENBQTJCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNwRixNQUFNLGdCQUFnQixHQUFHLElBQUEsMENBQTJCLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFekQsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFXLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFFdkUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLFlBQVk7UUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFMUMsSUFBSSwwQkFBMEIsS0FBSyxTQUFTO1FBQzFDLEtB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