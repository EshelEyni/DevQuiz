import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "redux";
import systemService from "../../services/system.service";

export function setIsPageLoading(
  isPageLoading: boolean
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: "SET_IS_PAGE_LOADING", isPageLoading });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function setIsSideBarShown(
  isSideBarShown: boolean
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: "SET_IS_SIDEBAR_SHOWN", isSideBarShown });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function getSystemSettings(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const systemSettingsArr = (await systemService.getSystemSettings()) as any;
      const systemSettings = systemSettingsArr[0];
      dispatch({ type: "SET_SYSTEM_SETTINGS", systemSettings });
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
      dispatch({ type: "SET_LANGUAGE", language });
      dispatch({ type: "RESET_QUIZ" });
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
      dispatch({ type: "SET_SECONDS_PER_QUESTION", secondsPerQuestion });
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
      dispatch({ type: "SET_LEVEL", level });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function toggleIsContactModalOpen(): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({ type: "TOGGLE_IS_CONTACT_MODAL_OPEN" });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function toggleIsReportQuestionModalOpen(): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({ type: "TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN" });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function toggleIsLoginSignupModalOpen(): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({ type: "TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN" });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}
