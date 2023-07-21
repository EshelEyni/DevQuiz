import { ProgrammingLanguage, DifficultyLevels } from "./system";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  language: string;
  level: string;
  points: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionFilterBy = {
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  searchTerm: string;
};
