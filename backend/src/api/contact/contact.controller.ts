import { Request, Response } from "express";
import { asyncErrorCatcher } from "../../services/error.service";
import { sendEmail } from "../../services/util.service";
import { ContactMessage, ReportQuestionMessage } from "../../../../shared/types/system";

const sendContactMsg = asyncErrorCatcher(async (req: Request, res: Response) => {
  const msg = req.body as ContactMessage;

  const name = msg.userDetails ? msg.userDetails.username : "Anonymous";
  const email = msg.userDetails ? msg.userDetails.email : "Anonymous";

  await sendEmail({
    email: process.env.EMAIL_ADDRESS as string,
    subject: msg.subject,
    message: `
    <h3>Message from ${name}</h3>
    <p>Email: ${email}</p>
    <p>Message: ${msg.content}</p>
    `,
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

  await sendEmail({
    email: process.env.EMAIL_ADDRESS as string,
    subject: `Reported Question: ${msg.questionId}`,
    message: `
        <h3>Message from ${name}</h3>
        <p>Email: ${email}</p>
        <p>Question ID: ${msg.questionId}</p>
        <p>Default Issue: ${msg.defaultIssue}</p>
        <p>Message: ${msg.content}</p>
        `,
  });

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
  });
});

export { sendContactMsg, reportQuestion };
