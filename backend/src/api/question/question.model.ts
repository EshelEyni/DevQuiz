import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc: Document, ret: Record<string, unknown>) {
        delete ret.__v;
        return ret;
      },
      toObject: {
        virtuals: true,
        transform: function (doc: Document, ret: Record<string, unknown>) {
          delete ret.__v;
          return ret;
        },
      },
    },
  }
);

const QuestionModel = model("question", questionSchema);

export { QuestionModel };
