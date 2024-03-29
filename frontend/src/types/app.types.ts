import { ThunkAction } from "redux-thunk";
import { store } from "../store/store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { User } from "../../../shared/types/user";
import {
  DifficultyLevels,
  ProgrammingLanguage,
} from "../../../shared/types/system";

export type ReduxStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
>;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export type UserOrNull = User | null;

export type QueryState = {
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type LanguageAndLevel = {
  language: ProgrammingLanguage;
  level?: DifficultyLevels;
};
