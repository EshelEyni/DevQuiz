"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ravenStore = void 0;
const logger_service_1 = require("./services/logger.service");
process.on("uncaughtException", (err) => {
    logger_service_1.logger.error("Uncaught exception:", err.name, err.message);
    process.exit(1);
});
require("dotenv").config();
const app_1 = __importDefault(require("./app"));
const ravendb_1 = require("ravendb");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const certPath = path_1.default.resolve(__dirname, "..", "raven_certificate", "free.esheleyni.client.certificate.pfx");
const ravenAuthOptions = {
    certificate: fs_1.default.readFileSync(certPath),
    type: "pfx",
};
exports.ravenStore = new ravendb_1.DocumentStore(["https://a.free.esheleyni.ravendb.cloud"], "Fullstack.Quiz", ravenAuthOptions);
try {
    exports.ravenStore.initialize();
    logger_service_1.logger.info("Connected to RavenDB.");
}
catch (error) {
    logger_service_1.logger.error("Failed to connect to RavenDB:", error);
}
const port = process.env.PORT || 3030;
const server = app_1.default.listen(port, () => {
    logger_service_1.logger.info(`Server is running on port: ${port}`);
});
process.on("unhandledRejection", (err) => {
    logger_service_1.logger.error("Unhandled rejection:", err);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBbUQ7QUFFbkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQzdDLHVCQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsZ0RBQXdCO0FBQ3hCLHFDQUFzRDtBQUN0RCw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQzNCLFNBQVMsRUFDVCxJQUFJLEVBQ0osbUJBQW1CLEVBQ25CLHVDQUF1QyxDQUN4QyxDQUFDO0FBRUYsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixXQUFXLEVBQUUsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxFQUFFLEtBQUs7Q0FDSSxDQUFDO0FBRUwsUUFBQSxVQUFVLEdBQUcsSUFBSSx1QkFBYSxDQUN6QyxDQUFDLHdDQUF3QyxDQUFDLEVBQzFDLGdCQUFnQixFQUNoQixnQkFBZ0IsQ0FDakIsQ0FBQztBQUVGLElBQUk7SUFDRixrQkFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLHVCQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Q0FDdEM7QUFBQyxPQUFPLEtBQUssRUFBRTtJQUNkLHVCQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3REO0FBRUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRXRDLE1BQU0sTUFBTSxHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNuQyx1QkFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUM5Qyx1QkFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==