import { Request, Response } from "express";
import { AppError, asyncErrorCatcher } from "../../services/error.service";
import { ContactMsgType } from "../../../../shared/types/system";
import contactService from "./contact.service";
import { QueryString } from "../../services/util.service";

const getContactMsgs = asyncErrorCatcher(async (req: Request, res: Response) => {
  const queryString = req.query as QueryString;
  const contactMsgs = await contactService.query(queryString);
  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: contactMsgs.length,
    data: contactMsgs,
  });
});

const updateContactMsg = asyncErrorCatcher(async (req: Request, res: Response) => {
  const contactMsg = req.body as any;
  const updatedContactMsg = await contactService.update(contactMsg);

  res.status(200).json({
    status: "success",
    data: updatedContactMsg,
  });
});

const addContactMsg = asyncErrorCatcher(async (req: Request, res: Response) => {
  const msg = req.body as any;
  const { type } = req.query;
  if (!type) throw new AppError("Contact Type is required", 400);
  const name = msg.userDetails ? msg.userDetails.username : "Anonymous";
  const email = msg.userDetails ? msg.userDetails.email : "Anonymous";
  const userId = msg.userDetails ? msg.userDetails.id : null;
  const contactMsgToAdd = {
    name,
    email,
    userId,
    subject: msg.subject,
    content: msg.content,
    questionId: msg.questionId,
    defaultIssue: msg.defaultIssue,
    type: type as ContactMsgType,
  };

  const addedContactMsg = await contactService.add(contactMsgToAdd);

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
    data: addedContactMsg,
  });
});

export { getContactMsgs, updateContactMsg, addContactMsg };
