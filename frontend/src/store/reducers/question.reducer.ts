import { Question, QuestionFilterBy } from "../../../../shared/types/question";
import { actionTypes } from "../actions/question.actions";

const { SET_FILTER, SET_QUESTIONS, SET_QUESTION, ADD_QUESTION, REMOVE_QUESTION } = actionTypes;

const initialState: {
  questions: Question[];
  question: Question | null;
  filterBy: QuestionFilterBy;
} = {
  questions: [],
  question: null,
  filterBy: { level: "beginner", language: "HTML", searchTerm: "" },
};

export function questionReducer(
  state = initialState,
  action: {
    type: string;
    questions: Question[];
    question: Question;
    questionId: string;
    updatedQuestion: Question;
    filterBy: QuestionFilterBy;
  }
) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy };
    case SET_QUESTIONS:
      return { ...state, questions: action.questions };
    case SET_QUESTION:
      return { ...state, question: action.question };
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.question] };
    case REMOVE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.questionId),
      };
    default:
      return state;
  }
}
