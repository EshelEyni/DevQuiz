import { logger } from "./services/logger.service";

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught exception:", err.name, err.message);
  process.exit(1);
});

require("dotenv").config();
import app from "./app";
import { DocumentStore, IAuthOptions } from "ravendb";
import fs from "fs";
import path from "path";

const certPath = path.resolve(
  __dirname,
  "..",
  "raven_certificate",
  "free.esheleyni.client.certificate.pfx"
);

const ravenAuthOptions = {
  certificate: fs.readFileSync(certPath),
  type: "pfx",
} as IAuthOptions;

export const ravenStore = new DocumentStore(
  ["https://a.free.esheleyni.ravendb.cloud"],
  "Fullstack.Quiz",
  ravenAuthOptions
);

try {
  ravenStore.initialize();
  logger.info("Connected to RavenDB.");
} catch (error) {
  logger.error("Failed to connect to RavenDB:", error);
}

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
