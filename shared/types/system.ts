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

export type ThemeColors = {
  themeColor: string;
  accentColor: string;
};

export type DifficultyLevels =
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
  | "Jest"
  | "React"
  | "Vue"
  | "Angular"
  | "NodeJS"
  | "ExpressJS"
  | "SQL"
  | "MongoDB";

export type LanguageInfo = {
  name: ProgrammingLanguage;
  img: string;
  themeColors: ThemeColors;
};

export type systemSettings = {
  programmingLanguages: Record<ProgrammingLanguage, LanguageInfo>;
  difficultyLevels: DifficultyLevels[] | [];
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
