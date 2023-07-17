import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import questionService from "../../services/question.service";
import { questionReqProps } from "../types";
import { actionTypes as systemActionTypes } from "./system.actions";
const { SET_STATUS } = systemActionTypes;

export const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_ANSWER_IDX: "SET_ANSWER_IDX",
  SET_POINTS: "SET_POINTS",
  SET_HIGH_SCORE: "SET_HIGH_SCORE",
  RESET_QUIZ: "RESET_QUIZ",
  SET_NEXT_QUESTION_IDX: "SET_NEXT_QUESTION_IDX",
  SET_IS_TIMER_ON: "SET_IS_TIMER_ON",
};

const {
  SET_QUESTIONS,
  SET_ANSWER_IDX,
  SET_POINTS,
  SET_HIGH_SCORE,
  RESET_QUIZ,
  SET_NEXT_QUESTION_IDX,
  SET_IS_TIMER_ON,
} = actionTypes;

export function startNewQuiz({
  language,
  level,
  page,
  limit = 25,
}: questionReqProps): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const questions = await questionService.query({ language, level, page, limit });
      dispatch({ type: SET_QUESTIONS, questions });
      dispatch({ type: SET_STATUS, status: "ready" });
    } catch (err) {
      console.log("QuizActions: err in getQuestions", err);
    }
  };
}

export function resetQuiz(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: RESET_QUIZ });
      dispatch({ type: SET_STATUS, status: "ready" });
    } catch (err) {
      console.log("QuizActions: err in resetQuiz", err);
    }
  };
}

export function setQuestionIdx(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_NEXT_QUESTION_IDX });
    } catch (err) {
      console.log("QuizActions: err in setQuestionIdx", err);
    }
  };
}

export function setAnswerIdx(
  answerIdx: number | null
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_ANSWER_IDX, answerIdx });
    } catch (err) {
      console.log("QuizActions: err in setAnswerIdx", err);
    }
  };
}

export function setPoints(
  points: number
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_POINTS, points });
    } catch (err) {
      console.log("QuizActions: err in setPoints", err);
    }
  };
}

export function setHighScore(
  highScore: number
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_HIGH_SCORE, highScore });
    } catch (err) {
      console.log("QuizActions: err in setHighScore", err);
    }
  };
}

export function setIsTimerOn(
  isTimerOn: boolean
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_TIMER_ON, isTimerOn });
    } catch (err) {
      console.log("QuizActions: err in toggleIsTimerOn", err);
    }
  };
}
