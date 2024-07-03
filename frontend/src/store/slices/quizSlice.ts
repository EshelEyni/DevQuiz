/* eslint-disable no-console */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "../../../../shared/types/question";
import { AppStatus, questionReqProps } from "../types";
import { AppThunk, QueryState } from "../../types/app.types";
import questionService from "../../services/question.service";
import {
  QUERY_TIMEOUT,
  changeThemeColors,
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";
import {
  DifficultyLevels,
  ProgrammingLanguage,
} from "../../../../shared/types/system";
import { systemSettings } from "../../config";

type QuizState = {
  status: AppStatus;
  language: ProgrammingLanguage;
  secondsPerQuestion: number;
  page: number;
  level: DifficultyLevels;
  questions: Question[];
  answers: number[];
  quizQueryState: QueryState;
  numQuestions: number;
  questionIdx: number;
  answerIdx: number | null;
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  isTimerOn: boolean;
};

const initialState: QuizState = {
  status: "loading",
  language: "HTML",
  secondsPerQuestion: 30,
  level: "beginner",
  page: 1,
  questions: [],
  answers: [],
  quizQueryState: defaultQueryState,
  numQuestions: 25,
  questionIdx: 0,
  answerIdx: null,
  points: 0,
  maxPossiblePoints: 0,
  highScore: 0,
  isTimerOn: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<AppStatus>) {
      state.status = action.payload;
    },
    setLanguage(state, action: PayloadAction<ProgrammingLanguage>) {
      state.language = action.payload;
    },
    setSecondsPerQuestion(state, action: PayloadAction<number>) {
      state.secondsPerQuestion = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLevel(state, action: PayloadAction<DifficultyLevels>) {
      state.level = action.payload;
    },
    setQuizQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.numQuestions = action.payload.length;
      state.questionIdx = 0;
      state.answerIdx = null;
      state.points = 0;
      state.maxPossiblePoints = action.payload.reduce(
        (acc, curr) => acc + curr.points,
        0,
      );
    },
    setQuizQueryState(state, action: PayloadAction<QueryState>) {
      state.quizQueryState = action.payload;
    },
    setQuizQuestion(state, action: PayloadAction<Question>) {
      state.questions = state.questions.map(question =>
        question.id === action.payload.id ? action.payload : question,
      );
    },
    setNumQuestions(state, action: PayloadAction<number>) {
      state.numQuestions = action.payload;
    },
    setNextQuestionIdx(state) {
      state.questionIdx++;
      state.answerIdx = null;
    },
    setAnswerIdx(state, action: PayloadAction<number | null>) {
      state.answers[state.questionIdx] = action.payload ?? -1;
      state.answerIdx = action.payload;
    },
    setPoints(state, action: PayloadAction<number>) {
      state.points = state.points + action.payload;
    },
    setHighScore(state, action: PayloadAction<number>) {
      state.highScore = action.payload;
    },
    setIsTimerOn(state, action: PayloadAction<boolean>) {
      state.isTimerOn = action.payload;
    },
    resetQuizState(state) {
      state.status = "ready";
      state.questionIdx = 0;
      state.answerIdx = null;
      state.points = 0;
    },
  },
});

export const {
  setStatus,
  setLanguage,
  setSecondsPerQuestion,
  setPage,
  setLevel,
  setQuizQuestions,
  setQuizQueryState,
  setQuizQuestion,
  setNextQuestionIdx,
  setNumQuestions,
  setAnswerIdx,
  setPoints,
  setHighScore,
  setIsTimerOn,
  resetQuizState,
} = quizSlice.actions;

export default quizSlice.reducer;

export function startNewQuiz({
  language,
  level,
  page = 0,
  limit = 25,
  secondsPerQuestion = 30,
}: questionReqProps): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setStatus("loading"));
      dispatch(setQuizQueryState({ state: "loading", error: null }));

      const isAdmin =
        getState().auth.loggedInUser?.roles.includes("admin") ?? false;

      const options = {
        language,
        level,
        page,
        limit,
      } as questionReqProps;

      if (!isAdmin) options.isRevised = true;

      const questions = await questionService.query(options);
      dispatch(setQuizQuestions(questions));
      dispatch(setQuizQueryState({ state: "succeeded", error: null }));
      dispatch(setNumQuestions(limit));
      dispatch(setLanguage(language));
      if (level) dispatch(setLevel(level));
      if (page) dispatch(setPage(page));
      if (secondsPerQuestion)
        dispatch(setSecondsPerQuestion(secondsPerQuestion));
      const themeColors =
        systemSettings.programmingLanguages[language as ProgrammingLanguage]
          .themeColors;

      changeThemeColors(themeColors);

      dispatch(setStatus("ready"));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setQuizQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQuizQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}
