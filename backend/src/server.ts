import { logger } from "./services/logger.service";

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught exception:", err.name, err.message);
  process.exit(1);
});

require("dotenv").config();
import mongoose from "mongoose";
import app from "./app";
import { AppError } from "./services/error.service";
import { DocumentStore, DocumentType, IAuthOptions } from "ravendb";
import { Question } from "../../shared/types/question";
import fs from "fs";

const certPath = "C:\\Users\\Oren\\Downloads\\free.esheleyni.client.certificate\\free.esheleyni.client.certificate.pfx";

let authOptions = {
  certificate: fs.readFileSync(certPath),
  type: "pfx",
} as IAuthOptions;
export const ravenStore = new DocumentStore(["https://a.free.esheleyni.ravendb.cloud"], "Fullstack.Quiz", authOptions);
ravenStore.initialize();

// initial loading....
// (async () => {
//   const fs = require("fs");
//   const data = fs.readFileSync("D:\\fullstack quiz\\backend\\data\\backup\\fullstack_quiz_db.questions.json", "utf8");
//   const questions = JSON.parse(data);
//   const session = ravenStore.openSession();
//   for (let i = 0; i < questions.length; i++) {  
//     const question = questions[i];
//     question["@metadata"] = {"@collection": "Questions"};
//     await session.store(question, "Questions/");
//   }
//   await session.saveChanges();
// })();


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
