import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import questionService from "../../services/question.service";
import { questionReqProps } from "../types";

export function startNewQuiz({
  language,
  level,
  page,
  limit = 25,
}: questionReqProps): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const questions = await questionService.query({ language, level, page, limit });
      dispatch({ type: "SET_QUESTIONS", questions });
      dispatch({ type: "SET_STATUS", status: "ready" });
      dispatch({ type: "INC_OFFSET" });
    } catch (err) {
      console.log("QuizActions: err in getQuestions", err);
    }
  };
}

export function resetQuiz(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: "SET_STATUS", status: "ready" });
      dispatch({ type: "SET_ANSWER_IDX", answerIdx: null });
      dispatch({ type: "RESET_QUIZ" });
    } catch (err) {
      console.log("QuizActions: err in resetQuiz", err);
    }
  };
}

export function setQuestionIdx(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: "SET_NEXT_QUESTION_IDX" });
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
      dispatch({ type: "SET_ANSWER_IDX", answerIdx });
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
      dispatch({ type: "SET_POINTS", points });
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
      dispatch({ type: "SET_HIGH_SCORE", highScore });
    } catch (err) {
      console.log("QuizActions: err in setHighScore", err);
    }
  };
}
