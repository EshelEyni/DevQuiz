import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "./store";
import { ProgrammingLanguage, DifficultyLevels } from "../../../shared/types/system";

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export type questionReqProps = {
  language?: ProgrammingLanguage;
  level?: DifficultyLevels;
  page?: number;
  limit?: number;
  searchTerm?: string;
  isEditPage?: boolean;
};
export type AppStatus = "loading" | "ready" | "error" | "active" | "finished";
