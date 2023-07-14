import { User } from "./user";

export interface JsendResponse {
  status: string;
  requested_at?: string;
  result?: number;
  data?: any;
  message?: string;
}

export interface IAsyncLocalStorageStore {
  loggedinUser?: User;
}

export interface UserMsg {
  type: "info" | "success" | "error" | "warning" | "";
  text: string;
  link?: string;
}

export type ThemeColors = {
  [language in ProgrammingLanguage]?: {
    themeColor: string;
    accentColor: string;
  };
};
export type difficultyLevels =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert"
  | "master";

export type ProgrammingLanguage =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "Angular"
  | "React"
  | "Vue"
  | "NodeJS"
  | "SQL"
  | "MongoDB";

export type systemSettings = {
  programmingLanguages: ProgrammingLanguage[] | [];
  difficultyLevels: difficultyLevels[] | [];
  themeColors: ThemeColors | {};
};

export type ContactMessage = {
  subject: string;
  content: string;
  userDetails?: User;
};

export type ReportQuestionMessage = {
  questionId: string;
  defaultIssue: string;
  content: string;
  userDetails?: User;
};
