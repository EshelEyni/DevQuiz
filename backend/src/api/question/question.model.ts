import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    trim: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const QuestionModel = model("question", questionSchema);

export { QuestionModel };
