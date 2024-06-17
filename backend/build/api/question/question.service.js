"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_service_1 = require("../../services/util.service");
const als_service_1 = require("../../services/als.service");
const server_1 = require("../../server");
const error_service_1 = require("../../services/error.service");
const COLLECTION_NAME = "Questions";
async function query(queryString) {
    const store = als_service_1.asyncLocalStorage.getStore();
    const loggedinUserId = store?.loggedinUserId;
    const { language, level, searchTerm, isMarkedToBeRevised, limit, page, isRevised, isManagePage } = queryString;
    const isMarkedToBeRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isMarkedToBeRevised);
    const isRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isRevised);
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: COLLECTION_NAME });
    query.whereEquals("isArchived", false);
    if (!isManagePage)
        query.randomOrdering();
    if (isMarkedToBeRevisedBoolean !== undefined)
        query.whereEquals("isMarkedToBeRevised", isMarkedToBeRevisedBoolean);
    if (isManagePage && isRevisedBoolean !== undefined)
        query.whereEquals("isRevised", isRevisedBoolean);
    if (!isManagePage)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhEQUtxQztBQUNyQyw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7QUFFcEMsS0FBSyxVQUFVLEtBQUssQ0FBQyxXQUF3QjtJQUMzQyxNQUFNLEtBQUssR0FBRywrQkFBaUIsQ0FBQyxRQUFRLEVBQWlCLENBQUM7SUFDMUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGNBQWMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEdBQzlGLFdBQVcsQ0FBQztJQUNkLE1BQU0sMEJBQTBCLEdBQUcsSUFBQSwwQ0FBMkIsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSwwQ0FBMkIsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQVcsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUV2RSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsWUFBWTtRQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUUxQyxJQUFJLDBCQUEwQixLQUFLLFNBQVM7UUFDMUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBRXZFLElBQUksWUFBWSxJQUFJ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