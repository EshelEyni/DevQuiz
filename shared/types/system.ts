import { User } from "./user";

export type AnyFunction = (...args: any[]) => any;

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

export type DifficultyLevels = "beginner" | "intermediate" | "advanced";

export type ProgrammingLanguage =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "Jest"
  | "React"
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

interface BasicContactMessage {
  id: string;
  name: string;
  markedAsRead: boolean;
  markedAsSpam: boolean;
  markedAsDone: boolean;
  markedAsImportant: boolean;
  isArchived: boolean;
  updatedAt: Date;
  createdAt: Date;
  email?: string;
  userDetails?: User;
}

export interface ContactMessageContent {
  subject: string;
  content: string;
}

export interface ContactMessage
  extends ContactMessageContent,
    BasicContactMessage {
  type: "contact";
}

export interface ReportQuestionMessageContent {
  questionId: string;
  defaultIssue: string;
  content: string;
}

export interface ReportQuestionMessage
  extends ReportQuestionMessageContent,
    BasicContactMessage {
  type: "report";
}

export interface RavenDbDocument {
  "@metadata"?: {
    "@collection": string;
  };
}

export type answersData = {
  userId: string;
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  count: number;
};

export type questionsData = {
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  count: number;
};

export type StatsDisplayLevel = "total" | DifficultyLevels;

export type QuestionAnswerCount = Record<StatsDisplayLevel, number>;

export type QuestionAnswerCounts = Record<
  ProgrammingLanguage,
  QuestionAnswerCount
>;

export type UserStats = {
  answersCount: QuestionAnswerCounts;
  questionsCount: QuestionAnswerCounts;
};
