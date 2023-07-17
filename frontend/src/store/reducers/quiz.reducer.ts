import { Question } from "../../../../shared/types/question";
import { actionTypes } from "../actions/quiz.actions";
const {
  SET_QUESTIONS,
  SET_NEXT_QUESTION_IDX,
  SET_ANSWER_IDX,
  SET_POINTS,
  SET_HIGH_SCORE,
  RESET_QUIZ,
  SET_IS_TIMER_ON,
} = actionTypes;

type QuizState = {
  questions: Question[];
  numQuestions: number;
  questionIdx: number;
  answerIdx: number | null;
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  isTimerOn: boolean;
};

const initialState: QuizState = {
  questions: [],
  numQuestions: 0,
  questionIdx: 0,
  answerIdx: null,
  points: 0,
  maxPossiblePoints: 0,
  highScore: 0,
  isTimerOn: false,
};

export function quizReducer(
  state = initialState,
  action: {
    type: string;
    questions: Question[];
    answerIdx: number | null;
    points: number;
    highScore: number;
    isTimerOn: boolean;
  }
): QuizState {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
        numQuestions: action.questions.length,
        questionIdx: 0,
        answerIdx: null,
        points: 0,
        maxPossiblePoints: action.questions.reduce((acc, curr) => acc + curr.points, 0),
      };
    case SET_NEXT_QUESTION_IDX:
      return {
        ...state,
        questionIdx: ++state.questionIdx,
        answerIdx: null,
      };
    case SET_ANSWER_IDX: {
      const currQuestion = state.questions[state.questionIdx];
      const isCorrect = currQuestion.correctOption === action.answerIdx;
      const points = isCorrect ? state.points + currQuestion.points : state.points;
      return {
        ...state,
        answerIdx: action.answerIdx,
        points,
      };
    }
    case SET_POINTS: {
      const currQuestion = state.questions[state.questionIdx];
      return {
        ...state,
        points: state.points + currQuestion.points,
      };
    }
    case SET_HIGH_SCORE:
      return {
        ...state,
        highScore: action.highScore,
      };
    case RESET_QUIZ:
      return {
        ...state,
        questionIdx: 0,
        answerIdx: null,
        points: 0,
      };

    case SET_IS_TIMER_ON:
      return {
        ...state,
        isTimerOn: action.isTimerOn,
      };
    default:
      return state;
  }
}
