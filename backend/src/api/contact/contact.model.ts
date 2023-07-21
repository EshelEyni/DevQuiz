import { Schema, model } from "mongoose";

const contactMsgSchema = new Schema({
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
});

const reportQuestionMsgSchema = new Schema({
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
});

const ContactMsgModel = model("contact_msg", contactMsgSchema);
const ReportQuestionMsgModel = model("report_question_msg", reportQuestionMsgSchema);

export { ContactMsgModel, ReportQuestionMsgModel };
