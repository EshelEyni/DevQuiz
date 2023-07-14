import { Question } from "../../../../shared/types/question";
import { QuestionModel } from "./question.model";

import { APIFeatures, QueryString } from "../../services/util.service";
import { Document } from "mongoose";

async function query(queryString: QueryString): Promise<Question[]> {
  const features = new APIFeatures(QuestionModel.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const questions = (await features.getQuery().exec()) as unknown as Document[];
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
