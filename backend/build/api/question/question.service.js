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
    const { language, level, searchTerm, isMarkedToBeRevised, limit, page, isRevised } = queryString;
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: COLLECTION_NAME });
    query.whereEquals("isArchived", false);
    if (isMarkedToBeRevised)
        query.whereEquals("isMarkedToBeRevised", true);
    if (isRevised)
        query.whereEquals("isRevised", true);
    if (language)
        query.whereEquals("language", language);
    if (level)
        query.whereEquals("level", level);
    if (limit)
        query.take(Number(limit));
    if (searchTerm)
        query.search("question", searchTerm);
    const skip = Number(page) * Number(limit);
    if (skip)
        query.skip(skip);
    if (!loggedinUserId)
        query.randomOrdering();
    else {
        const userCorrectAnswersIds = await session
            .query({
            collection: "UserCorrectAnswers",
        })
            .selectFields(["questionId"])
            .whereEquals("userId", loggedinUserId)
            .all();
        userCorrectAnswersIds.forEach(id => {
            const idWithCollectionName = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, id);
            query.whereNotEquals("id()", idWithCollectionName);
        });
    }
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
    const allQuestions = await query.all();
    const duplicatedQuestions = [];
    for (const question of allQuestions) {
        const similarQuestions = await getDuplicates(question);
        duplicatedQuestions.push(similarQuestions);
    }
    return duplicatedQuestions;
}
async function getDuplicates(question) {
    const session = server_1.ravenStore.openSession();
    const query = session
        .query({ indexName: "Questions/Search" })
        .whereEquals("isArchived", false)
        .whereNotEquals("id", question.id)
        .whereEquals("language", question.language)
        .whereEquals("level", question.level)
        .moreLikeThis(q => q.usingDocument(JSON.stringify({
        question: question.question,
    })))
        .take(5);
    if (question.language)
        query.whereEquals("language", question.language);
    if (question.level)
        query.whereEquals("level", question.level);
    const similarQuestions = await query.all();
    return similarQuestions;
}
exports.default = {
    query,
    getById,
    add,
    update,
    remove,
    archive,
    findDuplicatedQuestions,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhEQUlxQztBQUNyQyw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7QUFFcEMsS0FBSyxVQUFVLEtBQUssQ0FBQyxXQUF3QjtJQUMzQyxNQUFNLEtBQUssR0FBRywrQkFBaUIsQ0FBQyxRQUFRLEVBQWlCLENBQUM7SUFDMUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGNBQWMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDakcsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFXLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDdkUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsSUFBSSxtQkFBbUI7UUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLElBQUksU0FBUztRQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELElBQUksUUFBUTtRQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELElBQUksS0FBSztRQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLElB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