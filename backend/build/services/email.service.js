"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendProdMail = exports.sendEmail = void 0;
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const error_service_1 = require("./error.service");
const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, } = process.env;
const { OAuth2 } = googleapis_1.google.auth;
const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
});
async function sendEmail(options) {
    const isProdEnv = process.env.NODE_ENV === "production";
    if (isProdEnv)
        await sendProdMail(options);
    else
        await sendDevMail(options);
}
exports.sendEmail = sendEmail;
async function sendDevMail(options) {
    const requiredEmailConfig = ["EMAIL_USERNAME", "EMAIL_PASSWORD", "EMAIL_HOST", "EMAIL_PORT"];
    requiredEmailConfig.forEach(config => {
        if (!process.env[config])
            throw new error_service_1.AppError(`Email config ${config} not found in .env file`, 500);
    });
    const transporter = nodemailer_1.default.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: "DevQuiz <DevQuiz.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    if (options.html)
        mailOptions.html = options.html;
    await transporter.sendMail(mailOptions);
}
async function sendProdMail(options) {
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken.token)
        throw new error_service_1.AppError("Could not get access token", 500);
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "esheleyni@gmail.com",
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });
    const mailOptions = {
        from: "elinidevquiz@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    if (options.html)
        mailOptions.html = options.html;
    transporter.sendMail(mailOptions, (error, info) => {
        // eslint-disable-next-line no-console
        if (error)
            console.log("error", error);
        // eslint-disable-next-line no-console
        else
            console.log("Email sent: " + info.response);
    });
}
exports.sendProdMail = sendProdMail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9lbWFpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQiw0REFBb0M7QUFDcEMsMkNBQW9DO0FBQ3BDLG1EQUEyQztBQWlCM0MsTUFBTSxFQUNKLGNBQWMsRUFDZCxjQUFjLEVBQ2QsVUFBVSxFQUNWLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLG9CQUFvQixHQUNyQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFaEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLG1CQUFNLENBQUMsSUFBSSxDQUFDO0FBRS9CLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUM3QixnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLCtDQUErQyxDQUNoRCxDQUFDO0FBRUYsWUFBWSxDQUFDLGNBQWMsQ0FBQztJQUMxQixhQUFhLEVBQUUsb0JBQW9CO0NBQ3BDLENBQUMsQ0FBQztBQUVILEtBQUssVUFBVSxTQUFTLENBQUMsT0FBb0I7SUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDO0lBQ3hELElBQUksU0FBUztRQUFFLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUN0QyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBNkRRLDhCQUFTO0FBM0RsQixLQUFLLFVBQVUsV0FBVyxDQUFDLE9BQW9CO0lBQzdDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0YsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUN0QixNQUFNLElBQUksd0JBQVEsQ0FBQyxnQkFBZ0IsTUFBTSx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3hCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxjQUFjO1lBQ3BCLElBQUksRUFBRSxjQUFjO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLEdBQWdCO1FBQy9CLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU87S0FDdEIsQ0FBQztJQUNGLElBQUksT0FBTyxDQUFDLElBQUk7UUFBRSxXQUFXLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFFbEQsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWSxDQUFDLE9BQW9CO0lBQzlDLE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlFLE1BQU0sV0FBVyxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUFDO1FBQzdDLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFlBQVksRUFBRSxvQkFBb0I7WUFDbEMsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEtBQUs7U0FDL0I7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBZ0I7UUFDL0IsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDakIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTztLQUN0QixDQUFDO0lBRUYsSUFBSSxPQUFPLENBQUMsSUFBSTtRQUFFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUVsRCxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNoRCxzQ0FBc0M7UUFDdEMsSUFBSSxLQUFLO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsc0NBQXNDOztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRW1CLG9DQUFZIn0=