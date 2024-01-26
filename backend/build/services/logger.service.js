"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = __importDefault(require("fs"));
const als_service_1 = require("./als.service");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const logsDir = "./logs";
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir);
}
//define the time format
function getTime() {
    const now = new Date();
    return now.toLocaleString("he");
}
function isError(e) {
    return e instanceof Error && !!e.stack && !!e.message;
}
function doLog(level, ...args) {
    const strs = args.map(arg => typeof arg === "string" || isError(arg) ? arg : JSON.stringify(arg));
    let line = strs.join(" | ");
    const store = als_service_1.asyncLocalStorage.getStore();
    const userId = store?.loggedinUserId;
    const str = userId ? `(userId: ${userId})` : "";
    line = `${getTime()} - ${level} - ${line} ${str}\n`;
    switch (level) {
        case "DEBUG":
            line = ansi_colors_1.default.bgMagenta(line);
            break;
        case "INFO":
            line = ansi_colors_1.default.bgGreen(line);
            break;
        case "SUCCESS":
            line = ansi_colors_1.default.bgBlue(line);
            break;
        case "WARN":
            line = ansi_colors_1.default.bgYellow(line);
            break;
        case "ERROR":
            line = ansi_colors_1.default.bgRed(line);
            break;
    }
    console.log(line);
    fs_1.default.appendFile("./logs/backend.log", line, (err) => {
        if (err)
            console.log(ansi_colors_1.default.red("FATAL: cannot write to log file"));
    });
}
function debug(...args) {
    if (process.env.NODE_NEV === "production")
        return;
    doLog("DEBUG", ...args);
}
function info(...args) {
    doLog("INFO", ...args);
}
function success(...args) {
    doLog("SUCCESS", ...args);
}
function warn(...args) {
    doLog("WARN", ...args);
}
function error(...args) {
    doLog("ERROR", ...args);
}
exports.logger = {
    debug,
    info,
    success,
    warn,
    error,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHVEQUF1RDtBQUN2RCw0Q0FBb0I7QUFDcEIsK0NBQWtEO0FBQ2xELDhEQUFxQztBQUdyQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDekIsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDM0IsWUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUN2QjtBQUVELHdCQUF3QjtBQUN4QixTQUFTLE9BQU87SUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3ZCLE9BQU8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFHLElBQWtEO0lBQ2pGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDMUIsT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUNwRSxDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixNQUFNLEtBQUssR0FBRywrQkFBaUIsQ0FBQyxRQUFRLEVBQWlCLENBQUM7SUFDMUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUFFLGNBQWMsQ0FBQztJQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRCxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3BELFFBQVEsS0FBSyxFQUFFO1FBQ2IsS0FBSyxPQUFPO1lBQ1YsSUFBSSxHQUFHLHFCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE1BQU07UUFDUixLQUFLLE1BQU07WUFDVCxJQUFJLEdBQUcscUJBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLElBQUksR0FBRyxxQkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxHQUFHLHFCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE1BQU07UUFDUixLQUFLLE9BQU87WUFDVixJQUFJLEdBQUcscUJBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTTtLQUNUO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3JELElBQUksR0FBRztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEdBQUcsSUFBYztJQUM5QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVk7UUFBRSxPQUFPO0lBQ2xELEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFXO0lBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxJQUFXO0lBQzdCLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFXO0lBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsR0FBRyxJQUEyQjtJQUMzQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLEtBQUs7SUFDTCxJQUFJO0lBQ0osT0FBTztJQUNQLElBQUk7SUFDSixLQUFLO0NBQ04sQ0FBQyJ9