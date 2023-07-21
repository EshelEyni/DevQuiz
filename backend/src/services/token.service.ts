import { Request } from "express";
import { AppError } from "./error.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

function getTokenFromRequest(req: Request) {
  const { cookies } = req;
  let tokenFromHeaders;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    tokenFromHeaders = req.headers.authorization.split(" ")[1];
  const token = cookies.loginToken || tokenFromHeaders;
  return token;
}

function signToken(id: string) {
  const { JWT_SECRET_CODE, JWT_EXPIRATION_TIME } = process.env;
  if (!JWT_SECRET_CODE) throw new AppError("jwtSecretCode not found in config", 500);
  if (!JWT_EXPIRATION_TIME) throw new AppError("jwtExpirationTime not found in config", 500);

  const token = jwt.sign({ id }, JWT_SECRET_CODE, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  if (!token) throw new AppError("Token not created", 500);
  return token;
}

async function verifyToken(token: string): Promise<{ id: string; timeStamp: number } | null> {
  try {
    const { JWT_SECRET_CODE } = process.env;
    if (!JWT_SECRET_CODE) throw new AppError("jwtSecretCode not found in config", 500);

    const decoded = jwt.verify(token, JWT_SECRET_CODE) as {
      id: string;
      iat: number;
    };

    const { id, iat } = decoded;
    return { id, timeStamp: iat };
  } catch (err) {
    return null;
  }
}

export default { getTokenFromRequest, signToken, verifyToken };
