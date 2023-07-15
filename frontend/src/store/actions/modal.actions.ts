import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "redux";

export const actionTypes = {
  TOGGLE_IS_CONTACT_MODAL_OPEN: "TOGGLE_IS_CONTACT_MODAL_OPEN",
  TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN: "TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN",
  TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN: "TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN",
  TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN: "TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN",
};

const {
  TOGGLE_IS_CONTACT_MODAL_OPEN,
  TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN,
  TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN,
  TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN,
} = actionTypes;

export function toggleIsContactModalOpen(): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({ type: TOGGLE_IS_CONTACT_MODAL_OPEN });
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
      dispatch({ type: TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN });
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
      dispatch({ type: TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}

export function toggleIsQuestionArchiveModalOpen(): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({ type: TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN });
    } catch (err) {
      console.log("PostActions: err in getPosts", err);
    }
  };
}
