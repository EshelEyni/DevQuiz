import { DifficultyLevels, ProgrammingLanguage } from "./system";

export interface BasicUser {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

export interface User extends BasicUser {
  id: string;
  roles: UserRoles[];
  createdAt: number;
  quizSettings: {
    language: ProgrammingLanguage;
    level: DifficultyLevels;
    numQuestions: number;
    secondsPerQuestion: number;
  };
}

export type UserRoles = "user" | "admin" | "editor";

export interface UserCorrectAnswer {
  userId: string;
  questionId: string;
  language: string;
  level: string;
}
