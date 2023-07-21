import { Question } from "../../../../shared/types/question";
import { QuestionModel } from "./question.model";

import { APIFeatures, QueryString } from "../../services/util.service";
import { Document, Query } from "mongoose";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { UserRightAnswerModel } from "../user/user.model";

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  if (!loggedinUserId) {
    const { language, level } = queryString;
    const questions = QuestionModel.aggregate([
      {
        $match: {
          language,
          level,
          isArchived: { $ne: true },
        },
      },
      {
        $sample: { size: 25 },
      },
    ]);

    return questions as unknown as Question[];
  }

  const { language, level } = queryString;
  const userRightAnswers = await UserRightAnswerModel.find({
    userId: loggedinUserId,
    level,
    language,
  }).exec();

  const userRightAnswersIds = userRightAnswers.map(userRightAnswer => userRightAnswer.questionId);
  const features = new APIFeatures(QuestionModel.find(), queryString)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const query = features.getQuery() as Query<Question[], Question>;
  query.where("_id").nin(userRightAnswersIds);
  const questions = (await query.exec()) as unknown as Document[];
  return questions as unknown as Question[];
}

async function getById(questionId: string): Promise<Question> {
  const question = await QuestionModel.findById(questionId).exec();
  return question as unknown as Question;
}

async function add(question: Question): Promise<Question> {
  const savedQuestion = await new QuestionModel(question).save();
  return savedQuestion as unknown as Question;
}

async function update(id: string, question: Question): Promise<Question> {
  const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, question, {
    new: true,
    runValidators: true,
  }).exec();
  return updatedQuestion as unknown as Question;
}

async function remove(questionId: string): Promise<Question> {
  const questionRemoved = QuestionModel.findByIdAndRemove(questionId).exec();
  return questionRemoved as unknown as Question;
}

export default {
  query,
  getById,
  add,
  update,
  remove,
};
