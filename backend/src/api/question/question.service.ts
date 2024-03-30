import { Question } from "../../../../shared/types/question";
import {
  QueryString,
  convertQueryParamsToBoolean,
  setIdToCollectionName,
  trimCollectionNameFromId,
} from "../../services/util.service";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { ravenStore } from "../../server";
import { RavenDbDocument } from "../../../../shared/types/system";
import { AppError } from "../../services/error.service";
import { UserCorrectAnswer } from "../../../../shared/types/user";

const COLLECTION_NAME = "Questions";

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  const { language, level, searchTerm, isMarkedToBeRevised, limit, page, isRevised, isManagePage } =
    queryString;
  const isMarkedToBeRevisedBoolean = convertQueryParamsToBoolean(isMarkedToBeRevised);
  const isRevisedBoolean = convertQueryParamsToBoolean(isRevised);
  const session = ravenStore.openSession();
  const query = session.query<Question>({ collection: COLLECTION_NAME });

  query.whereEquals("isArchived", false);
  if (!isManagePage) query.randomOrdering();
  if (isMarkedToBeRevisedBoolean !== undefined)
    query.whereEquals("isMarkedToBeRevised", isMarkedToBeRevisedBoolean);
  if (isRevisedBoolean !== undefined) query.whereEquals("isRevised", isRevisedBoolean);
  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  if (limit) query.take(Number(limit));
  const skip = Number(page) * Number(limit);
  if (skip) query.skip(skip);

  if (loggedinUserId) {
    const userCorrectAnswersIds = await session
      .query<UserCorrectAnswer>({
        collection: "UserCorrectAnswers",
      })
      .selectFields(["questionId"])
      .whereEquals("userId", loggedinUserId)
      .all();

    const docIdsToFilter = userCorrectAnswersIds.map(id =>
      setIdToCollectionName(COLLECTION_NAME, id as unknown as string)
    );
    query.not().whereIn("id()", docIdsToFilter);
  }
  if (searchTerm) query.search("question", searchTerm);

  const questions = await query.all();
  for (const question of questions) question.id = trimCollectionNameFromId(question.id);
  return questions;
}

async function getById(questionId: string): Promise<Question | null> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, questionId);
  const question = await session.load<Question>(id);
  if (question == null) throw new AppError("Question not found", 404);
  question.id = trimCollectionNameFromId(question.id);
  return question;
}

async function add(question: Question): Promise<Question> {
  const session = ravenStore.openSession();
  const doc = { ...question, createdAt: new Date() } as Question & RavenDbDocument;
  doc["@metadata"] = { "@collection": COLLECTION_NAME };
  await session.store(doc, COLLECTION_NAME + "/");
  await session.saveChanges();
  doc.id = trimCollectionNameFromId(doc.id);
  return doc;
}

async function update(question: Question): Promise<Question> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, question.id);
  const doc = await session.load<Question>(id);
  if (doc == null) throw new AppError("Question not found", 404);
  Object.assign(doc, question);
  await session.saveChanges();
  const updatedQuestion = {
    ...doc,
    id: trimCollectionNameFromId(doc.id),
  };
  return updatedQuestion;
}

async function remove(questionId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, questionId);
  await session.delete(id);
  await session.saveChanges();
}

async function archive(question: Question): Promise<Question> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, question.id);
  const questionToArchive = await session.load<Question>(id);
  if (questionToArchive == null) throw new AppError("Question not found", 404);
  questionToArchive.isArchived = true;
  await session.saveChanges();
  return questionToArchive;
}

async function findDuplicatedQuestions(queryString: QueryString): Promise<Question[]> {
  const { language, level } = queryString;
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: COLLECTION_NAME })
    .whereEquals("isArchived", false);

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  query.take(25);
  const allQuestions = await query.all();
  let duplicatedQuestions: Question[] = [];
  for (const question of allQuestions) {
    const rawSimilarQuestions = await getDuplicates(question);
    const similarQuestions = rawSimilarQuestions.map(q => ({
      ...q,
      id: trimCollectionNameFromId(q.id),
    }));
    duplicatedQuestions = [...duplicatedQuestions, ...similarQuestions];
  }

  return duplicatedQuestions as unknown as Question[];
}

async function findQuestionDuplications(questionId: string): Promise<Question[]> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, questionId);
  const question = await session.load<Question>(id);
  if (question == null) throw new AppError("Question not found", 404);
  const duplicatedQuestions = await getDuplicates(question);
  duplicatedQuestions.forEach(q => (q.id = trimCollectionNameFromId(q.id)));
  return duplicatedQuestions;
}

async function getDuplicates(question: Question): Promise<Question[]> {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ indexName: "Questions/Search" })
    .whereEquals("isArchived", false)
    .whereNotEquals("id", question.id)
    .whereEquals("language", question.language);

  query
    .moreLikeThis(q =>
      q.usingDocument(
        JSON.stringify({
          question: question.question,
        })
      )
    )
    .take(5);

  const similarQuestions = await query.all();

  return [question, ...similarQuestions] as unknown as Question[];
}

const levelPointsMap = new Map([
  ["beginner", 10],
  ["intermediate", 20],
  ["advanced", 30],
]);

export default {
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
