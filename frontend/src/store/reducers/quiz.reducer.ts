import { Question } from "../../../../shared/types/question";
type QuizState = {
  questions: Question[];
  questionIdx: number;
  answerIdx: number | null;
  points: number;
  highScore: number;
};

const initialState: QuizState = {
  questions: [],
  questionIdx: 0,
  answerIdx: null,
  points: 0,
  highScore: 0,
};

export function quizReducer(
  state = initialState,
  action: {
    type: string;
    questions: Question[];
    answerIdx: number | null;
    points: number;
    highScore: number;
  }
): QuizState {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
        questionIdx: 0,
        answerIdx: null,
        points: 0,
      };
    case "SET_NEXT_QUESTION_IDX":
      return {
        ...state,
        questionIdx: ++state.questionIdx,
        answerIdx: null,
      };
    case "SET_ANSWER_IDX": {
      const currQuestion = state.questions[state.questionIdx];
      const isCorrect = currQuestion.correctOption === action.answerIdx;
      const points = isCorrect ? state.points + currQuestion.points : state.points;
      return {
        ...state,
        answerIdx: action.answerIdx,
        points,
      };
    }
    case "SET_POINTS": {
      const currQuestion = state.questions[state.questionIdx];
      return {
        ...state,
        points: state.points + currQuestion.points,
      };
    }
    case "SET_HIGH_SCORE":
      return {
        ...state,
        highScore: action.highScore,
      };
    case "RESET_QUIZ":
      return {
        ...state,
        questionIdx: 0,
        answerIdx: null,
        points: 0,
      };
    default:
      return state;
  }
}
