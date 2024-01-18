require("dotenv").config();
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { AppError } from "./error.service";

const {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
} = process.env;

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

async function sendEmail(options: { email: string; subject: string; message: string }) {
  const requiredEmailConfig = ["EMAIL_USERNAME", "EMAIL_PASSWORD", "EMAIL_HOST", "EMAIL_PORT"];
  requiredEmailConfig.forEach(config => {
    if (!process.env[config])
      throw new AppError(`Email config ${config} not found in .env file`, 500);
  });

  const transporter = nodemailer.createTransport({
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

async function sendProdMail(options: { email: string; subject: string; message: string }) {
  const accessToken = await oauth2Client.getAccessToken();
  if (!accessToken.token) throw new AppError("Could not get access token", 500);
  const transporter = nodemailer.createTransport({
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
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

sendProdMail({
  email: "esheleyni@gmail.com",
  subject: "asdasd",
  message: "asdasd",
});

export { sendEmail };
