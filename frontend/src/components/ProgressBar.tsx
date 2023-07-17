import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ProgressBar = () => {
  const { numQuestions, questionIdx, points, maxPossiblePoints, answerIdx } = useSelector(
    (state: RootState) => state.quizModule
  );
  return (
    <header className="progress">
      <progress value={questionIdx + Number(answerIdx !== null)} max={numQuestions}></progress>
      <p>
        Question <strong>{questionIdx + 1}</strong>/{numQuestions}
      </p>

      <p>
        Points <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
};
