"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const error_service_1 = require("./error.service");
const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, } = process.env;
const { OAuth2 } = googleapis_1.google.auth;
const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
});
async function sendEmail(options) {
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
        // html:
    };
    await transporter.sendMail(mailOptions);
}
exports.sendEmail = sendEmail;
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
        from: "esheleyni@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error", error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
}
sendProdMail({
    email: "esheleyni@gmail.com",
    subject: "asdasd",
    message: "asdasd",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9lbWFpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQiw0REFBb0M7QUFDcEMsMkNBQW9DO0FBQ3BDLG1EQUEyQztBQUUzQyxNQUFNLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxVQUFVLEVBQ1YsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsb0JBQW9CLEdBQ3JCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUVoQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsbUJBQU0sQ0FBQyxJQUFJLENBQUM7QUFFL0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQzdCLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsK0NBQStDLENBQUMsZUFBZTtDQUNoRSxDQUFDO0FBRUYsWUFBWSxDQUFDLGNBQWMsQ0FBQztJQUMxQixhQUFhLEVBQUUsb0JBQW9CO0NBQ3BDLENBQUMsQ0FBQztBQUVILEtBQUssVUFBVSxTQUFTLENBQUMsT0FBNEQ7SUFDbkYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSx3QkFBUSxDQUFDLGdCQUFnQixNQUFNLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUM7UUFDN0MsSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDeEIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGNBQWM7WUFDcEIsSUFBSSxFQUFFLGNBQWM7U0FDckI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBRztRQUNsQixJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSztRQUNqQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3JCLFFBQVE7S0FDVCxDQUFDO0lBRUYsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUF1Q1EsOEJBQVM7QUFyQ2xCLEtBQUssVUFBVSxZQUFZLENBQUMsT0FBNEQ7SUFDdEYsTUFBTSxXQUFXLEdBQUcsTUFBTSxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUUsTUFBTSxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUM7UUFDN0MsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxZQUFZLEVBQUUsb0JBQW9CO1lBQ2xDLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSztTQUMvQjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHO1FBQ2xCLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU87S0FDdEIsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFlBQVksQ0FBQztJQUNYLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLFFBQVE7Q0FDbEIsQ0FBQyxDQUFDIn0=