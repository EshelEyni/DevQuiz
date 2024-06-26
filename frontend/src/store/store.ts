import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import questionSlice from "./slices/questionSlice";
import quizSlice from "./slices/quizSlice";
import userSlice from "./slices/userSlice";
import jobApplicationSlice from "./slices/jobApplicationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    question: questionSlice,
    quiz: quizSlice,
    user: userSlice,
    jobApplication: jobApplicationSlice,
  },
});
