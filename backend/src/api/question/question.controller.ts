import factory from "../../services/factory.service";
import { QuestionModel } from "./question.model";

const getQuestions = factory.getAll(QuestionModel);
const getQuestionById = factory.getOne(QuestionModel);
const addQuestion = factory.createOne(QuestionModel);
const updateQuestion = factory.updateOne(QuestionModel, []);
const removeQuestion = factory.deleteOne(QuestionModel);

export { getQuestions, getQuestionById, addQuestion, updateQuestion, removeQuestion };
