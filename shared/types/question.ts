import { ProgrammingLanguage, difficultyLevels } from "./system";

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  language: string;
  level: string;
  points: number;
};


export type QuestionFilterBy = {
  language: ProgrammingLanguage;
  level: difficultyLevels;
  searchTerm: string;
};