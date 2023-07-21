import { Schema, model } from "mongoose";

const contactMsgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    markedAsRead: {
      type: Boolean,
      default: false,
    },
    markedAsSpam: {
      type: Boolean,
      default: false,
    },
    markedAsDone: {
      type: Boolean,
      default: false,
    },
    markedAsImportant: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "contact",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const reportQuestionMsgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
    },

    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    defaultIssue: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    markedAsRead: {
      type: Boolean,
      default: false,
    },
    markedAsSpam: {
      type: Boolean,
      default: false,
    },
    markedAsDone: {
      type: Boolean,
      default: false,
    },
    markedAsImportant: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "report",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ContactMsgModel = model("contact_msg", contactMsgSchema);
const ReportQuestionMsgModel = model("report_question_msg", reportQuestionMsgSchema);

export { ContactMsgModel, ReportQuestionMsgModel };
