import {
  ProgrammingLanguage,
  DifficultyLevels,
} from "../../../shared/types/system";

export type questionReqProps = {
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  page?: number;
  limit?: number;
  searchTerm?: string;
  isEditPage?: boolean;
  isMarkedToBeRevised?: boolean;
};
export type AppStatus = "loading" | "ready" | "error" | "active" | "finished";
