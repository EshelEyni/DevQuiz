import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import questionService from "../../services/question.service";

import { questionReqProps } from "../types";
import { Question } from "../../../../shared/types/question";

export const actionTypes = {
  SET_FILTER: "SET_FILTER",
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_QUESTION: "SET_QUESTION",
  ADD_QUESTION: "ADD_QUESTION",
  REMOVE_QUESTION: "REMOVE_QUESTION",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const {
  SET_FILTER,
  SET_IS_LOADING,
  SET_QUESTIONS,
  SET_QUESTION,
  ADD_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
} = actionTypes;

export function setFilter(filterBy: {
  level: string;
  language: string;
  searchTerm: string;
}): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_FILTER, filterBy });
    } catch (err) {
      console.log("QuizActions: err in setFilter", err);
    }
  };
}

export function getQuestions({
  language,
  level,
  page,
  limit = 25,
  searchTerm,
  isEditPage,
}: questionReqProps): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const questions = await questionService.query({
        language,
        level,
        page,
        limit,
        searchTerm,
        isEditPage,
      });
      dispatch({ type: SET_QUESTIONS, questions });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("QuizActions: err in getQuestions", err);
    }
  };
}

export function getDuplicatedQuestions({
  language,
}: {
  language: string;
}): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const questions = await questionService.getDuplicatedQuestions({ language });
      dispatch({ type: SET_QUESTIONS, questions });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("QuizActions: err in getDuplicatedQuestions", err);
    }
  };
}

export function getQuestion(
  questionId: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const question = await questionService.getById(questionId);
      dispatch({ type: SET_QUESTION, question });
    } catch (err) {
      console.log("QuizActions: err in getQuestion", err);
    }
  };
}

export function addQuestion(
  question: Question
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const addedQuestion = await questionService.add(question);
      dispatch({ type: ADD_QUESTION, question: addedQuestion });
    } catch (err) {
      console.log("QuizActions: err in addQuestion", err);
    }
  };
}

export function updateQuestion(
  question: Question
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const updatedQuestion = await questionService.update(question);
      dispatch({ type: UPDATE_QUESTION, updatedQuestion });
    } catch (err) {
      console.log("QuizActions: err in updateQuestion", err);
    }
  };
}

export function archiveQuestion(
  questionId: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      await questionService.archive(questionId);
      dispatch({ type: REMOVE_QUESTION, questionId });
    } catch (err) {
      console.log("QuizActions: err in removeQuestion", err);
    }
  };
}
