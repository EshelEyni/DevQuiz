/* eslint-disable no-console */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question, QuestionFilterBy } from "../../../../shared/types/question";
import { AppThunk, QueryState } from "../../types/app.types";
import { questionReqProps } from "../types";
import questionService from "../../services/question.service";
import {
  QUERY_TIMEOUT,
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";
import { setQuizQuestion } from "./quizSlice";

type QuestionState = {
  filterBy: QuestionFilterBy;
  questions: Question[];
  getQuestionsState: QueryState;
  question: Question | null;
  getQuestionState: QueryState;
  addQuestionState: QueryState;
  updateQuestionState: QueryState;
  removeQuestionState: QueryState;
};

const initialState: QuestionState = {
  questions: [],
  getQuestionsState: defaultQueryState,
  question: null,
  getQuestionState: defaultQueryState,
  filterBy: { level: "beginner", language: "HTML", searchTerm: "" },
  addQuestionState: defaultQueryState,
  updateQuestionState: defaultQueryState,
  removeQuestionState: defaultQueryState,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<QuestionFilterBy>) {
      state.filterBy = action.payload;
    },
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    setGetQuestionsState(state, action: PayloadAction<QueryState>) {
      state.getQuestionsState = action.payload;
    },
    setQuestion(state, action: PayloadAction<Question>) {
      state.question = action.payload;
    },
    setGetQuestionState(state, action: PayloadAction<QueryState>) {
      state.getQuestionState = action.payload;
    },
    updateQuestionInState(state, action: PayloadAction<Question>) {
      state.questions = state.questions.map(question =>
        question.id === action.payload.id ? action.payload : question,
      );
    },
    setUpdateQuestionState(state, action: PayloadAction<QueryState>) {
      state.updateQuestionState = action.payload;
    },
    addQuestionToState(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
    },
    setAddQuestionState(state, action: PayloadAction<QueryState>) {
      state.addQuestionState = action.payload;
    },
    removeQuestionFromState(state, action: PayloadAction<Question>) {
      state.questions = state.questions.filter(
        question => question.id !== action.payload.id,
      );
    },
    setRemoveQuestionState(state, action: PayloadAction<QueryState>) {
      state.removeQuestionState = action.payload;
    },
  },
});

export const {
  setFilter,
  setQuestions,
  setGetQuestionsState,
  setQuestion,
  setGetQuestionState,
  updateQuestionInState,
  setUpdateQuestionState,
  addQuestionToState,
  setAddQuestionState,
  removeQuestionFromState,
  setRemoveQuestionState,
} = questionSlice.actions;

export default questionSlice.reducer;

export function getQuestions({
  language,
  level,
  page,
  limit = 25,
  searchTerm,
  isEditPage,
  isMarkedToBeRevised,
}: questionReqProps): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetQuestionsState({ state: "loading", error: null }));
      const questions = await questionService.query({
        language,
        level,
        page,
        limit,
        searchTerm,
        isEditPage,
        isMarkedToBeRevised,
      });

      dispatch(setQuestions(questions));
      dispatch(setGetQuestionsState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setGetQuestionsState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setGetQuestionsState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function getDuplicatedQuestions({
  language,
}: {
  language: string;
}): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetQuestionsState({ state: "loading", error: null }));
      const questions = await questionService.getDuplicatedQuestions({
        language,
      });
      dispatch(setQuestions(questions));
      dispatch(setGetQuestionsState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setGetQuestionsState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setGetQuestionsState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function getQuestion(questionId: string): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetQuestionState({ state: "loading", error: null }));
      const question = await questionService.getById(questionId);
      dispatch(setQuestion(question));
      dispatch(setGetQuestionState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setGetQuestionState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setGetQuestionState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function updateQuestion(question: Question): AppThunk {
  return async dispatch => {
    try {
      dispatch(setUpdateQuestionState({ state: "loading", error: null }));
      const updatedQuestion = await questionService.update(question);
      dispatch(updateQuestionInState(updatedQuestion));
      dispatch(setQuizQuestion(updatedQuestion));
      dispatch(setUpdateQuestionState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setUpdateQuestionState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setUpdateQuestionState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function addQuestion(question: Question): AppThunk {
  return async dispatch => {
    try {
      dispatch(setAddQuestionState({ state: "loading", error: null }));
      const addedQuestion = await questionService.add(question);
      dispatch(addQuestion(addedQuestion));
      dispatch(setAddQuestionState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setAddQuestionState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setAddQuestionState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function removeQuestion(question: Question): AppThunk {
  return async dispatch => {
    try {
      dispatch(setRemoveQuestionState({ state: "loading", error: null }));
      await questionService.archive(question);
      dispatch(removeQuestion(question));
      dispatch(setRemoveQuestionState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setRemoveQuestionState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setRemoveQuestionState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}
