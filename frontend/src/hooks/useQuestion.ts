import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";

export function useQuestion() {
  const {
    questions,
    getQuestionsState,
    question,
    getQuestionState,
    filterBy,
    addQuestionState,
    updateQuestionState,
    removeQuestionState,
  } = useSelector((state: RootState) => state.question);

  return {
    questions,
    getQuestionsState,
    question,
    getQuestionState,
    filterBy,
    addQuestionState,
    updateQuestionState,
    removeQuestionState,
  };
}
