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
    markedAsAnswered: {
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
  },
  {
    timestamps: true,
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
    markedAsAnswered: {
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
  },
  {
    timestamps: true,
  }
);

const ContactMsgModel = model("contact_msg", contactMsgSchema);
const ReportQuestionMsgModel = model("report_question_msg", reportQuestionMsgSchema);

export { ContactMsgModel, ReportQuestionMsgModel };
