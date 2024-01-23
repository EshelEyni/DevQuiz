import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";
import userService from "../api/user/user.service";

const getIsAdminUser = async (req: Request) => {
  const { loggedinUserId } = req;
  if (!loggedinUserId) return false;
  const user = await userService.getById(loggedinUserId);
  if (!user) return false;
  return user.roles.includes("admin");
};

const requestSanitizer = async (req: Request, res: Response, next: NextFunction) => {
  const isAdminUser = await getIsAdminUser(req);
  if (isAdminUser) return next();

  const { body } = req;
  const { params } = req;
  const { query } = req;

  if (body) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizeBody = (body: any) => {
      for (const key in body) {
        if (typeof body[key] === "string") {
          body[key] = sanitizeHtml(body[key] as string);
        } else if (typeof body[key] === "object") {
          sanitizeBody(body[key]);
        }
      }
    };

    sanitizeBody(body);
  }

  if (params) {
    for (const key in params) {
      if (typeof params[key] === "string") {
        params[key] = sanitizeHtml(params[key] as string);
      }
    }
  }

  if (query) {
    for (const key in query) {
      if (typeof query[key] === "string") {
        query[key] = sanitizeHtml(query[key] as string);
      }
    }
  }

  next();
};

export default requestSanitizer;
