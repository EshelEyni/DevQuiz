import { Question } from "../../../../shared/types/question";
import {
  QueryString,
  setIdToCollectionName,
  trimCollectionNameFromId,
} from "../../services/util.service";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { ravenStore } from "../../server";
import {
  DifficultyLevels,
  ProgrammingLanguage,
  RavenDbDocument,
} from "../../../../shared/types/system";
import { AppError } from "../../services/error.service";
import { UserCorrectAnswer } from "../../../../shared/types/user";

const COLLECTION_NAME = "Questions";

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  const { language, level, isEditPage, searchTerm, isMarkedToBeRevised } = queryString;
  console.log("queryString", queryString);

  let questions: Question[] = [];

  // TODO: switch to switch case using switch (true).........
  if (isMarkedToBeRevised) {
    questions = await _getQuestionsMarkedToEdit();
    for (const question of questions) question.id = trimCollectionNameFromId(question.id);
    return questions;
  }

  if (!loggedinUserId) {
    questions = await _getRandomQuestions(
      language as ProgrammingLanguage,
      level as DifficultyLevels
    );
  }

  if (isEditPage) {
    questions = await _getQuestionsForEditPage(
      language as ProgrammingLanguage,
      level as DifficultyLevels,
      searchTerm
    );
  } else {
    questions = await _getQuestionsForUser(
      loggedinUserId as string,
      language as ProgrammingLanguage,
      level as DifficultyLevels
    );
  }

  for (const question of questions) question.id = trimCollectionNameFromId(question.id);
  return questions;
}

async function getById(questionId: string): Promise<Question | null> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, questionId);
  const question = await session.load<Question>(id);
  console.log(question);
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
  doc.isRevised = true;
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
  const allQuestions = await _getQuestionsForEditPage(
    language as ProgrammingLanguage,
    level as DifficultyLevels
  );
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

async function _getRandomQuestions(
  language: ProgrammingLanguage,
  level: DifficultyLevels
): Promise<Question[]> {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: COLLECTION_NAME })
    .whereEquals("isArchived", false)
    .randomOrdering()
    .take(25)
    .skip(0);

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  return await query.all();
}

async function _getQuestionsForUser(
  userId: string,
  language: ProgrammingLanguage,
  level: DifficultyLevels
): Promise<Question[]> {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: COLLECTION_NAME })
    .take(25)
    .skip(0)
    .orderByScore();

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);

  const userCorrectAnswersIds = await session
    .query<UserCorrectAnswer>({
      collection: "UserCorrectAnswers",
    })
    .selectFields(["questionId"])
    .whereEquals("userId", userId)
    .all();

  userCorrectAnswersIds.forEach(id => {
    const idWithCollectionName = setIdToCollectionName(COLLECTION_NAME, id as unknown as string);
    query.whereNotEquals("id()", idWithCollectionName);
  });
  return await query.all();
}

async function _getQuestionsForEditPage(
  language: ProgrammingLanguage,
  level: DifficultyLevels,
  searchTerm?: string
): Promise<Question[]> {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: COLLECTION_NAME })
    .whereEquals("isArchived", false);

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  if (searchTerm) query.search("question", searchTerm);
  return await query.all();
}

async function _getQuestionsMarkedToEdit() {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: COLLECTION_NAME })
    .whereEquals("isMarkedToBeRevised", true);
  return await query.all();
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
