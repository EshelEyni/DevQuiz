export type Question = {
  id: string;
  language: string;
  question: string;
  options: string[];
  correctOption: number;
  level: string;
  points: number;
};
