import { Question } from "../../../../shared/types/question";
import {
  QueryString,
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
  const { language, level, searchTerm, isMarkedToBeRevised, limit, page, isRevised } = queryString;
  const session = ravenStore.openSession();
  const query = session.query<Question>({ collection: COLLECTION_NAME });
  query.whereEquals("isArchived", false);
  if (isMarkedToBeRevised) query.whereEquals("isMarkedToBeRevised", true);
  if (isRevised) query.whereEquals("isRevised", true);
  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  if (limit) query.take(Number(limit));
  if (searchTerm) query.search("question", searchTerm);
  const skip = Number(page) * Number(limit);
  if (skip) query.skip(skip);
  if (!loggedinUserId) query.randomOrdering();
  else {
    const userCorrectAnswersIds = await session
      .query<UserCorrectAnswer>({
        collection: "UserCorrectAnswers",
      })
      .selectFields(["questionId"])
      .whereEquals("userId", loggedinUserId)
      .all();

    userCorrectAnswersIds.forEach(id => {
      const idWithCollectionName = setIdToCollectionName(COLLECTION_NAME, id as unknown as string);
      query.whereNotEquals("id()", idWithCollectionName);
    });
  }

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

  const allQuestions = await query.all();
  const duplicatedQuestions: Question[][] = [];
  for (const question of allQuestions) {
    const similarQuestions = await getDuplicates(question);
    duplicatedQuestions.push(similarQuestions);
  }
  return duplicatedQuestions as unknown as Question[];
}

async function getDuplicates(question: Question): Promise<Question[]> {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ indexName: "Questions/Search" })
    .whereEquals("isArchived", false)
    .whereNotEquals("id", question.id)
    .whereEquals("language", question.language)
    .whereEquals("level", question.level)
    .moreLikeThis(q =>
      q.usingDocument(
        JSON.stringify({
          question: question.question,
        })
      )
    )
    .take(5);

  if (question.language) query.whereEquals("language", question.language);
  if (question.level) query.whereEquals("level", question.level);

  const similarQuestions = await query.all();

  return similarQuestions;
}

export default {
  query,
  getById,
  add,
  update,
  remove,
  archive,
  findDuplicatedQuestions,
};
