import {
  ProgrammingLanguage,
  DifficultyLevels,
} from "../../../shared/types/system";

export type questionReqProps = {
  language: ProgrammingLanguage;
  level?: DifficultyLevels;
  page?: number;
  limit?: number;
  searchTerm?: string;
  isMarkedToBeRevised?: boolean;
  isRevised?: boolean;
  secondsPerQuestion?: number;
};
export type AppStatus = "loading" | "ready" | "error" | "active" | "finished";
