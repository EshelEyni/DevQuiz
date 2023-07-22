import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "redux";
import systemService from "../../services/system.service";

export const actionTypes = {
  SET_SYSTEM_SETTINGS: "SET_SYSTEM_SETTINGS",
  SET_STATUS: "SET_STATUS",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_SECONDS_PER_QUESTION: "SET_SECONDS_PER_QUESTION",
  SET_LEVEL: "SET_LEVEL",
};

const { SET_SYSTEM_SETTINGS, SET_LANGUAGE, SET_SECONDS_PER_QUESTION, SET_LEVEL } = actionTypes;

export function getSystemSettings(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const systemSettingsArr = (await systemService.getSystemSettings()) as any;
      const systemSettings = systemSettingsArr;
      dispatch({ type: SET_SYSTEM_SETTINGS, systemSettings });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function setLanguage(
  language: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_LANGUAGE, language });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function setSecondsPerQuestion(
  secondsPerQuestion: number
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_SECONDS_PER_QUESTION, secondsPerQuestion });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function setLevel(
  level: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_LEVEL, level });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}
