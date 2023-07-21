import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useKey } from "react-use";
import "./StartScreen.scss";

export const StartScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.systemModule);
  const { numQuestions } = useSelector((state: RootState) => state.quizModule);

  useKey("Enter", handleStartQuiz);

  function handleStartQuiz() {
    dispatch({ type: "SET_STATUS", status: "active" });
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