/* eslint-disable no-console */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "../../../../shared/types/question";
import { AppThunk, QueryState } from "../../types/app.types";
import { questionReqProps } from "../types";
import questionService from "../../services/question.service";
import {
  QUERY_TIMEOUT,
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";
import { setQuizQuestion } from "./quizSlice";
import {
  FetchAPIQuestionsParams,
  SearchFilterBy,
} from "../../../../shared/types/system";

type QuestionState = {
  questions: Question[];
  getQuestionsState: QueryState;
  question: Question | null;
  getQuestionState: QueryState;
  addQuestionState: QueryState;
  updateQuestionState: QueryState;
  removeQuestionState: QueryState;
  filterBy: SearchFilterBy;
  editState: EditState;
};

type EditState = {
  approveCount: number;
  markCount: number;
  archiveCount: number;
};

const initialState: QuestionState = {
  questions: [],
  getQuestionsState: defaultQueryState,
  question: null,
  getQuestionState: defaultQueryState,
  addQuestionState: defaultQueryState,
  updateQuestionState: defaultQueryState,
  removeQuestionState: defaultQueryState,
  filterBy: {
    language: "HTML",
    level: "beginner",
    searchTerm: "",
    approved: { name: "All", value: undefined },
    marked: { name: "All", value: undefined },
  },
  editState: {
    approveCount: 0,
    markCount: 0,
    archiveCount: 0,
  },
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
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
      state.questions.unshift(action.payload);
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
    setFilterBy(state, action: PayloadAction<SearchFilterBy>) {
      state.filterBy = action.payload;
    },
    setApproveCount(state, action: PayloadAction<number>) {
      const newVal = state.editState.approveCount + action.payload;
      state.editState = {
        ...state.editState,
        approveCount: newVal > 0 ? newVal : 0,
      };
    },
    setMarkCount(state, action: PayloadAction<number>) {
      const newVal = state.editState.markCount + action.payload;
      state.editState = {
        ...state.editState,
        markCount: newVal > 0 ? newVal : 0,
      };
    },
    setArchiveCount(state, action: PayloadAction<number>) {
      const newVal = state.editState.archiveCount + action.payload;
      state.editState = {
        ...state.editState,
        archiveCount: newVal > 0 ? newVal : 0,
      };
    },
  },
});

export const {
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
  setFilterBy,
  setApproveCount,
  setMarkCount,
  setArchiveCount,
} = questionSlice.actions;

export default questionSlice.reducer;

export function getQuestions({
  language,
  level,
  page,
  limit = 25,
  searchTerm,
  isMarkedToBeRevised,
  isRevised,
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
        isMarkedToBeRevised,
        isRevised,
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

export function getQuestionDuplications(questionId: string): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetQuestionsState({ state: "loading", error: null }));
      const questions =
        await questionService.getQuestionDuplications(questionId);
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

export function updateQuestion(
  question: Question,
  type?: "approve" | "mark" | "archive",
): AppThunk {
  return async dispatch => {
    try {
      dispatch(setUpdateQuestionState({ state: "loading", error: null }));
      const updatedQuestion = await questionService.update(question);
      const isManagementPage = window.location.pathname.includes(
        "question-management",
      );

      if (isManagementPage) dispatch(updateQuestionInState(updatedQuestion));
      else dispatch(setQuizQuestion(updatedQuestion));
      dispatch(setUpdateQuestionState({ state: "succeeded", error: null }));

      switch (type) {
        case "approve": {
          const val = question.isRevised ? 1 : -1;
          dispatch(setApproveCount(val));
          break;
        }
        case "mark": {
          const val = question.isMarkedToBeRevised ? 1 : -1;
          dispatch(setMarkCount(val));
          break;
        }
        case "archive": {
          const val = question.isArchived ? 1 : -1;
          dispatch(setArchiveCount(val));
          break;
        }
      }
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
      dispatch(addQuestionToState(addedQuestion));
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

export function fetchQuestionsFromOpenAI({
  prompt,
  language,
  level,
  numberOfQuestions,
}: FetchAPIQuestionsParams): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetQuestionsState({ state: "loading", error: null }));
      const questions = await questionService.fetchQuestionsFromOpenAI({
        prompt,
        language,
        level,
        numberOfQuestions,
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

export function removeQuestion(question: Question): AppThunk {
  return async dispatch => {
    try {
      dispatch(setRemoveQuestionState({ state: "loading", error: null }));
      await questionService.archive(question);
      dispatch(setRemoveQuestionState({ state: "succeeded", error: null }));
      dispatch(setArchiveCount(1));
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
