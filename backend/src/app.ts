import { NextFunction, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
// import requestSanitizer from "./middlewares/html-sanitizer.middleware";
import hpp from "hpp";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { requestLogger } from "./middlewares/logger.middleware";
import { AppError, errorHandler } from "./services/error.service";
import setupAsyncLocalStorage from "./middlewares/setupAls.middleware";
import userRoutes from "./api/user/user.routes";
import authRoutes from "./api/auth/auth.routes";
import questionRoutes from "./api/question/question.routes";
import { requestLimiter } from "./services/rate-limiter.service";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(requestLimiter);
app.use(ExpressMongoSanitize());
// app.use(requestSanitizer);
app.use(
  hpp({
    whitelist: [], // add whitelisted query params here
  })
);

// cors
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://8807-2a06-c701-482b-fd00-1532-9c15-6a72-f650.ngrok-free.app",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.all("*", setupAsyncLocalStorage);
app.use((req: Request, res: Response, next: NextFunction) => {
  const isDevEnv = process.env.NODE_ENV !== "production";
  if (isDevEnv) requestLogger(req, res, next);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);

app.get("/**", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
