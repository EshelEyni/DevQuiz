import { Query, Schema, model } from "mongoose";
import { Question } from "../../../../shared/types/question";

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
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc: Document, ret: Record<string, unknown>) {
        delete ret._id;
        return ret;
      },
      toObject: {
        virtuals: true,
        transform: function (doc: Document, ret: Record<string, unknown>) {
          delete ret._id;
          return ret;
        },
      },
    },
  }
);

questionSchema.pre(
  /^find/,
  function (this: Query<Document, Question>, next: (err?: Error) => void) {
    this.find({ isArchived: { $ne: true } });
    next();
  }
);

const QuestionModel = model("question", questionSchema);

export { QuestionModel };
