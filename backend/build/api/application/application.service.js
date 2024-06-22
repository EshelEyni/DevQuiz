"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_service_1 = require("../../services/util.service");
const als_service_1 = require("../../services/als.service");
const server_1 = require("../../server");
const error_service_1 = require("../../services/error.service");
const COLLECTION_NAME = "Applications";
async function query() {
    const store = als_service_1.asyncLocalStorage.getStore();
    const loggedinUserId = store?.loggedinUserId;
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: COLLECTION_NAME });
    query.whereEquals("isArchived", false).whereEquals("userId", loggedinUserId);
    const applications = await query.all();
    for (const a of applications)
        a.id = (0, util_service_1.trimCollectionNameFromId)(a.id);
    return applications;
}
async function getById(applicationId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, applicationId);
    const application = await session.load(id);
    if (application == null)
        throw new error_service_1.AppError("JobApplication not found", 404);
    application.id = (0, util_service_1.trimCollectionNameFromId)(application.id);
    return application;
}
async function add(application) {
    const session = server_1.ravenStore.openSession();
    const doc = { ...application, createdAt: new Date() };
    doc["@metadata"] = { "@collection": COLLECTION_NAME };
    await session.store(doc, COLLECTION_NAME + "/");
    await session.saveChanges();
    doc.id = (0, util_service_1.trimCollectionNameFromId)(doc.id);
    return doc;
}
async function update(application) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, application.id);
    const doc = await session.load(id);
    if (doc == null)
        throw new error_service_1.AppError("JobApplication not found", 404);
    doc.updatedAt = new Date();
    Object.assign(doc, application);
    await session.saveChanges();
    const updatedJobApplication = {
        ...doc,
        id: (0, util_service_1.trimCollectionNameFromId)(doc.id),
    };
    return updatedJobApplication;
}
async function remove(applicationId) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, applicationId);
    await session.delete(id);
    await session.saveChanges();
}
async function archive(application) {
    const session = server_1.ravenStore.openSession();
    const id = (0, util_service_1.setIdToCollectionName)(COLLECTION_NAME, application.id);
    const questionToArchive = await session.load(id);
    if (questionToArchive == null)
        throw new error_service_1.AppError("Application not found", 404);
    questionToArchive.isArchived = true;
    await session.saveChanges();
    return questionToArchive;
}
exports.default = {
    query,
    getById,
    add,
    update,
    remove,
    archive,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvYXBwbGljYXRpb24vYXBwbGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUE4RjtBQUM5Riw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7QUFFdkMsS0FBSyxVQUFVLEtBQUs7SUFDbEIsTUFBTSxLQUFLLEdBQUcsK0JBQWlCLENBQUMsUUFBUSxFQUFpQixDQUFDO0lBQzFELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxjQUFjLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFpQixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRTdFLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFN0UsTUFBTSxZQUFZLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkMsS0FBSyxNQUFNLENBQUMsSUFBSSxZQUFZO1FBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQsS0FBSyxVQUFVLE9BQU8sQ0FBQyxhQUFxQjtJQUMxQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUEsb0NBQXFCLEVBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sV0FBVyxHQUFHLE1B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