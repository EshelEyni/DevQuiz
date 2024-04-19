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
  | "SQL"
  | "MongoDB"
  | "Git";
// | "Docker"
// | "Python";

export type LanguageInfo = {
  name: ProgrammingLanguage;
  img: string;
  themeColors: ThemeColors;
};

export type systemSettings = {
  programmingLanguages: Record<ProgrammingLanguage, LanguageInfo>;
  difficultyLevels: DifficultyLevels[] | [];
};

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

export type FetchAPIQuestionsParams = {
  prompt: string;
  numberOfQuestions: number;
  language: ProgrammingLanguage;
  level: DifficultyLevels;
};

export type LevelOrAll = DifficultyLevels | "all";

export type ApprovedMarkedValues = {
  name: string;
  value: boolean | undefined;
};

export type SearchFilterBy = {
  language: ProgrammingLanguage;
  level: LevelOrAll;
  searchTerm: string;
  approved: ApprovedMarkedValues;
  marked: ApprovedMarkedValues;
};
