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
    query
        .whereEquals("isArchived", false)
        .whereEquals("userId", loggedinUserId)
        .orderByDescending("createdAt");
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
    questionToArchive.id = (0, util_service_1.trimCollectionNameFromId)(questionToArchive.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvYXBwbGljYXRpb24vYXBwbGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUE4RjtBQUM5Riw0REFBK0Q7QUFFL0QseUNBQTBDO0FBRTFDLGdFQUF3RDtBQUd4RCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7QUFFdkMsS0FBSyxVQUFVLEtBQUs7SUFDbEIsTUFBTSxLQUFLLEdBQUcsK0JBQWlCLENBQUMsUUFBUSxFQUFpQixDQUFDO0lBQzFELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxjQUFjLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFpQixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBRTdFLEtBQUs7U0FDRixXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztTQUNoQyxXQUFXLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQztTQUNyQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVsQyxNQUFNLFlBQVksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLFlBQVk7UUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUEsdUNBQXdCLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxLQUFLLFVBQVUsT0FBTyxDQUFDLGFBQXFCO0lBQzFDLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBQSxvQ0FBcUIsRUFBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDakUsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFpQixFQUFFLENBQUMsQ0FBQztJQUMzRCxJQUFJLFdBQVcsSUFBSSxJQUFJO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxXQUEyQjtJQUM1QyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQXNDLENBQUM7SUFDMUYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxDQUFDO0lBQ3RELE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBQSx1Q0FBd0IsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsS0FBSyxVQUFVLE1BQU0sQ0FBQyxXQUEyQjtJQUMvQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUEsb0NBQXFCLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRSxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELElBQUksR0FBRyxJQUFJLElBQUk7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEMsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsTUFBTSxxQkFBcUIsR0FBRztRQUM1QixHQUFHLEdBQUc7UUFDTixFQUFFLEVBQUUsSUFBQSx1Q0FBd0IsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ3JDLENBQUM7SUFDRixPQUFPLHFCQUFxQixDQUFDO0FBQy9CLENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTSxDQUFDLGFBQXFCO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBQSxvQ0FBcUIsRUFBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDakUsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFFRCxLQUFLLFVBQVUsT0FBTyxDQUFDLFdBQTJCO0lBQ2hELE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBQSxvQ0FBcUIsRUFBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFpQixFQUFFLENBQUMsQ0FBQztJQUNqRSxJQUFJLGlCQUFpQixJQUFJLElBQUk7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxJQUFBLHVDQUF3QixFQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUVELGtCQUFlO0lBQ2IsS0FBSztJQUNMLE9BQU87SUFDUCxHQUFHO0lBQ0gsTUFBTTtJQUNOLE1BQU07SUFDTixPQUFPO0NBQ1IsQ0FBQyJ9