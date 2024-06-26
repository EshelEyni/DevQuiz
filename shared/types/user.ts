import {
  DifficultyLevels,
  ProgrammingLanguage,
  SearchFilterBy,
} from "./system";

export interface BasicUser {
  username: string;
  password: string;
  passwordConfirm: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date | number | string;
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
  searchSettings: SearchFilterBy;
  linkedInProfile?: string;
  githubProfile?: string;
  portfolio?: string;
}

export type UserRoles = "user" | "admin" | "editor" | "applicant";

export interface UserCorrectAnswer {
  userId: string;
  questionId: string;
  language: string;
  level: string;
}
