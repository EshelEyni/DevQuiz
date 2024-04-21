import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";

export function useQuiz() {
  const {
    status,
    language,
    secondsPerQuestion,
    level,
    page,
    questions,
    answers,
    quizQueryState,
    numQuestions,
    questionIdx,
    answerIdx,
    points,
    maxPossiblePoints,
    highScore,
    isTimerOn,
  } = useSelector((state: RootState) => state.quiz);

  return {
    status,
    language,
    secondsPerQuestion,
    level,
    page,
    questions,
    answers,
    quizQueryState,
    numQuestions,
    questionIdx,
    answerIdx,
    points,
    maxPossiblePoints,
    highScore,
    isTimerOn,
  };
}
