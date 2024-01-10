import { useDispatch } from "react-redux";
import { useKey } from "react-use";
import "./StartScreen.scss";
import { useQuiz } from "../../../hooks/useQuiz";
import { setStatus } from "../../../store/slices/quizSlice";
import { AppDispatch } from "../../../types/app.types";

export const StartScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { language, numQuestions } = useQuiz();

  useKey("Enter", handleStartQuiz);

  function handleStartQuiz() {
    dispatch(setStatus("active"));
  }

  return (
    <div className="start">
      <h2>{`Welcome to The ${language} Quiz!`}</h2>
      <h3>{`${numQuestions} question to test your ${language} mastery`}</h3>
      <button className="btn" onClick={handleStartQuiz}>
        {"Let's start"}
      </button>
    </div>
  );
};
