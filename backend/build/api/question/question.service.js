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
    const isMarkedToBeRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isMarkedToBeRevised);
    const isRevisedBoolean = (0, util_service_1.convertQueryParamsToBoolean)(isRevised);
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: COLLECTION_NAME });
    query.whereEquals("isArchived", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhEQUtxQztBQUNyQyw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7QUFFcEMsS0FBSyxVQUFVLEtBQUssQ0FBQyxXQUF3QjtJQUMzQyxNQUFNLEtBQUssR0FBRywrQkFBaUIsQ0FBQyxRQUFRLEVBQWlCLENBQUM7SUFDMUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLGNBQWMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDakcsTUFBTSwwQkFBMEIsR0FBRyxJQUFBLDBDQUEyQixFQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDcEYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLDBDQUEyQixFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBVyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRXZFLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLElBQUksMEJBQTBCLEtBQUssU0FBUztRQUMxQyxLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDdkUsSUFBSSxnQkFBZ0IsS0FBSyxTQUFTO1FBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJ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