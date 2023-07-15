import { AppError, asyncErrorCatcher } from "../../services/error.service";
import factory from "../../services/factory.service";
import { QuestionModel } from "./question.model";

const getQuestions = factory.getAll(QuestionModel);
const getQuestionById = factory.getOne(QuestionModel);
const addQuestion = factory.createOne(QuestionModel);
const updateQuestion = factory.updateOne(QuestionModel, []);

const archiveQuestion = asyncErrorCatcher(async (req, res, next) => {
  const question = await QuestionModel.findById(req.params.id);
  if (!question) throw new AppError("No quesiton found with that ID", 404);
  question.isArchived = true;
  await question.save();
  res.status(200).json({
    status: "success",
    data: {
      data: question,
    },
  });
});

const removeQuestion = factory.deleteOne(QuestionModel);

export {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  archiveQuestion,
  removeQuestion,
};
