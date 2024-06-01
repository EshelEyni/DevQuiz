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
    if (isRevisedBoolean !== undefined)
        query.whereEquals("isRevised", isRevisedBoolean);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhEQUtxQztBQUNyQyw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7QUFFcEMsS0FBSyxVQUFVLEtBQUssQ0FBQyxXQUF3QjtJQUMzQyxNQUFNLEtBQUssR0FBRywrQkFBaUIsQ0FBQyxRQUFRLEVBQWlCLENBQUM7SUFDMUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGNBQWMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEdBQzlGLFdBQVcsQ0FBQztJQUNkLE1BQU0sMEJBQTBCLEdBQUcsSUFBQSwwQ0FBMkIsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSwwQ0FBMkIsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQVcsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUV2RSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsWUFBWTtRQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQyxJQUFJLDBCQUEwQixLQUFLLFNBQVM7UUFDMUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksZ0JBQWdCLEtB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