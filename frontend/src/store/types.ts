import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "./store";
import { ProgrammingLanguage, difficultyLevels } from "../../../shared/types/system";

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export type questionReqProps = {
  language: ProgrammingLanguage;
  level: difficultyLevels;
  offSet: number;
};
export type AppStatus = "loading" | "ready" | "error" | "active" | "finished";
