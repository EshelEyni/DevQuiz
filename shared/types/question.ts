import { ProgrammingLanguage, DifficultyLevels } from "./system";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  points: number;
  isArchived: boolean;
  isMarkedToBeRevised: boolean;
  isRevised: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionFilterBy = {
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  searchTerm: string;
};

export type QuestionStatus = "approved" | "archived" | "marked" | "";
