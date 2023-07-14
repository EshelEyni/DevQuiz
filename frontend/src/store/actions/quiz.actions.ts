import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import quizService from "../../services/quiz.service";
import { questionReqProps } from "../types";

export function getQuestions({
  language,
  level,
  offSet,
}: questionReqProps): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const questions = await quizService.query({ language, level, offSet });
      dispatch({ type: "SET_QUESTIONS", questions });
      dispatch({ type: "SET_STATUS", status: "ready" });
      dispatch({ type: "INC_OFFSET" });
    } catch (err) {
      console.log("QuizActions: err in getQuestions", err);
    }
  };
}

export function setQuestionIdx(
  questionIdx: number
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
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
