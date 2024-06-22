"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeApplication = exports.archiveApplication = exports.updateApplication = exports.addApplication = exports.getApplicationById = exports.getApplications = void 0;
const error_service_1 = require("../../services/error.service");
const application_service_1 = __importDefault(require("./application.service"));
const getApplications = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applications = await application_service_1.default.query();
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: applications.length,
        data: applications,
    });
});
exports.getApplications = getApplications;
const getApplicationById = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applicationId = req.params.id;
    if (!req.params.id)
        throw new error_service_1.AppError("No application ID provided", 400);
    const application = await application_service_1.default.getById(applicationId);
    res.status(200).json({
        status: "success",
        data: application,
    });
});
exports.getApplicationById = getApplicationById;
const addApplication = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applicationToAdd = req.body;
    const application = await application_service_1.default.add(applicationToAdd);
    res.status(201).json({
        status: "success",
        data: application,
    });
});
exports.addApplication = addApplication;
const updateApplication = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applicationToUpdate = req.body;
    const application = await application_service_1.default.update(applicationToUpdate);
    res.status(200).json({
        status: "success",
        data: application,
    });
});
exports.updateApplication = updateApplication;
const removeApplication = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applicationId = req.params.id;
    if (!applicationId)
        throw new error_service_1.AppError("No question ID provided", 400);
    await application_service_1.default.remove(applicationId);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
exports.removeApplication = removeApplication;
const archiveApplication = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const applicationToArchive = req.body;
    const application = await application_service_1.default.archive(applicationToArchive);
    res.status(200).json({
        status: "success",
        data: application,
    });
});
exports.archiveApplication = archiveApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvYXBwbGljYXRpb24vYXBwbGljYXRpb24uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBMkU7QUFDM0UsZ0ZBQXVEO0FBRXZELE1BQU0sZUFBZSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakUsTUFBTSxZQUFZLEdBQUcsTUFBTSw2QkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDckMsT0FBTyxFQUFFLFlBQVksQ0FBQyxNQUFNO1FBQzVCLElBQUksRUFBRSxZQUFZO0tBQ25CLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBc0RELDBDQUFlO0FBcERqQixNQUFNLGtCQUFrQixHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sV0FBVyxHQUFHLE1BQU0sNkJBQWtCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXBFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxXQUFXO0tBQ2xCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBNENELGdEQUFrQjtBQTFDcEIsTUFBTSxjQUFjLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbEMsTUFBTSxXQUFXLEdBQUcsTUFBTSw2QkFBa0IsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVuRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQW1DRCx3Q0FBYztBQWpDaEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ25FLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNyQyxNQUFNLFdBQVcsR0FBRyxNQUFNLDZCQUFrQixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxXQUFXO0tBQ2xCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBMkJELDhDQUFpQjtBQXpCbkIsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ25FLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ3BDLElBQUksQ0FBQyxhQUFhO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkUsTUFBTSw2QkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVM7UUFDakIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQWtCRCw4Q0FBaUI7QUFoQm5CLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwRSxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdEMsTUFBTSxXQUFXLEdBQUcsTUFBTSw2QkFBa0IsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUzRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQU9ELGdEQUFrQiJ9