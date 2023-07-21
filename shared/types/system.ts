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

export type ContactMsgType = "contact" | "report";

export type ContactMsgs = Array<ContactMessage | ReportQuestionMessage>;

export interface BasicContactMessage {
  subject: string;
  content: string;
  userDetails?: User;
}

export interface ContactMessage extends BasicContactMessage {
  id: string;
  name: string;
  email?: string;
  markedAsRead: boolean;
  markedAsAnswered: boolean;
  markedAsSpam: boolean;
  markedAsDone: boolean;
  markedAsImportant: boolean;
  type: "contact";
  updatedAt: Date;
  createdAt: Date;
}

export interface BasicReportQuestionMessage {
  questionId: string;
  email?: string;
  defaultIssue: string;
  content: string;
  userDetails?: User;
}

export interface ReportQuestionMessage extends BasicReportQuestionMessage {
  id: string;
  name: string;
  markedAsRead: boolean;
  markedAsAnswered: boolean;
  markedAsSpam: boolean;
  markedAsDone: boolean;
  markedAsImportant: boolean;
  type: "report";
  updatedAt: Date;
  createdAt: Date;
}
