import { logger } from "./services/logger.service";

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught exception:", err.name, err.message);
  process.exit(1);
});

require("dotenv").config();
import mongoose from "mongoose";
import app from "./app";
import { AppError } from "./services/error.service";

const DB = process.env.DB_URL;
if (!DB) throw new AppError("DB URL is not defined.", 500);

mongoose
  .connect(DB, {
    dbName: "fullstack_quiz_db",
  })
  .then(() => {
    logger.info("Connected to MongoDB.");
  })
  .catch(error => {
    logger.error("Failed to connect to MongoDB:", error);
  });

const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});
