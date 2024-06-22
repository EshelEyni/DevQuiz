import { setIdToCollectionName, trimCollectionNameFromId } from "../../services/util.service";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { ravenStore } from "../../server";
import { RavenDbDocument } from "../../../../shared/types/system";
import { AppError } from "../../services/error.service";
import { JobApplication } from "../../../../shared/types/application";

const COLLECTION_NAME = "Applications";

async function query(): Promise<JobApplication[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;

  const session = ravenStore.openSession();
  const query = session.query<JobApplication>({ collection: COLLECTION_NAME });

  query.whereEquals("isArchived", false).whereEquals("userId", loggedinUserId);

  const applications = await query.all();
  for (const a of applications) a.id = trimCollectionNameFromId(a.id);
  return applications;
}

async function getById(applicationId: string): Promise<JobApplication | null> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, applicationId);
  const application = await session.load<JobApplication>(id);
  if (application == null) throw new AppError("JobApplication not found", 404);
  application.id = trimCollectionNameFromId(application.id);
  return application;
}

async function add(application: JobApplication): Promise<JobApplication> {
  const session = ravenStore.openSession();
  const doc = { ...application, createdAt: new Date() } as JobApplication & RavenDbDocument;
  doc["@metadata"] = { "@collection": COLLECTION_NAME };
  await session.store(doc, COLLECTION_NAME + "/");
  await session.saveChanges();
  doc.id = trimCollectionNameFromId(doc.id);
  return doc;
}

async function update(application: JobApplication): Promise<JobApplication> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, application.id);
  const doc = await session.load<JobApplication>(id);
  if (doc == null) throw new AppError("JobApplication not found", 404);
  doc.updatedAt = new Date();
  Object.assign(doc, application);
  await session.saveChanges();
  const updatedJobApplication = {
    ...doc,
    id: trimCollectionNameFromId(doc.id),
  };
  return updatedJobApplication;
}

async function remove(applicationId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, applicationId);
  await session.delete(id);
  await session.saveChanges();
}

async function archive(application: JobApplication): Promise<JobApplication> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, application.id);
  const questionToArchive = await session.load<JobApplication>(id);
  if (questionToArchive == null) throw new AppError("Application not found", 404);
  questionToArchive.isArchived = true;
  await session.saveChanges();
  return questionToArchive;
}

export default {
  query,
  getById,
  add,
  update,
  remove,
  archive,
};
