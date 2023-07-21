import { Request, Response } from "express";
import { asyncErrorCatcher } from "../../services/error.service";
import { ContactMessage, ReportQuestionMessage } from "../../../../shared/types/system";
import { ContactMsgModel, ReportQuestionMsgModel } from "./contact.model";

const sendContactMsg = asyncErrorCatcher(async (req: Request, res: Response) => {
  const msg = req.body as ContactMessage;

  const name = msg.userDetails ? msg.userDetails.username : "Anonymous";
  const email = msg.userDetails ? msg.userDetails.email : "Anonymous";
  const userId = msg.userDetails ? msg.userDetails.id : null;

  await ContactMsgModel.create({
    name,
    email,
    userId,
    subject: msg.subject,
    content: msg.content,
  });

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
  });
});

const reportQuestion = asyncErrorCatcher(async (req: Request, res: Response) => {
  const msg = req.body as ReportQuestionMessage;

  const name = msg.userDetails ? msg.userDetails.username : "Anonymous";
  const email = msg.userDetails ? msg.userDetails.email : "Anonymous";
  const userId = msg.userDetails ? msg.userDetails.id : null;

  await ReportQuestionMsgModel.create({
    name,
    email,
    userId,
    questionId: msg.questionId,
    defaultIssue: msg.defaultIssue,
    content: msg.content,
  });

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
  });
});

export { sendContactMsg, reportQuestion };
