import { AppError, asyncErrorCatcher } from "../../services/error.service";
import applicationService from "./application.service";

const getApplications = asyncErrorCatcher(async (req, res, next) => {
  const applications = await applicationService.query();
  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: applications.length,
    data: applications,
  });
});

const getApplicationById = asyncErrorCatcher(async (req, res, next) => {
  const applicationId = req.params.id;
  if (!req.params.id) throw new AppError("No application ID provided", 400);
  const application = await applicationService.getById(applicationId);

  res.status(200).json({
    status: "success",
    data: application,
  });
});

const addApplication = asyncErrorCatcher(async (req, res, next) => {
  const applicationToAdd = req.body;
  const application = await applicationService.add(applicationToAdd);

  res.status(201).json({
    status: "success",
    data: application,
  });
});

const updateApplication = asyncErrorCatcher(async (req, res, next) => {
  const applicationToUpdate = req.body;
  const application = await applicationService.update(applicationToUpdate);
  res.status(200).json({
    status: "success",
    data: application,
  });
});

const removeApplication = asyncErrorCatcher(async (req, res, next) => {
  const applicationId = req.params.id;
  if (!applicationId) throw new AppError("No question ID provided", 400);
  await applicationService.remove(applicationId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const archiveApplication = asyncErrorCatcher(async (req, res, next) => {
  const applicationToArchive = req.body;
  const application = await applicationService.archive(applicationToArchive);

  res.status(200).json({
    status: "success",
    data: application,
  });
});

export {
  getApplications,
  getApplicationById,
  addApplication,
  updateApplication,
  archiveApplication,
  removeApplication,
};
