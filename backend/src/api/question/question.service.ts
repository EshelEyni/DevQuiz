import { Question } from "../../../../shared/types/question";
import { QueryString, setIdToCollectionName } from "../../services/util.service";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { ravenStore } from "../../server";
import {
  DifficultyLevels,
  ProgrammingLanguage,
  RavenDbDocument,
} from "../../../../shared/types/system";
import { AppError } from "../../services/error.service";

const collectionName = "Questions";

async function getRandomQuestions(language: ProgrammingLanguage, level: DifficultyLevels) {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: collectionName })
    .whereEquals("isArchived", false)
    .randomOrdering()
    .take(25)
    .skip(0);

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  return await query.all();
}

async function getQuestionsForUser(
  language: ProgrammingLanguage,
  level: DifficultyLevels,
  term: string
) {
  const session = ravenStore.openSession();
  const query = session
    .query<Question>({ collection: collectionName })
    .take(25)
    .skip(0)
    .orderByScore();

  if (language) query.whereEquals("language", language);
  if (level) query.whereEquals("level", level);
  if (term) query.search("question", term);
  return await query.all();
}

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  const { language, level, terms, isEditPage } = queryString;
  if (!loggedinUserId) {
    return await getRandomQuestions(language as ProgrammingLanguage, level as DifficultyLevels);
  }

  if (isEditPage) {
    return await getQuestionsForUser(
      language as ProgrammingLanguage,
      level as DifficultyLevels,
      terms as string
    );
  }

  return await getQuestionsForUser(
    language as ProgrammingLanguage,
    level as DifficultyLevels,
    terms as string
  );
}

async function getById(questionId: string): Promise<Question | null> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(collectionName, questionId);
  return await session.load<Question>(id);
}

async function save(question: Question): Promise<Question> {
  const session = ravenStore.openSession();
  if (!question.id) {
    const doc = { ...question } as Question & RavenDbDocument;
    doc["@metadata"] = { "@collection": collectionName };
    await session.store(doc, collectionName + "/");
    await session.saveChanges();
    return doc;
  } else {
    let updatedQuestion = await session.load<Question>(question.id);
    if (updatedQuestion == null) throw new AppError("Question not found", 404);
    updatedQuestion = { ...question };
    await session.saveChanges();
    return question;
  }
}

async function remove(questionId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(collectionName, questionId);
  session.delete(id);
  await session.saveChanges();
}

async function archive(questionId: string): Promise<Question> {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(collectionName, questionId);
  const question = await session.load<Question>(id);
  if (question == null) throw new AppError("Question not found", 404);
  question.isArchived = true;
  await session.saveChanges();
  return question;
}

async function findDuplicatedQuestions(queryString: QueryString): Promise<Question[]> {
  // const { language, level } = queryString;
  const session = ravenStore.openSession();
  // const query = session.query<Question>({ indexName: "Questions/Search" });

  // if (language) query.whereEquals("language", language);
  // if (level) query.whereEquals("level", level);
  // query.whereEquals("isArchived", false);
  // query.moreLikeThis(q =>
  //   q.usingDocument(
  //     JSON.stringify({
  //       question: "HTML Stands for",
  //     })
  //   )
  // );

  const questions = session
    .query<Question>({ indexName: "Questions/Search" })
    // .whereEquals("language", language)
    // .whereEquals("level", level)
    .moreLikeThis(q =>
      q.usingDocument(
        JSON.stringify({
          question: "HTML Stands for",
        })
      )
    )
    .all();

  // const questions = await query.all();
  // console.log("questions", questions);
  return questions;
}

export default {
  query,
  getById,
  save,
  remove,
  archive,
  findDuplicatedQuestions,
};
